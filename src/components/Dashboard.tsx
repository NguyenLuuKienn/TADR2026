import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BookOpen, CheckCircle, BookText, PenTool, Headphones, Mic } from 'lucide-react';
import { handleFirestoreError } from './ErrorBoundary';
import { motion } from 'motion/react';

interface Progress {
  topicId: string;
  score: number;
  total: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const [fetching, setFetching] = useState(true);

  const topics = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setFetching(false);
        return;
      }
      
      try {
        const q = query(collection(db, 'user_progress'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const progressData: Record<string, Progress> = {};
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Progress;
          progressData[data.topicId] = data;
        });
        
        setProgress(progressData);
      } catch (error) {
        handleFirestoreError(error, 'get' as any, 'user_progress');
      } finally {
        setFetching(false);
      }
    };

    fetchProgress();
  }, [user]);

  if (loading || fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="text-gray-500 font-medium">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-4"
      >
        <div className="bg-white max-w-md mx-auto p-8 rounded-3xl shadow-sm border border-gray-100">
          <BookOpen className="w-16 h-16 mx-auto text-blue-500 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Chào mừng mấy con gà đến với ôn thi Tiếng Anh</h2>
          <p className="text-gray-600">Vui lòng đăng nhập để bắt đầu làm bài và lưu kết quả của bạn.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 md:mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Danh sách chủ đề ôn tập</h1>
        <p className="text-gray-500 mt-2">Chọn một chủ đề để bắt đầu luyện tập các kỹ năng.</p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {topics.map((topic) => {
          const grammarProgress = progress[`${topic}_quiz`];
          const readingProgress = progress[`${topic}_reading`];
          const speakingProgress = progress[`${topic}_speaking`];
          const listeningProgress = progress[`${topic}_listening`];
          const writingProgress = progress[`${topic}_writing`];

          const isCompleted = grammarProgress || readingProgress || speakingProgress || listeningProgress || writingProgress;

          return (
            <motion.div 
              variants={itemVariants}
              key={topic} 
              className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Topic {topic}</h3>
                {isCompleted && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </motion.div>
                )}
              </div>
              
              <div className="space-y-3">
                {/* Grammar & Vocab Section */}
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                      Trắc nghiệm
                    </span>
                    {grammarProgress && (
                      <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                        {grammarProgress.score}/{grammarProgress.total}
                      </span>
                    )}
                  </div>
                  <Link 
                    to={`/quiz/${topic}`}
                    className="block w-full text-center py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 font-medium text-sm"
                  >
                    {grammarProgress ? 'Làm lại' : 'Bắt đầu'}
                  </Link>
                </div>

                {/* Reading Section */}
                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50 hover:bg-emerald-50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700 flex items-center">
                      <BookText className="w-4 h-4 mr-2 text-emerald-500" />
                      Reading
                    </span>
                    {readingProgress && (
                      <span className="text-sm font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {readingProgress.score}/{readingProgress.total}
                      </span>
                    )}
                  </div>
                  <Link 
                    to={`/reading/${topic}`}
                    className="block w-full text-center py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all duration-200 font-medium text-sm"
                  >
                    {readingProgress ? 'Làm lại' : 'Bắt đầu'}
                  </Link>
                </div>

                {/* Listening Section */}
                <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 hover:bg-indigo-50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700 flex items-center">
                      <Headphones className="w-4 h-4 mr-2 text-indigo-500" />
                      Listening
                    </span>
                    {listeningProgress && (
                      <span className="text-sm font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                        {listeningProgress.score}/{listeningProgress.total}
                      </span>
                    )}
                  </div>
                  <Link 
                    to={listeningProgress ? `/listening/${topic}?reset=1` : `/listening/${topic}`}
                    className="block w-full text-center py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-200 font-medium text-sm"
                  >
                    {listeningProgress ? 'Làm lại' : 'Bắt đầu'}
                  </Link>
                </div>

                {/* Speaking Section */}
                <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100/50 hover:bg-purple-50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700 flex items-center">
                      <Mic className="w-4 h-4 mr-2 text-purple-500" />
                      Speaking
                    </span>
                    {speakingProgress && (
                      <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        Hoàn thành
                      </span>
                    )}
                  </div>
                  <Link 
                    to={`/speaking/${topic}`}
                    className="block w-full text-center py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200 font-medium text-sm"
                  >
                    {speakingProgress ? 'Xem lại' : 'Bắt đầu'}
                  </Link>
                </div>

                {/* Writing Section */}
                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 hover:bg-rose-50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-700 flex items-center">
                      <PenTool className="w-4 h-4 mr-2 text-rose-500" />
                      Writing
                    </span>
                    {writingProgress && (
                      <span className="text-sm font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                        Hoàn thành
                      </span>
                    )}
                  </div>
                  <Link 
                    to={`/writing/${topic}`}
                    className="block w-full text-center py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-200 font-medium text-sm"
                  >
                    {writingProgress ? 'Xem lại' : 'Bắt đầu'}
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
