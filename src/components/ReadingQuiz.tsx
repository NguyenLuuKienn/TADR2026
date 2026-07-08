import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { handleFirestoreError } from './ErrorBoundary';
import { motion, AnimatePresence } from 'motion/react';
import { logActivity } from '../lib/activity';

interface ReadingQuestion {
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export default function ReadingQuiz() {
  const { topicId } = useParams<{ topicId: string }>();
  const [user] = useAuthState(auth);
  const [parts, setParts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    if (!user || !topicId) return;

    logActivity(user, {
      type: 'view_reading',
      label: `Mở Reading topic ${topicId}`,
      section: 'reading',
      topicId,
    });
  }, [user, topicId]);

  useEffect(() => {
    const fetchReading = async () => {
      if (!topicId || !user) return;
      try {
        const q = query(collection(db, 'reading'), where('topic', '==', Number(topicId)));
        const querySnapshot = await getDocs(q);
        const fetchedParts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        
        // Sort by part (A, B, C)
        fetchedParts.sort((a, b) => a.part.localeCompare(b.part));
        setParts(fetchedParts);
      } catch (error) {
        handleFirestoreError(error, 'get' as any, 'reading');
      } finally {
        setLoading(false);
      }
    };

    fetchReading();
  }, [topicId, user]);

  const handleOptionSelect = (partId: string, questionIndex: number, option: string) => {
    const questionKey = `${partId}_${questionIndex}`;
    if (answers[questionKey] || submitted) return;
    const optionLetter = option.charAt(0);
    setAnswers(prev => ({
      ...prev,
      [questionKey]: optionLetter
    }));
  };

  const handleNext = () => {
    const currentPart = parts[currentPartIndex];
    if (currentQuestionIndex < currentPart.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentPartIndex < parts.length - 1) {
      setCurrentPartIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentPartIndex > 0) {
      setCurrentPartIndex(prev => prev - 1);
      setCurrentQuestionIndex(parts[currentPartIndex - 1].questions.length - 1);
    }
  };

  const handleFinish = async () => {
    if (!user || !topicId) return;
    
    let currentScore = 0;
    let totalQuestions = 0;

    parts.forEach(part => {
      part.questions.forEach((q: any, index: number) => {
        totalQuestions++;
        if (answers[`${part.id}_${index}`] === q.correctAnswer) {
          currentScore++;
        }
      });
    });

    setScore(currentScore);
    setSubmitted(true);

    try {
      const progressRef = doc(db, 'user_progress', `${user.uid}_${topicId}_reading`);
      const progressDoc = await getDoc(progressRef);
      
      const newProgress = {
        uid: user.uid,
        topicId: `${topicId}_reading`,
        score: currentScore,
        total: totalQuestions,
        completedAt: new Date().toISOString()
      };

      if (!progressDoc.exists() || progressDoc.data().score < currentScore) {
        await setDoc(progressRef, newProgress);
      }

      await logActivity(user, {
        type: 'complete_reading',
        label: `Hoàn thành Reading topic ${topicId}`,
        section: 'reading',
        topicId,
        score: currentScore,
        total: totalQuestions,
      });
    } catch (error) {
      handleFirestoreError(error, 'write' as any, 'user_progress');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-200 rounded-full mb-4"></div>
          <div className="text-gray-500 font-medium">Đang tải bài đọc...</div>
        </div>
      </div>
    );
  }

