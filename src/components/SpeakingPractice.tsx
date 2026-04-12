import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ArrowLeft, Mic, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { handleFirestoreError } from './ErrorBoundary';
import speakingData from '../data/speaking.json';
import { motion, AnimatePresence } from 'motion/react';

interface SpeakingTopic {
  topic: number;
  title: string;
  prompts: string[];
  sampleAnswer: string;
}

export default function SpeakingPractice() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  
  const [topicData, setTopicData] = useState<SpeakingTopic | null>(null);
  const [showSample, setShowSample] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const topicNum = parseInt(topicId || '1');
    const data = speakingData.find(t => t.topic === topicNum);
    
    if (data) {
      setTopicData(data);
    } else {
      navigate('/');
    }
  }, [topicId, navigate]);

  useEffect(() => {
    const checkProgress = async () => {
      if (!user || !topicId) return;
      
      try {
        const progressRef = doc(db, 'user_progress', `${user.uid}_${topicId}_speaking`);
        const progressSnap = await getDoc(progressRef);
        
        if (progressSnap.exists()) {
          setIsCompleted(progressSnap.data().completed);
        }
      } catch (error) {
        handleFirestoreError(error, 'get' as any, 'user_progress');
      }
    };

    checkProgress();
  }, [user, topicId]);

  const markAsCompleted = async () => {
    if (!user || !topicId) return;
    
    setSaving(true);
    try {
      const progressRef = doc(db, 'user_progress', `${user.uid}_${topicId}_speaking`);
      await setDoc(progressRef, {
        uid: user.uid,
        topicId: `${topicId}_speaking`,
        completed: true,
        timestamp: new Date().toISOString()
      });
      setIsCompleted(true);
    } catch (error) {
      handleFirestoreError(error, 'write' as any, 'user_progress');
    } finally {
      setSaving(false);
    }
  };

  if (!topicData) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-purple-200 rounded-full mb-4"></div>
          <div className="text-gray-500 font-medium">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-4 md:p-6"
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link to="/" className="flex items-center text-purple-600 hover:text-purple-800 transition-colors w-fit">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Quay lại danh sách
        </Link>
        <AnimatePresence>
          {isCompleted && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center text-green-600 font-medium bg-green-50 px-4 py-1.5 rounded-full shadow-sm border border-green-100 w-fit"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Đã hoàn thành
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-purple-600 p-6 md:p-8 text-white flex items-center">
          <div className="bg-white/20 p-3 rounded-2xl mr-4 backdrop-blur-sm hidden sm:block">
            <Mic className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{topicData.title}</h2>
            <p className="text-purple-100 mt-2 font-medium">Speaking Practice</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Gợi ý (Prompts)
            </h3>
            <div className="bg-purple-50/50 p-6 md:p-8 rounded-3xl border border-purple-100/50">
              <ul className="space-y-4">
                {topicData.prompts.map((prompt, index) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="flex items-start"
                  >
                    <span className="text-purple-500 mr-3 text-xl leading-none font-bold">•</span>
                    <span className="text-gray-800 text-lg leading-relaxed">{prompt}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="bg-purple-100 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
                Bài mẫu tham khảo
              </h3>
              <button
                onClick={() => setShowSample(!showSample)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium w-fit"
              >
                {showSample ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Ẩn bài mẫu
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Xem bài mẫu
                  </>
                )}
              </button>
            </div>

            <AnimatePresence>
              {showSample && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200">
                    <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                      {topicData.sampleAnswer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              Hãy luyện tập nói theo các gợi ý. Bạn có thể tham khảo bài mẫu để có thêm ý tưởng.
            </p>
            {!isCompleted && (
              <button
                onClick={markAsCompleted}
                disabled={saving}
                className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center"
              >
                {saving ? 'Đang lưu...' : 'Đánh dấu đã hoàn thành'}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
