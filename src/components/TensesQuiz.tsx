import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import tensesData from '../data/tenses.json';

interface Question {
  topic: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface TensesPart {
  id: number;
  title: string;
  topics: number[];
  description: string;
}

const TENSES_PARTS: TensesPart[] = [
  { id: 1, title: 'Phần 1', topics: [5, 6], description: 'Bị động và nguyên nhân - nhượng bộ' },
  { id: 2, title: 'Phần 2', topics: [7, 8], description: 'So/such/too và mục đích' },
  { id: 3, title: 'Phần 3', topics: [9, 10], description: 'Điều kiện và so sánh' },
  { id: 4, title: 'Phần 4', topics: [11, 12], description: 'So/such/too và phrase of purpose' },
  { id: 5, title: 'Phần 5', topics: [13, 14], description: 'Điều kiện mở rộng và so sánh mở rộng' },
  { id: 6, title: 'Phần 6', topics: [15], description: 'Word formation' },
];

export default function TensesQuiz() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const activePartId = Number(searchParams.get('part') || '1');
  const activePart = TENSES_PARTS.find(part => part.id === activePartId) ?? TENSES_PARTS[0];
  const questions = allQuestions.filter(question => activePart.topics.includes(question.topic));

  useEffect(() => {
    // Load questions from local JSON
    if (tensesData && tensesData.questions) {
      setAllQuestions(tensesData.questions);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  }, [activePartId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-orange-200 rounded-full mb-4"></div>
          <div className="text-gray-500 font-medium">Đang tải câu hỏi...</div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-4 md:p-6"
      >
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại Dashboard
        </Link>
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chưa có câu hỏi</h2>
          <p className="text-gray-600">Không thể tải câu hỏi tenses lúc này.</p>
        </div>
      </motion.div>
    );
  }

  const handlePartSelect = (partId: number) => {
    setSearchParams({ part: String(partId) });
  };

  const handleOptionSelect = (option: string) => {
    if (answers[currentQuestionIndex] || submitted) return;
    const optionLetter = option.charAt(0);
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: optionLetter
    }));
  };

  const handleFinish = () => {
    let currentScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
    setQuizCompleted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const userAnswer = answers[currentQuestionIndex];
  const isAnswered = !!userAnswer;
  const isCorrect = userAnswer === currentQuestion.correctAnswer;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại Dashboard
        </Link>
        <div className="bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-100 text-gray-600 font-medium text-sm">
          Câu {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="mb-6 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Chia theo từng phần</h2>
            <p className="text-sm text-gray-600">Mỗi phần chỉ có một cụm topic để làm nhẹ hơn trên điện thoại.</p>
          </div>
          <div className="text-sm font-medium text-orange-700 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
            {questions.length} câu trong {activePart.title}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {TENSES_PARTS.map((part) => {
            const partCount = allQuestions.filter(question => part.topics.includes(question.topic)).length;
            const isActive = part.id === activePart.id;

            return (
              <button
                key={part.id}
                onClick={() => handlePartSelect(part.id)}
                className={`text-left rounded-2xl border-2 p-4 transition-all duration-200 ${
                  isActive
                    ? 'border-orange-500 bg-orange-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-orange-700">{part.title}</div>
                    <div className="mt-1 font-bold text-gray-800">{part.description}</div>
                    <div className="mt-1 text-sm text-gray-600">{partCount} câu</div>
                  </div>
                  {isActive && <div className="text-orange-600 font-bold text-lg">✓</div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted && quizCompleted && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 32 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center overflow-hidden"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Kết quả của bạn</h2>
            <p className="text-5xl font-bold text-orange-600 mb-4">
              {score} <span className="text-2xl text-gray-400">/ {questions.length}</span>
            </p>
            <p className="text-gray-600 font-medium">
              {score === questions.length ? 'Tuyệt vời! Bạn đã trả lời đúng tất cả.' : 'Hãy xem lại các câu sai bên dưới nhé.'}
            </p>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-4">Tỷ lệ chính xác: <span className="font-bold text-orange-600">{Math.round((score / questions.length) * 100)}%</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-2 inline-block px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold">
              Topic {currentQuestion.topic}
            </div>
            <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
              {currentQuestion.text}
            </h2>

            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const optionLetter = option.charAt(0);
                const isSelected = userAnswer === optionLetter;
                const isCorrectOption = currentQuestion.correctAnswer === optionLetter;
                
                let buttonClass = "w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 ";
                
                if (!isAnswered && !submitted) {
                  buttonClass += "border-gray-100 bg-white hover:border-orange-300 hover:bg-orange-50/50 hover:shadow-sm";
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
                    key={index}
                    onClick={() => handleOptionSelect(option)}
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
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  className={`mt-6 p-5 rounded-2xl text-sm md:text-base ${isCorrect ? 'bg-green-50/80 text-green-800 border border-green-100' : 'bg-red-50/80 text-red-800 border border-red-100'}`}
                >
                  <strong className="block mb-1">Giải thích:</strong> 
                  <span className="leading-relaxed">{currentQuestion.explanation}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Câu trước
          </button>

          {!submitted && currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleFinish}
              disabled={Object.keys(answers).length < questions.length}
              className="px-8 py-2.5 rounded-xl font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow"
            >
              Hoàn thành
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestionIndex === questions.length - 1 || (!isAnswered && !submitted)}
              className="px-6 py-2.5 rounded-xl font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow"
            >
              Câu tiếp
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
