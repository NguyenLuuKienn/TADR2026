import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ArrowLeft, Lightbulb, Save, CheckCircle, Edit3, Type } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { motion, AnimatePresence } from 'motion/react';
import writingData from '../data/writing.json';
import sentenceTransformationData from '../data/sentence_transformation.json';

interface WritingTopic {
  id: string;
  topicId: string;
  title: string;
  prompt: string;
  notes: string[];
  sampleResponse: string;
}

interface TransformationQuestion {
  original: string;
  prefix: string;
  answer: string;
}

interface TransformationTopic {
  topicId: number;
  questions: TransformationQuestion[];
}

export default function WritingPractice() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [user, userLoading] = useAuthState(auth);
  const [topicData, setTopicData] = useState<WritingTopic | null>(null);
  const [transformationData, setTransformationData] = useState<TransformationTopic | null>(null);
  const [userText, setUserText] = useState('');
  const [userTransformations, setUserTransformations] = useState<string[]>(['', '', '', '', '']);
  const [showSample, setShowSample] = useState(false);
  const [showTransformationAnswers, setShowTransformationAnswers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'letter' | 'transformation'>('letter');

  useEffect(() => {
    const fetchData = async () => {
      if (!topicId || !user) return;
      try {
        const topicNum = parseInt(topicId || '1');
        const data = (writingData as WritingTopic[]).find((t) => parseInt(t.topicId, 10) === topicNum);
        const transData = (sentenceTransformationData as TransformationTopic[]).find((t) => t.topicId === topicNum);
        
        if (data) {
          setTopicData(data);
        } else {
          navigate('/');
          return;
        }

        if (transData) {
          setTransformationData(transData);
        }

        const progressRef = doc(db, 'user_progress', `${user.uid}_writing_${topicId}`);
        const progressSnap = await getDoc(progressRef);
        if (progressSnap.exists()) {
          const pData = progressSnap.data();
          setUserText(pData.userText || '');
          if (pData.userTransformations) {
            setUserTransformations(pData.userTransformations);
          }
        }
      } catch (error) {
        console.error("Error fetching writing data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (!userLoading) {
      fetchData();
    }
  }, [topicId, user, userLoading, navigate]);

  const handleSave = async () => {
    if (!user || !topicId) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      const progressRef = doc(db, 'user_progress', `${user.uid}_writing_${topicId}`);
      await setDoc(progressRef, {
        uid: user.uid,
        topicId,
        type: 'writing',
        userText,
        userTransformations,
        completed: userText.trim().length > 0 || userTransformations.some(t => String(t ?? '').trim().length > 0),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving progress:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleTransformationChange = (index: number, value: string) => {
    const newTransformations = [...userTransformations];
    newTransformations[index] = value;
    setUserTransformations(newTransformations);
  };

  if (userLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="text-gray-500 font-medium">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }
  
  if (!topicData) return <div className="p-8 text-center text-gray-500">Topic not found.</div>;

  const wordCount = userText.trim().split(/\s+/).filter((w: string) => w.length > 0).length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-4 md:p-8"
    >
      <button 
        onClick={() => navigate('/')} 
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors w-fit"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="bg-blue-600 p-6 md:p-8 text-white flex items-center">
          <div className="bg-white/20 p-3 rounded-2xl mr-4 backdrop-blur-sm hidden sm:block">
            <Edit3 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{topicData.title}</h1>
            <p className="text-blue-100 mt-2 font-medium">Writing Practice</p>
          </div>
        </div>
        
        {transformationData && (
          <div className="flex border-b border-gray-100 bg-gray-50/50 px-4 pt-4">
            <button
              onClick={() => setActiveTab('letter')}
              className={`flex items-center px-6 py-3 font-medium text-sm md:text-base rounded-t-xl transition-colors ${
                activeTab === 'letter' 
                  ? 'bg-white text-blue-600 border-t border-l border-r border-gray-100 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Edit3 className="w-4 h-4 mr-2" /> Viết thư
            </button>
            <button
              onClick={() => setActiveTab('transformation')}
              className={`flex items-center px-6 py-3 font-medium text-sm md:text-base rounded-t-xl transition-colors ${
                activeTab === 'transformation' 
                  ? 'bg-white text-blue-600 border-t border-l border-r border-gray-100 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Type className="w-4 h-4 mr-2" /> Viết lại câu
            </button>
          </div>
        )}
      </div>

      {activeTab === 'letter' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center">
                <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
                <h3 className="text-xl font-bold text-gray-800">Đề bài (Prompt)</h3>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap mb-6">{topicData.prompt}</p>
                {topicData.notes && topicData.notes.length > 0 && (
                  <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-blue-500" />
                      Ghi chú cần có trong bài:
                    </h4>
                    <ul className="space-y-3">
                      {topicData.notes.map((note, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-3 text-xl leading-none font-bold">•</span>
                          <span className="text-gray-700">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center">
                <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</span>
                <h3 className="text-xl font-bold text-gray-800">Bài làm của bạn</h3>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="relative">
                  <textarea
                    placeholder="Viết câu trả lời của bạn vào đây..."
                    className="w-full min-h-[350px] resize-y p-6 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-gray-800 text-lg leading-relaxed shadow-inner bg-gray-50/30"
                    value={userText}
                    onChange={(e) => setUserText(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                  <div className="flex items-center gap-4">
                    <span className="bg-white px-4 py-1.5 rounded-full shadow-sm border border-gray-200 text-sm font-medium text-gray-600">
                      <span className="text-blue-600 font-bold">{wordCount}</span> từ
                    </span>
                    <AnimatePresence>
                      {saveSuccess && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="text-green-600 text-sm font-medium flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> Đã lưu
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    {saving ? (
                      'Đang lưu...'
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" /> Lưu bài làm
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden sticky top-8"
            >
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <span className="bg-indigo-100 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</span>
                  <h3 className="text-xl font-bold text-gray-800">Bài mẫu tham khảo</h3>
                </div>
                <button 
                  onClick={() => setShowSample(!showSample)}
                  className="flex items-center justify-center text-sm px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm"
                >
                  <Lightbulb className={`w-4 h-4 mr-2 ${showSample ? 'text-yellow-500' : 'text-gray-400'}`} />
                  {showSample ? 'Ẩn bài mẫu' : 'Xem bài mẫu'}
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
                    <div className="p-6 md:p-8">
                      <div className="bg-indigo-50/50 p-6 md:p-8 rounded-2xl border border-indigo-100/50">
                        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg">{topicData.sampleResponse}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!showSample && (
                <div className="p-8 text-center text-gray-500">
                  <Lightbulb className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p>Nhấn "Xem bài mẫu" để tham khảo cách viết.</p>
                  <p className="text-sm mt-2">Nên tự viết trước khi xem bài mẫu nhé!</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</span>
              <h3 className="text-xl font-bold text-gray-800">Complete the second sentence</h3>
            </div>
            <button 
              onClick={() => setShowTransformationAnswers(!showTransformationAnswers)}
              className="flex items-center justify-center text-sm px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium text-gray-700 shadow-sm"
            >
              <CheckCircle className={`w-4 h-4 mr-2 ${showTransformationAnswers ? 'text-green-500' : 'text-gray-400'}`} />
              {showTransformationAnswers ? 'Ẩn đáp án' : 'Kiểm tra đáp án'}
            </button>
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
            {transformationData?.questions.map((q, idx) => {
              const currentTransformation = String(userTransformations[idx] ?? '').trim().toLowerCase();
              const isCorrect = currentTransformation === q.answer.toLowerCase();
              const hasAnswered = String(userTransformations[idx] ?? '').trim().length > 0;
              
              return (
                <div key={idx} className="space-y-3">
                  <p className="text-lg text-gray-800 font-medium">
                    <span className="mr-2">{idx + 1}.</span>
                    {q.original}
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 pl-6">
                    <span className="text-gray-700 font-medium whitespace-nowrap">{q.prefix}</span>
                    <input
                      type="text"
                      value={userTransformations[idx] || ''}
                      onChange={(e) => handleTransformationChange(idx, e.target.value)}
                      className={`flex-1 p-3 border rounded-xl focus:ring-2 focus:outline-none transition-all ${
                        showTransformationAnswers && hasAnswered
                          ? isCorrect 
                            ? 'border-green-300 bg-green-50 focus:ring-green-200' 
                            : 'border-red-300 bg-red-50 focus:ring-red-200'
                          : 'border-gray-200 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50'
                      }`}
                      placeholder="Nhập phần còn lại của câu..."
                    />
                  </div>
                  
                  <AnimatePresence>
                    {showTransformationAnswers && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-6 overflow-hidden"
                      >
                        <div className={`mt-2 p-4 rounded-xl text-sm ${isCorrect ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-blue-50 text-blue-800 border border-blue-100'}`}>
                          <span className="font-bold mr-2">{isCorrect ? 'Tuyệt vời!' : 'Đáp án gợi ý:'}</span>
                          {q.prefix} <span className="font-bold">{q.answer}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            
            <div className="flex justify-end pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <AnimatePresence>
                  {saveSuccess && (
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-green-600 text-sm font-medium flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" /> Đã lưu
                    </motion.span>
                  )}
                </AnimatePresence>
                <button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="flex items-center justify-center bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  {saving ? 'Đang lưu...' : <><Save className="w-4 h-4 mr-2" /> Lưu bài làm</>}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
