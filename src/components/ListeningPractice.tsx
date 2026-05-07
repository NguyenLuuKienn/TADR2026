import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ArrowLeft, Play, Square, CheckCircle, XCircle, Edit2, Save, Image as ImageIcon, Music } from 'lucide-react';
import { handleFirestoreError } from './ErrorBoundary';
import { motion, AnimatePresence } from 'motion/react';
import listeningData from '../data/listening.json';
import listeningDataB from '../data/listeningb.json';

interface ListeningOptionA {
  text: string;
  imageSeed: string;
  imageUrl?: string;
}

interface ListeningQuestionA {
  id: string;
  question: string;
  transcript: string;
  options: ListeningOptionA[];
  correctAnswer: number;
  explanation: string;
}

interface ListeningTopicA {
  topic: number;
  title: string;
  imageUrl?: string;
  audioUrl?: string;
  questions: ListeningQuestionA[];
}

interface ListeningQuestionB {
  id: number;
  text: string;
  answer: string;
}

interface ListeningTopicB {
  topicId: number;
  title: string;
  imageUrl: string;
  audioUrl: string;
  questions: ListeningQuestionB[];
}

export default function ListeningPractice() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const [selectedPart, setSelectedPart] = useState<'A' | 'B'>('A');
  const shouldReset = new URLSearchParams(location.search).get('reset') === '1';
  
  const [topicData, setTopicData] = useState<ListeningTopicA | ListeningTopicB | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audioError, setAudioError] = useState(false);
  const [editingOptionIndex, setEditingOptionIndex] = useState<number | null>(null);
  const [newOptionImageUrl, setNewOptionImageUrl] = useState('');
  const [savingOptionImage, setSavingOptionImage] = useState(false);
  const [optionImageMessage, setOptionImageMessage] = useState<string | null>(null);

  // Admin edit state
  const isAdmin = user !== null;  // Allow all authenticated users to edit
  const [isEditing, setIsEditing] = useState(false);
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editAudioUrl, setEditAudioUrl] = useState('');
  const [editAnswers, setEditAnswers] = useState<string[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const resetPartState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setScore(0);
    setUserAnswers([]);
    setShowResults([]);
  };

  useEffect(() => {
    const fetchTopicData = async () => {
      if (!topicId) return;
      try {
        const topicNum = parseInt(topicId);
        const baseData =
          selectedPart === 'A'
            ? (listeningData as ListeningTopicA[]).find((t) => t.topic === topicNum)
            : (listeningDataB as ListeningTopicB[]).find((t) => t.topicId === topicNum);
        
        if (!baseData) {
          navigate('/');
          return;
        }

        let finalData: ListeningTopicA | ListeningTopicB = { ...baseData };

        // Fetch overrides from Firestore. If rules are not deployed yet, keep fallback local data.
        try {
          const overrideRef = doc(db, 'listening_overrides', `topic_${topicId}_${selectedPart.toLowerCase()}`);
          const overrideSnap = await getDoc(overrideRef);

          if (overrideSnap.exists()) {
            const overrides = overrideSnap.data();
            if ('imageUrl' in overrides && overrides.imageUrl) finalData.imageUrl = overrides.imageUrl;
            if ('audioUrl' in overrides && overrides.audioUrl) finalData.audioUrl = overrides.audioUrl;

            if (selectedPart === 'A' && 'questions' in overrides && Array.isArray(overrides.questions)) {
              finalData.questions = finalData.questions.map((q, idx) => {
                const qOverride = overrides.questions[idx];
                if (!qOverride) return q;
                
                // Merge options one by one to preserve other options' data
                const mergedOptions = q.options.map((opt, optIdx) => ({
                  ...opt,
                  ...(qOverride.options?.[optIdx] || {})
                }));
                
                return {
                  ...q,
                  options: mergedOptions,
                  correctAnswer: qOverride.correctAnswer ?? q.correctAnswer,
                };
              });
            }

            if (selectedPart === 'B' && 'answers' in overrides && Array.isArray(overrides.answers)) {
              finalData.questions = finalData.questions.map((q, idx) => ({
                ...q,
                answer: overrides.answers[idx] !== undefined ? overrides.answers[idx] : q.answer
              }));
            }
          }
        } catch (error) {
          console.warn('Cannot read listening_overrides, fallback to local listening data.', error);
        }

        setTopicData(finalData);
        resetPartState();

        if (selectedPart === 'B') {
          const partBTopic = finalData as ListeningTopicB;
          setUserAnswers(new Array(partBTopic.questions.length).fill(''));
          setShowResults(new Array(partBTopic.questions.length).fill(false));
          setEditImageUrl(partBTopic.imageUrl);
          setEditAudioUrl(partBTopic.audioUrl);
          setEditAnswers(partBTopic.questions.map(q => q.answer));
        }

        // Fetch user progress
        if (user && !shouldReset) {
          const progressRef = doc(db, 'user_progress', `${user.uid}_listening_${selectedPart}_${topicId}`);
          const progressSnap = await getDoc(progressRef);
          if (progressSnap.exists()) {
            const pData = progressSnap.data();
            if (selectedPart === 'A') {
              setCurrentQuestionIndex(pData.currentQuestionIndex ?? 0);
              setSelectedAnswer(typeof pData.selectedAnswer === 'number' ? pData.selectedAnswer : null);
              setIsSubmitted(Boolean(pData.isSubmitted));
              setScore(pData.score ?? 0);
            } else {
              if (pData.userAnswers) {
                setUserAnswers(pData.userAnswers);
              }
              if (pData.showResults) {
                setShowResults(pData.showResults);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching listening data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [topicId, navigate, user, selectedPart, shouldReset]);

  const handlePlayAudio = () => {
    if (!topicData?.audioUrl) {
      setAudioError(true);
      setTimeout(() => setAudioError(false), 3000);
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {
          setAudioError(true);
          setTimeout(() => setAudioError(false), 3000);
        });
        setIsPlaying(true);
      }
    }
  };

  const currentPartAQuestion = selectedPart === 'A' && topicData ? (topicData as ListeningTopicA).questions[currentQuestionIndex] : null;
  const canEditPartAOptionImage = !!user;

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
    
    // Hide result for this question when user types again
    if (showResults[index]) {
      const newResults = [...showResults];
      newResults[index] = false;
      setShowResults(newResults);
    }
  };

  const savePartAProgress = async (currentIndex: number, chosenAnswer: number | null, currentScore: number, submitted: boolean) => {
    if (!user || !topicId || !topicData) return;

    try {
      const progressRef = doc(db, 'user_progress', `${user.uid}_listening_A_${topicId}`);
      // Use same topicId string format as other skills so Dashboard can find it (e.g. '3_listening')
      await setDoc(progressRef, {
        uid: user.uid,
        topicId: `${topicId}_listening`,
        part: 'A',
        currentQuestionIndex: currentIndex,
        selectedAnswer: chosenAnswer,
        isSubmitted: submitted,
        score: currentScore,
        total: (topicData as ListeningTopicA).questions.length,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // Also write a lightweight local marker so unauthenticated or offline users see retry locally
      try {
        const localKey = `user_progress_local_${user.uid}_listening_A_${topicId}`;
        localStorage.setItem(localKey, JSON.stringify({ topicId: `${topicId}_listening`, score: currentScore, total: (topicData as ListeningTopicA).questions.length, updatedAt: new Date().toISOString() }));
      } catch (e) {
        // ignore localStorage errors
      }
    } catch (error) {
      console.error('Error saving listening part A progress:', error);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (!currentPartAQuestion || isSubmitted) return;

    const correct = index === currentPartAQuestion.correctAnswer;
    setSelectedAnswer(index);
    setIsSubmitted(true);
    if (correct) {
      setScore(prev => prev + 1);
    }

    void savePartAProgress(currentQuestionIndex, index, correct ? score + 1 : score, true);
  };

  const handleNextPartA = () => {
    if (!topicData) return;
    const partATopic = topicData as ListeningTopicA;

    if (currentQuestionIndex < partATopic.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      void savePartAProgress(nextIndex, null, score, false);
      return;
    }

    void savePartAProgress(currentQuestionIndex, selectedAnswer, score, isSubmitted);
    navigate('/');
  };

  const handleSavePartAOptionImage = async (optionIndex: number) => {
    if (!topicId || !currentPartAQuestion || selectedPart !== 'A') return;

    const trimmedUrl = newOptionImageUrl.trim();
    if (!trimmedUrl) {
      setOptionImageMessage('URL ảnh không được để trống.');
      return;
    }

    try {
      setSavingOptionImage(true);
      setOptionImageMessage(null);
      const overrideRef = doc(db, 'listening_overrides', `topic_${topicId}_a`);
      const overrideSnap = await getDoc(overrideRef);

      const existingData = overrideSnap.exists() ? overrideSnap.data() : {};
      const questions = Array.isArray(existingData.questions) ? [...existingData.questions] : [];

      while (questions.length <= currentQuestionIndex) {
        questions.push({});
      }

      const questionOverride = questions[currentQuestionIndex] ?? {};
      const options = Array.isArray(questionOverride.options) ? [...questionOverride.options] : [];

      while (options.length <= optionIndex) {
        options.push({});
      }

      options[optionIndex] = {
        ...options[optionIndex],
        imageUrl: trimmedUrl,
      };

      questions[currentQuestionIndex] = {
        ...questionOverride,
        options,
      };

      await setDoc(
        overrideRef,
        {
          questions,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );

      setTopicData((prev) => {
        if (!prev || selectedPart !== 'A') return prev;
        const partA = prev as ListeningTopicA;
        const updatedQuestions = [...partA.questions];
        const targetQuestion = updatedQuestions[currentQuestionIndex];
        const updatedOptions = [...targetQuestion.options];
        updatedOptions[optionIndex] = {
          ...updatedOptions[optionIndex],
          imageUrl: trimmedUrl,
        };
        updatedQuestions[currentQuestionIndex] = {
          ...targetQuestion,
          options: updatedOptions,
        };

        return {
          ...partA,
          questions: updatedQuestions,
        };
      });

      setEditingOptionIndex(null);
      setNewOptionImageUrl('');
      setOptionImageMessage('Đã lưu ảnh lựa chọn thành công.');
    } catch (error) {
      console.error('Error saving Part A option image:', error);
      setOptionImageMessage('Không lưu được ảnh. Kiểm tra Firestore rules rồi thử lại.');
    } finally {
      setSavingOptionImage(false);
    }
  };

  const checkAnswer = (index: number) => {
    const newResults = [...showResults];
    newResults[index] = true;
    setShowResults(newResults);
    saveProgress(userAnswers, newResults);
  };

  const saveProgress = async (currentAnswers: string[], currentResults: boolean[]) => {
    if (!user || !topicId || !topicData) return;
    
    try {
      const progressRef = doc(db, 'user_progress', `${user.uid}_listening_${selectedPart}_${topicId}`);
      const score = currentResults.filter((r, i) => {
        const correctAns = String((topicData as ListeningTopicB).questions[i]?.answer ?? '').trim().toLowerCase();
        const userAnswer = String(currentAnswers[i] ?? '').trim().toLowerCase();
        return r && correctAns !== '' && userAnswer === correctAns;
      }).length;
      
      await setDoc(progressRef, {
        uid: user.uid,
        topicId: `${topicId}_listening`,
        part: selectedPart,
        type: 'listening',
        userAnswers: currentAnswers,
        showResults: currentResults,
        score: score,
        total: topicData.questions.length,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      // also save local marker
      try {
        const localKey = `user_progress_local_${user.uid}_listening_${selectedPart}_${topicId}`;
        localStorage.setItem(localKey, JSON.stringify({ topicId: `${topicId}_listening`, score, total: topicData.questions.length, updatedAt: new Date().toISOString() }));
      } catch (e) {
        // ignore localStorage errors
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const handleSaveAdminEdits = async () => {
    if (!topicId || !topicData) return;
    setSaving(true);
    try {
      const overrideRef = doc(db, 'listening_overrides', `topic_${topicId}_${selectedPart.toLowerCase()}`);
      await setDoc(overrideRef, {
        imageUrl: editImageUrl,
        audioUrl: editAudioUrl,
        answers: editAnswers,
        part: selectedPart,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setTopicData({
        ...topicData,
        imageUrl: editImageUrl,
        audioUrl: editAudioUrl,
        questions: topicData.questions.map((q, i) => ({ ...q, answer: editAnswers[i] }))
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving admin edits:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !topicData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-200 rounded-full mb-4"></div>
          <div className="text-gray-500 font-medium">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại danh sách
        </Link>
        {isAdmin && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors font-medium text-sm"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            {isEditing ? 'Hủy chỉnh sửa' : 'Admin: Chỉnh sửa Topic'}
          </button>
        )}
      </div>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Phần nghe:</span>
        <button
          onClick={() => setSelectedPart('A')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            selectedPart === 'A'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
          }`}
        >
          Part A
        </button>
        <button
          onClick={() => setSelectedPart('B')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            selectedPart === 'B'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
          }`}
        >
          Part B
        </button>
      </div>

      {isAdmin && isEditing && selectedPart === 'B' && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-sm border border-indigo-200 mb-8 space-y-4"
        >
          <h3 className="text-lg font-bold text-indigo-800 mb-4 flex items-center">
            <Edit2 className="w-5 h-5 mr-2" /> Chỉnh sửa thông tin Topic
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <ImageIcon className="w-4 h-4 mr-1" /> URL Ảnh đề bài
            </label>
            <input
              type="text"
              value={editImageUrl}
              onChange={(e) => setEditImageUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Music className="w-4 h-4 mr-1" /> URL File Audio (mp3, wav...)
            </label>
            <input
              type="text"
              value={editAudioUrl}
              onChange={(e) => setEditAudioUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="https://..."
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-medium text-gray-800 mb-3">Đáp án cho các câu hỏi:</h4>
            {topicData.questions.map((q, idx) => (
              <div key={idx} className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-bold text-gray-600 shrink-0">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={editAnswers[idx] || ''}
                  onChange={(e) => {
                    const newAns = [...editAnswers];
                    newAns[idx] = e.target.value;
                    setEditAnswers(newAns);
                  }}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Nhập đáp án đúng..."
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSaveAdminEdits}
              disabled={saving}
              className="flex items-center px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Đang lưu...' : <><Save className="w-4 h-4 mr-2" /> Lưu thay đổi</>}
            </button>
          </div>
        </motion.div>
      )}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-indigo-600 p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">{topicData.title}</h2>
          <p className="text-indigo-100 mt-2 font-medium">
            {selectedPart === 'A'
              ? 'Listening Practice Part A - Choose the correct picture'
              : 'Listening Practice Part B - Fill in the missing information'}
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* Audio Player */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 bg-indigo-50/50 p-6 md:p-8 rounded-3xl border border-indigo-100/50 relative">
            <audio 
              ref={audioRef} 
              src={topicData.audioUrl} 
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              className="hidden"
            />
            
            <button
              onClick={handlePlayAudio}
              className={`flex items-center justify-center w-16 h-16 text-white rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 ${isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isPlaying ? <Square className="w-6 h-6" fill="currentColor" /> : <Play className="w-8 h-8 ml-1" fill="currentColor" />}
            </button>
            
            <div className="text-indigo-800 font-medium text-center sm:text-left">
              {isPlaying ? 'Đang phát âm thanh...' : 'Bấm để nghe đoạn hội thoại'}
              {audioError && <p className="text-red-500 text-sm mt-1">Chưa có file audio cho bài này.</p>}
            </div>
          </div>

          {selectedPart === 'A' ? (
            <div className="space-y-8">
              {currentPartAQuestion && (
                <div className="space-y-6">
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">{currentPartAQuestion.question}</h3>
                      <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Câu {currentQuestionIndex + 1} / {(topicData as ListeningTopicA).questions.length}
                      </span>
                    </div>

                    {optionImageMessage && (
                      <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium">
                        {optionImageMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {currentPartAQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = index === currentPartAQuestion.correctAnswer;

                        let optionClass = 'border-2 rounded-3xl p-4 cursor-pointer transition-all duration-300 flex flex-col items-center text-center h-full relative ';
                        if (isSubmitted) {
                          if (isCorrect) {
                            optionClass += ' border-green-500 bg-green-50 shadow-sm';
                          } else if (isSelected) {
                            optionClass += ' border-red-500 bg-red-50 shadow-sm';
                          } else {
                            optionClass += ' border-gray-100 opacity-50';
                          }
                        } else {
                          optionClass += isSelected
                            ? ' border-indigo-500 bg-indigo-50 shadow-md'
                            : ' border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md hover:-translate-y-1';
                        }

                        const imageSource = option.imageUrl || `https://picsum.photos/seed/${option.imageSeed}/400/300`;

                        return (
                          <div
                            key={index}
                            className={optionClass}
                            onClick={() => handleSelectAnswer(index)}
                          >
                            <div className="w-full aspect-video bg-gray-100 rounded-2xl mb-4 overflow-hidden relative group">
                              <img 
                                src={imageSource} 
                                alt={option.text}
                                className="object-contain w-full h-full bg-white"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-800 shadow-sm">
                                {['A', 'B', 'C'][index]}
                              </div>

                              {canEditPartAOptionImage && !isSubmitted && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingOptionIndex(index);
                                    setNewOptionImageUrl(option.imageUrl || '');
                                  }}
                                  className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-blue-700"
                                  title="Thay đổi ảnh"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>

                            {editingOptionIndex === index && !isSubmitted ? (
                              <div className="w-full flex flex-col gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                                <input
                                  type="text"
                                  value={newOptionImageUrl}
                                  onChange={(e) => setNewOptionImageUrl(e.target.value)}
                                  placeholder="Nhập URL ảnh mới..."
                                  className="w-full p-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleSavePartAOptionImage(index)}
                                    disabled={savingOptionImage}
                                    className="flex-1 bg-green-500 text-white py-1.5 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-60"
                                  >
                                    {savingOptionImage ? 'Đang lưu...' : 'Lưu'}
                                  </button>
                                  <button
                                    onClick={() => setEditingOptionIndex(null)}
                                    className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded-xl text-sm font-medium hover:bg-gray-300 transition-colors"
                                  >
                                    Hủy
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <p className="font-medium text-gray-800 text-lg">{option.text}</p>
                            )}

                            <AnimatePresence>
                              {isSubmitted && isCorrect && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-3 -right-3 bg-white rounded-full shadow-sm">
                                  <CheckCircle className="w-8 h-8 text-green-500" />
                                </motion.div>
                              )}
                              {isSubmitted && isSelected && !isCorrect && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-3 -right-3 bg-white rounded-full shadow-sm">
                                  <XCircle className="w-8 h-8 text-red-500" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {isSubmitted && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          className="space-y-6 mt-8"
                        >
                          <div className={`p-6 rounded-2xl flex items-start ${selectedAnswer === currentPartAQuestion.correctAnswer ? 'bg-green-50/80 text-green-800 border border-green-100' : 'bg-red-50/80 text-red-800 border border-red-100'}`}>
                            {selectedAnswer === currentPartAQuestion.correctAnswer ? (
                              <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <h4 className="font-bold mb-2 text-lg">
                                {selectedAnswer === currentPartAQuestion.correctAnswer ? 'Chính xác!' : 'Chưa chính xác!'}
                              </h4>
                              <p className="leading-relaxed">{currentPartAQuestion.explanation}</p>
                            </div>
                          </div>

                          <button
                            onClick={handleNextPartA}
                            className="w-full py-4 bg-indigo-600 text-white font-bold text-lg rounded-2xl hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md"
                          >
                            {currentQuestionIndex < (topicData as ListeningTopicA).questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Image Section */}
              <div>
                <div className="bg-gray-50 rounded-2xl p-2 border border-gray-200 shadow-inner">
                  <img 
                    src={(topicData as ListeningTopicB).imageUrl} 
                    alt="Listening Task" 
                    className="w-full h-auto rounded-xl object-contain max-h-[600px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Questions Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 border-b pb-4">Điền vào chỗ trống</h3>
                
                {(topicData as ListeningTopicB).questions.map((q, idx) => {
                  const isAnswered = showResults[idx];
                  const currentAnswer = String(userAnswers[idx] ?? '').trim().toLowerCase();
                  const correctAnswer = String(q.answer ?? '').trim().toLowerCase();
                  const isCorrect = currentAnswer === correctAnswer && correctAnswer !== '';
                  const isMissingAnswer = correctAnswer === '';

                  return (
                    <div key={idx} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full font-bold shrink-0">
                          {idx + 1}
                        </span>
                        
                        <div className="flex-1 flex items-center gap-2">
                          <input
                            type="text"
                            value={userAnswers[idx]}
                            onChange={(e) => handleAnswerChange(idx, e.target.value)}
                            className={`flex-1 p-3 border rounded-xl focus:ring-2 focus:outline-none transition-all ${
                              isAnswered
                                ? isCorrect 
                                  ? 'border-green-300 bg-green-50 focus:ring-green-200' 
                                  : 'border-red-300 bg-red-50 focus:ring-red-200'
                                : 'border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white'
                            }`}
                            placeholder="Nhập đáp án..."
                          />
                          <button
                            onClick={() => checkAnswer(idx)}
                            disabled={!String(userAnswers[idx] ?? '').trim()}
                            className="px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors whitespace-nowrap"
                          >
                            Kiểm tra
                          </button>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isAnswered && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pl-11 overflow-hidden"
                          >
                            <div className={`mt-3 p-3 rounded-xl text-sm ${isCorrect ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-blue-50 text-blue-800 border border-blue-100'}`}>
                              {isMissingAnswer ? (
                                <span><span className="font-bold text-orange-600">Lưu ý:</span> Câu này chưa có đáp án trong hệ thống. Vui lòng đợi Admin cập nhật.</span>
                              ) : isCorrect ? (
                                <span className="font-bold flex items-center"><CheckCircle className="w-4 h-4 mr-1" /> Chính xác!</span>
                              ) : (
                                <span><span className="font-bold">Chưa chính xác.</span> Đáp án đúng là: <span className="font-bold text-lg ml-1">{q.answer}</span></span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
