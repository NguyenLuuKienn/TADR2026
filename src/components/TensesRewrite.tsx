import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import tensesRewriteData from '../data/tenses_rewrite.json';

interface Question {
  original: string;
  prefix: string;
  answer: string;
}

interface Topic {
  topicId: number;
  topicName: string;
  questions: Question[];
}

export default function TensesRewrite() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setTopics(tensesRewriteData.topics);
  }, []);

  if (topics.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-amber-200 rounded-full mb-4"></div>
          <div className="text-gray-500 font-medium">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  const currentTopic = topics[currentTopicIndex];
  const currentQuestion = currentTopic.questions[currentQuestionIndex];
  const questionKey = `${currentTopicIndex}_${currentQuestionIndex}`;
  const userAnswer = answers[questionKey] ?? '';
  const isAnswered = userAnswer.trim().length > 0;
  const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();
  const isLastQuestion = currentQuestionIndex === currentTopic.questions.length - 1;
  const isLastTopic = currentTopicIndex === topics.length - 1;

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (submitted) return;
    setAnswers(prev => ({
      ...prev,
      [questionKey]: e.target.value
    }));
  };

  const handleCheckAnswer = () => {
    if (!isAnswered) return;
    setSubmitted(true);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSubmitted(false);
      setShowHint(false);
    } else if (!isLastTopic) {
      setCurrentTopicIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
      setSubmitted(false);
      setShowHint(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSubmitted(false);
      setShowHint(false);
    } else if (currentTopicIndex > 0) {
      setCurrentTopicIndex(prev => prev - 1);
      setCurrentQuestionIndex(topics[currentTopicIndex - 1].questions.length - 1);
      setSubmitted(false);
      setShowHint(false);
    }
  };

  const handleFinish = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;

    topics.forEach(topic => {
      topic.questions.forEach((_, qIdx) => {
        totalQuestions++;
        const key = `${topics.indexOf(topic)}_${qIdx}`;
        if (answers[key]?.trim().toLowerCase() === topic.questions[qIdx].answer.trim().toLowerCase()) {
          totalCorrect++;
        }
      });
    });

    setScore(totalCorrect);
    setSubmitted(true);
  };

  const calculateProgress = () => {
    let correct = 0;
    let total = 0;
    topics.forEach((topic, tIdx) => {
      topic.questions.forEach((_, qIdx) => {
        total++;
        const key = `${tIdx}_${qIdx}`;
        if (answers[key]?.trim().toLowerCase() === topic.questions[qIdx].answer.trim().toLowerCase()) {
          correct++;
        }
      });
    });
    return { correct, total };
  };

  const progress = calculateProgress();
  const totalQuestions = topics.reduce((sum, t) => sum + t.questions.length, 0);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="inline-flex items-center text-amber-600 hover:text-amber-800 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại Dashboard
        </Link>
        <div className="bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 text-gray-600 font-medium text-sm">
          Topic {currentTopic.topicId} • Câu {currentQuestionIndex + 1} / {currentTopic.questions.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted && isLastQuestion && isLastTopic && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center overflow-hidden"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Kết quả của bạn</h2>
            <p className="text-5xl font-bold text-amber-600 mb-4">
              {progress.correct} <span className="text-2xl text-gray-400">/ {progress.total}</span>
            </p>
            <p className="text-gray-600 font-medium">
              {progress.correct === progress.total ? 'Tuyệt vời! Bạn đã trả lời đúng tất cả.' : 'Hãy xem lại các câu sai bên dưới nhé.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-amber-50/50 px-6 py-4 border-b border-amber-100">
          <h2 className="text-xl font-bold text-amber-900">{currentTopic.topicName}</h2>
          <p className="text-sm text-amber-700 mt-1">Điền từ thích hợp để hoàn thành câu</p>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={questionKey}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Original Sentence */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Câu gốc:</label>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <p className="text-gray-800 leading-relaxed">{currentQuestion.original}</p>
                </div>
              </div>

              {/* Transformation Task */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Viết lại:</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-shrink-0 bg-gray-100 px-4 py-3 rounded-2xl border border-gray-200 flex items-center justify-center min-h-12 min-w-max">
                    <span className="text-gray-700 font-medium">{currentQuestion.prefix}</span>
                    {currentQuestion.prefix && <span className="text-gray-400 ml-1">...</span>}
                  </div>
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={handleAnswerChange}
                    disabled={submitted}
                    placeholder="Nhập câu trả lời ở đây"
                    className="flex-1 px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                  />
                </div>
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    className={`p-4 rounded-2xl border-2 ${
                      isCorrect
                        ? 'bg-green-50/80 border-green-200'
                        : 'bg-red-50/80 border-red-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                          {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm text-red-800">
                            <strong>Đáp án đúng:</strong> {currentQuestion.prefix}
                            {currentQuestion.prefix && ' '}<span className="font-mono">{currentQuestion.answer}</span>
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Câu hoàn chỉnh:</strong> {currentQuestion.prefix} {currentQuestion.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Show Answer Button */}
              {!submitted && isAnswered && (
                <button
                  onClick={handleCheckAnswer}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-2xl transition-colors shadow-sm hover:shadow"
                >
                  Kiểm tra
                </button>
              )}

              {submitted && !isCorrect && (
                <button
                  onClick={() => {
                    setAnswers(prev => ({
                      ...prev,
                      [questionKey]: ''
                    }));
                    setSubmitted(false);
                  }}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl transition-colors"
                >
                  Thử lại
                </button>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentTopicIndex === 0 && currentQuestionIndex === 0}
              className="px-6 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Câu trước
            </button>

            <div className="text-center text-sm text-gray-600">
              <span className="font-semibold">{progress.correct}</span> / <span>{progress.total}</span>
            </div>

            {!submitted && isAnswered && (
              <button
                onClick={handleCheckAnswer}
                className="px-8 py-2.5 rounded-xl font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-sm hover:shadow"
              >
                Kiểm tra
              </button>
            )}

            {submitted && (
              <>
                {isLastQuestion && isLastTopic ? (
                  <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-2.5 rounded-xl font-medium text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm hover:shadow"
                  >
                    Hoàn thành
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-8 py-2.5 rounded-xl font-medium text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-sm hover:shadow"
                  >
                    Câu tiếp
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Tiến độ chung</span>
          <span className="text-sm font-semibold text-gray-800">{progress.correct}/{progress.total}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(progress.correct / progress.total) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-amber-600 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