  if (parts.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto p-4 md:p-6"
      >
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại Dashboard
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chưa có dữ liệu</h2>
          <p className="text-gray-600">Bài đọc cho Topic {topicId} đang được cập nhật.</p>
        </div>
      </motion.div>
    );
  }

  const totalQuestions = parts.reduce((acc, part) => acc + part.questions.length, 0);
  const currentPart = parts[currentPartIndex];
  const currentQuestion = currentPart.questions[currentQuestionIndex];
  const questionKey = `${currentPart.id}_${currentQuestionIndex}`;
  const userAnswer = answers[questionKey];
  const isAnswered = !!userAnswer;
  const isCorrect = userAnswer === currentQuestion.correctAnswer;
  const isLastQuestionOverall = currentPartIndex === parts.length - 1 && currentQuestionIndex === currentPart.questions.length - 1;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Topic {topicId} - Reading</h1>
      </div>

      <AnimatePresence mode="wait">
        {submitted && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center overflow-hidden"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Kết quả của bạn</h2>
            <p className="text-5xl font-bold text-emerald-600 mb-4">
              {score} <span className="text-2xl text-gray-400">/ {totalQuestions}</span>
            </p>
            <p className="text-gray-600 font-medium">
              {score === totalQuestions ? 'Tuyệt vời! Bạn đã trả lời đúng tất cả.' : 'Hãy xem lại các câu sai bên dưới nhé.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:h-[calc(100vh-180px)] lg:min-h-[600px]">
        <div className="bg-emerald-50/50 px-6 py-4 border-b border-emerald-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-bold text-emerald-900">{currentPart.title}</h2>
          <span className="text-sm font-medium text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-full whitespace-nowrap">
            Part {currentPartIndex + 1}/{parts.length} - Question {currentQuestionIndex + 1}/{currentPart.questions.length}
          </span>
        </div>
        
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left side: Passage/Content */}
          <div className="w-full lg:w-1/2 p-4 md:p-6 lg:border-r border-gray-100 overflow-y-auto max-h-[40vh] lg:max-h-none bg-gray-50/30">
            <div className="prose max-w-none bg-white p-6 rounded-2xl border border-gray-100 shadow-sm whitespace-pre-wrap font-serif text-gray-800 leading-relaxed">
              {currentPart.content}
            </div>
          </div>

          {/* Right side: Questions */}
          <div className="w-full lg:w-1/2 p-4 md:p-6 flex flex-col h-full overflow-y-auto">
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={questionKey}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-medium text-lg md:text-xl text-gray-900 mb-6 leading-relaxed">{currentQuestion.text}</h3>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option: string, oIndex: number) => {
                      const optionLetter = option.charAt(0);
                      const isSelected = userAnswer === optionLetter;
                      const isCorrectOption = currentQuestion.correctAnswer === optionLetter;
                      
                      let buttonClass = "w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 ";
                      
                      if (!isAnswered && !submitted) {
                        buttonClass += "border-gray-100 bg-white hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm";
                      } else {
                        if (isCorrectOption) {
                          buttonClass += "border-green-500 bg-green-50 text-green-800 shadow-sm";
                        } else if (isSelected && !isCorrectOption) {
                          buttonClass += "border-red-500 bg-red-50 text-red-800 shadow-sm";
                        } else {
                          buttonClass += "border-gray-100 bg-gray-50 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleOptionSelect(currentPart.id, currentQuestionIndex, option)}
                          disabled={isAnswered || submitted}
                          className={buttonClass}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-base md:text-lg">{option}</span>
                            {(isAnswered || submitted) && isCorrectOption && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 ml-4" />
                              </motion.div>
                            )}
                            {(isAnswered || submitted) && isSelected && !isCorrectOption && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 ml-4" />
                              </motion.div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <AnimatePresence>
                    {(isAnswered || submitted) && currentQuestion.explanation && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        className={`mt-6 p-5 rounded-2xl text-sm md:text-base ${isCorrect ? 'bg-green-50/80 text-green-800 border border-green-100' : 'bg-red-50/80 text-red-800 border border-red-100'}`}
                      >
                        <strong className="block mb-1">Giải thích:</strong> 
                        <span className="leading-relaxed">{currentQuestion.explanation}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center shrink-0">
              <button
                onClick={handlePrevious}
                disabled={currentPartIndex === 0 && currentQuestionIndex === 0}
                className="px-6 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Câu trước
              </button>

              {!submitted && isLastQuestionOverall ? (
                <button
                  onClick={handleFinish}
                  disabled={Object.keys(answers).length < totalQuestions}
                  className="px-8 py-2.5 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow"
                >
                  Hoàn thành
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={submitted && isLastQuestionOverall}
                  className="px-6 py-2.5 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow"
                >
                  Câu tiếp
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
