import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ArrowLeft, Play, Square, CheckCircle, XCircle, Edit2, Save, Image as ImageIcon, Music } from 'lucide-react';
import { handleFirestoreError } from './ErrorBoundary';
import { motion, AnimatePresence } from 'motion/react';
import listeningData from '../data/listening.json';
import listeningDataB from '../data/listeningb.json';

interface ListeningQuestion {
  id: number;
  text: string;
  answer: string;
}

interface ListeningTopic {
  topicId: number;
  title: string;
  imageUrl: string;
  audioUrl: string;
  questions: ListeningQuestion[];
}

interface ListeningOptionA {
  text: string;
}

interface LegacyListeningQuestion {
  question?: string;
  answer?: string;
  options?: ListeningOptionA[];
  correctAnswer?: number;
}

interface LegacyListeningTopicA {
  topic: number;
  title: string;
  imageUrl?: string;
  audioUrl?: string;
  questions: LegacyListeningQuestion[];
}

export default function ListeningPractice() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [selectedPart, setSelectedPart] = useState<'A' | 'B'>('A');
  
  const [topicData, setTopicData] = useState<ListeningTopic | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audioError, setAudioError] = useState(false);

  // Admin edit state
  const isAdmin = user?.email === 'jenrrybast20@gmail.com';
  const [isEditing, setIsEditing] = useState(false);
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editAudioUrl, setEditAudioUrl] = useState('');
  const [editAnswers, setEditAnswers] = useState<string[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const normalizePartATopic = (topic: LegacyListeningTopicA): ListeningTopic => {
    const normalizedQuestions: ListeningQuestion[] = topic.questions.map((q, idx) => {
      const answerFromOption =
        typeof q.correctAnswer === 'number' && Array.isArray(q.options)
          ? q.options[q.correctAnswer]?.text ?? ''
          : '';

      return {
        id: idx + 1,
        text: q.question ?? `Question ${idx + 1}`,
        answer: q.answer ?? answerFromOption,
      };
    });

    return {
      topicId: topic.topic,
      title: topic.title,
      imageUrl: topic.imageUrl ?? `https://picsum.photos/seed/listening-a-${topic.topic}/1200/800`,
      audioUrl: topic.audioUrl ?? '',
      questions: normalizedQuestions,
    };
  };

  useEffect(() => {
    const fetchTopicData = async () => {
      if (!topicId) return;
      try {
        const topicNum = parseInt(topicId);
        const baseData =
          selectedPart === 'A'
            ? (listeningData as LegacyListeningTopicA[]).find((t) => t.topic === topicNum)
            : (listeningDataB as ListeningTopic[]).find((t) => t.topicId === topicNum);
        
        if (!baseData) {
          navigate('/');
          return;
        }

        let finalData: ListeningTopic =
          selectedPart === 'A'
            ? normalizePartATopic(baseData as LegacyListeningTopicA)
            : ({ ...(baseData as ListeningTopic) });

        // Fetch overrides from Firestore
        const overrideRef = doc(db, 'listening_overrides', `topic_${topicId}_${selectedPart.toLowerCase()}`);
        const overrideSnap = await getDoc(overrideRef);
        
        if (overrideSnap.exists()) {
          const overrides = overrideSnap.data();
          if (overrides.imageUrl) finalData.imageUrl = overrides.imageUrl;
          if (overrides.audioUrl) finalData.audioUrl = overrides.audioUrl;
          if (overrides.answers) {
            finalData.questions = finalData.questions.map((q, idx) => ({
              ...q,
              answer: overrides.answers[idx] !== undefined ? overrides.answers[idx] : q.answer
            }));
          }
        }

        setTopicData(finalData);
        setUserAnswers(new Array(finalData.questions.length).fill(''));
        setShowResults(new Array(finalData.questions.length).fill(false));
        
        setEditImageUrl(finalData.imageUrl);
        setEditAudioUrl(finalData.audioUrl);
        setEditAnswers(finalData.questions.map(q => q.answer));

        // Fetch user progress
        if (user) {
          const progressRef = doc(db, 'user_progress', `${user.uid}_listening_${selectedPart}_${topicId}`);
          const progressSnap = await getDoc(progressRef);
          if (progressSnap.exists()) {
            const pData = progressSnap.data();
            if (pData.userAnswers) {
              setUserAnswers(pData.userAnswers);
            }
            if (pData.showResults) {
              setShowResults(pData.showResults);
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
  }, [topicId, navigate, user, selectedPart]);

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
        const correctAns = topicData.questions[i].answer.trim().toLowerCase();
        return r && correctAns !== '' && currentAnswers[i].trim().toLowerCase() === correctAns;
      }).length;
      
      await setDoc(progressRef, {
        uid: user.uid,
        topicId: parseInt(topicId),
        part: selectedPart,
        type: 'listening',
        userAnswers: currentAnswers,
        showResults: currentResults,
        score: score,
        total: topicData.questions.length,
        updatedAt: new Date().toISOString()
      }, { merge: true });
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

      {isAdmin && isEditing && (
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
          <p className="text-indigo-100 mt-2 font-medium">Listening Practice {selectedPart} - Fill in the missing information</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image Section */}
            <div>
              <div className="bg-gray-50 rounded-2xl p-2 border border-gray-200 shadow-inner">
                <img 
                  src={topicData.imageUrl} 
                  alt="Listening Task" 
                  className="w-full h-auto rounded-xl object-contain max-h-[600px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Questions Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-4">Điền vào chỗ trống</h3>
              
              {topicData.questions.map((q, idx) => {
                const isAnswered = showResults[idx];
                const isCorrect = userAnswers[idx].trim().toLowerCase() === q.answer.toLowerCase() && q.answer !== '';
                const isMissingAnswer = q.answer === '';

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
                          disabled={!userAnswers[idx].trim()}
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
        </div>
      </div>
    </div>
  );
}
