import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import questionsData from '../data/questions.json';
import readingData from '../data/reading.json';
import speakingData from '../data/speaking.json';
import listeningData from '../data/listening.json';
import listeningDataB from '../data/listeningb.json';
import writingData from '../data/writing.json';
import { handleFirestoreError } from './ErrorBoundary';

export default function AdminSeed() {
  const [user] = useAuthState(auth);
  const [seeding, setSeeding] = useState(false);
  const [message, setMessage] = useState('');

  // Only show to specific admin email
  if (user?.email !== 'jenrrybast20@gmail.com') {
    return null;
  }

  const handleSeed = async () => {
    setSeeding(true);
    setMessage('Đang đẩy dữ liệu lên Firebase...');
    try {
      let count = 0;
      // Seed questions
      for (let i = 0; i < questionsData.length; i++) {
        const q = questionsData[i];
        await setDoc(doc(db, 'questions', `q_${q.topic}_${i}`), q);
        count++;
      }
      // Seed reading
      for (let i = 0; i < readingData.length; i++) {
        const r = readingData[i];
        await setDoc(doc(db, 'reading', `r_${r.topic}_${r.part}`), r);
        count++;
      }
      // Seed speaking
      for (let i = 0; i < speakingData.length; i++) {
        const s = speakingData[i];
        await setDoc(doc(db, 'speaking', `s_${s.topic}`), s);
        count++;
      }
      // Seed listening
      for (let i = 0; i < listeningData.length; i++) {
        const l = listeningData[i];
        await setDoc(doc(db, 'listening', `l_a_${l.topic}`), { ...l, part: 'A' });
        count++;
      }
      // Seed listening part B
      for (let i = 0; i < listeningDataB.length; i++) {
        const l = listeningDataB[i];
        await setDoc(doc(db, 'listening', `l_b_${l.topicId}`), { ...l, part: 'B' });
        count++;
      }
      // Seed writing
      for (let i = 0; i < writingData.length; i++) {
        const w = writingData[i];
        await setDoc(doc(db, 'writing', w.id), w);
        count++;
      }
      setMessage(`Thành công! Đã cập nhật ${count} bản ghi vào database.`);
    } catch (error) {
      setMessage('Có lỗi xảy ra. Vui lòng kiểm tra console.');
      handleFirestoreError(error, 'write' as any, 'questions/reading/speaking/listening');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-xl border border-gray-200 z-50">
      <h3 className="font-bold text-gray-800 mb-2">Admin Panel</h3>
      <button
        onClick={handleSeed}
        disabled={seeding}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {seeding ? 'Đang xử lý...' : 'Seed Database'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600 max-w-xs">{message}</p>}
    </div>
  );
}
