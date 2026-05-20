import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { Auth } from './components/Auth';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import ReadingQuiz from './components/ReadingQuiz';
import SpeakingPractice from './components/SpeakingPractice';
import ListeningPractice from './components/ListeningPractice';
import WritingPractice from './components/WritingPractice';
import TensesQuiz from './components/TensesQuiz';
import TensesRewrite from './components/TensesRewrite';
import AdminSeed from './components/AdminSeed';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  useEffect(() => {
    // Test Firebase connection on mount
    const testConnection = async () => {
      try {
        await getDoc(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    };
    testConnection();
  }, []);

  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.BASE_URL}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <h1 className="text-xl font-bold text-blue-600">Không ai tắm 2 lần trên 1 dòng sông</h1>
              <Auth />
            </div>
          </header>

          <main className="flex-grow py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/quiz/:topicId" element={<Quiz />} />
              <Route path="/reading/:topicId" element={<ReadingQuiz />} />
              <Route path="/speaking/:topicId" element={<SpeakingPractice />} />
              <Route path="/listening/:topicId" element={<ListeningPractice />} />
              <Route path="/writing/:topicId" element={<WritingPractice />} />
              <Route path="/tenses-quiz" element={<TensesQuiz />} />
              <Route path="/tenses-rewrite" element={<TensesRewrite />} />
              <Route path="*" element={<Dashboard />} />
            </Routes>
          </main>

          <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
            <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
              © 2026 Kiên. All rights reserved.
            </div>
          </footer>

          <AdminSeed />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
