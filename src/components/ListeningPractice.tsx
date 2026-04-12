import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ArrowLeft, Play, Square, CheckCircle, XCircle, FileText, Edit2 } from 'lucide-react';
import { handleFirestoreError } from './ErrorBoundary';
import { motion, AnimatePresence } from 'motion/react';

interface ListeningOption {
  text: string;
  imageSeed: string;
  imageUrl?: string;
}

interface ListeningQuestion {
  id: string;
  question: string;
  transcript: string;
  options: ListeningOption[];
  correctAnswer: number;
  explanation: string;
}

interface ListeningTopic {
  topic: number;
  title: string;
  questions: ListeningQuestion[];
}

export default function ListeningPractice() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  
  const [topicData, setTopicData] = useState<ListeningTopic | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Admin edit state
  const isAdmin = user?.email === 'jenrrybast20@gmail.com';
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');

  const synth = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      if (!topicId) return;
      try {
        const docRef = doc(db, 'listening', `l_${topicId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTopicData(docSnap.data() as ListeningTopic);
        } else {
          navigate('/');
        }
      } catch (error) {
        handleFirestoreError(error, 'get' as any, 'listening');
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();

    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, [topicId, navigate]);

  const currentQuestion = topicData?.questions[currentQuestionIndex];

  const handlePlayAudio = () => {
    if (!currentQuestion) return;

    if (synth.speaking) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentQuestion.transcript);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const handleStopAudio = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsPlaying(false);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (isSubmitted || !currentQuestion) return;
    setSelectedAnswer(index);
    setIsSubmitted(true);
    handleStopAudio();
    
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (!topicData) return;
    
    if (currentQuestionIndex < topicData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setShowTranscript(false);
      handleStopAudio();
    } else {
      saveProgress();
    }
  };

  const saveProgress = async () => {
    if (!user || !topicId || !topicData) return;
    
    setSaving(true);
    try {
      const progressRef = doc(db, 'user_progress', `${user.uid}_${topicId}_listening`);
      await setDoc(progressRef, {
        uid: user.uid,
        topicId: `${topicId}_listening`,
        score: score,
        total: topicData.questions.length,
        timestamp: new Date().toISOString()
      });
      navigate('/');
    } catch (error) {
      handleFirestoreError(error, 'write' as any, 'user_progress');
      setSaving(false);
    }
  };

  const handleSaveImageUrl = async (optionIndex: number) => {
    if (!topicData || !topicId || !currentQuestion) return;
    
    try {
      const updatedQuestions = [...topicData.questions];
      updatedQuestions[currentQuestionIndex].options[optionIndex].imageUrl = newImageUrl;
      
      const docRef = doc(db, 'listening', `l_${topicId}`);
      await updateDoc(docRef, { questions: updatedQuestions });
      
      setTopicData({ ...topicData, questions: updatedQuestions });
      setEditingImageIndex(null);
      setNewImageUrl('');
    } catch (error) {
      handleFirestoreError(error, 'update' as any, 'listening');
    }
  };

  if (loading || !topicData || !currentQuestion) {
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
        <Link to="/" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors" onClick={handleStopAudio}>
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại danh sách
        </Link>
        <span className="bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 text-gray-600 font-medium text-sm">
          Câu {currentQuestionIndex + 1} / {topicData.questions.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-indigo-600 p-6 md:p-8 text-white">
          <h2 className="text-2xl md:text-3xl font-bold">{topicData.title}</h2>
          <p className="text-indigo-100 mt-2 font-medium">Listening Practice</p>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">{currentQuestion.question}</h3>
              
              {/* Audio Player Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 bg-indigo-50/50 p-6 md:p-8 rounded-3xl border border-indigo-100/50">
                {isPlaying ? (
                  <button
                    onClick={handleStopAudio}
                    className="flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-md hover:shadow-lg hover:scale-105"
                  >
                    <Square className="w-6 h-6" fill="currentColor" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlayAudio}
                    className="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg hover:scale-105"
                  >
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </button>
                )}
                <div className="text-indigo-800 font-medium text-center sm:text-left">
                  {isPlaying ? 'Đang phát âm thanh...' : 'Bấm để nghe đoạn hội thoại'}
                </div>
              </div>

              {/* Options (Images) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  
                  let optionClass = "border-2 rounded-3xl p-4 cursor-pointer transition-all duration-300 flex flex-col items-center text-center h-full relative ";
                  
                  if (isSubmitted) {
                    if (isCorrect) {
                      optionClass += " border-green-500 bg-green-50 shadow-sm";
                    } else if (isSelected) {
                      optionClass += " border-red-500 bg-red-50 shadow-sm";
                    } else {
                      optionClass += " border-gray-100 opacity-50";
                    }
                  } else {
                    optionClass += isSelected 
                      ? " border-indigo-500 bg-indigo-50 shadow-md" 
                      : " border-gray-100 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-md hover:-translate-y-1";
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
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-800 shadow-sm">
                          {['A', 'B', 'C'][index]}
                        </div>
                        
                        {isAdmin && !isSubmitted && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingImageIndex(index);
                              setNewImageUrl(option.imageUrl || '');
                            }}
                            className="absolute top-3 right-3 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-blue-700"
                            title="Thay đổi ảnh"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      {editingImageIndex === index && !isSubmitted ? (
                        <div className="w-full flex flex-col gap-2 mt-2" onClick={e => e.stopPropagation()}>
                          <input
                            type="text"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            placeholder="Nhập URL ảnh mới..."
                            className="w-full p-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleSaveImageUrl(index)}
                              className="flex-1 bg-green-500 text-white py-1.5 rounded-xl text-sm font-medium hover:bg-green-600 transition-colors"
                            >
                              Lưu
                            </button>
                            <button 
                              onClick={() => setEditingImageIndex(null)}
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

              {/* Feedback and Next Button */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    className="space-y-6"
                  >
                    <div className={`p-6 rounded-2xl flex items-start ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50/80 text-green-800 border border-green-100' : 'bg-red-50/80 text-red-800 border border-red-100'}`}>
                      {selectedAnswer === currentQuestion.correctAnswer ? (
                        <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="font-bold mb-2 text-lg">
                          {selectedAnswer === currentQuestion.correctAnswer ? 'Chính xác!' : 'Chưa chính xác!'}
                        </h4>
                        <p className="leading-relaxed">{currentQuestion.explanation}</p>
                      </div>
                    </div>

                    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                      <button 
                        onClick={() => setShowTranscript(!showTranscript)}
                        className="w-full flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-gray-700"
                      >
                        <span className="flex items-center">
                          <FileText className="w-5 h-5 mr-3 text-gray-500" />
                          {showTranscript ? 'Ẩn Transcript' : 'Xem Transcript (Nội dung bài nghe)'}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {showTranscript && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-white border-t border-gray-100 overflow-hidden"
                          >
                            <div className="p-6">
                              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                                {currentQuestion.transcript}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button
                      onClick={handleNext}
                      disabled={saving}
                      className="w-full py-4 bg-indigo-600 text-white font-bold text-lg rounded-2xl hover:bg-indigo-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                    >
                      {saving ? 'Đang lưu...' : (currentQuestionIndex < topicData.questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
