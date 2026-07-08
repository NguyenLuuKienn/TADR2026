import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, limit, orderBy, query, Timestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Activity, ArrowLeft, Clock, Shield, UserRound } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { isActivityAdmin } from '../lib/activity';

interface ActivityLog {
  id: string;
  uid: string;
  email?: string;
  displayName?: string;
  type: string;
  label: string;
  section?: string;
  topicId?: string;
  score?: number;
  total?: number;
  createdAt?: Timestamp;
}

interface UserStatus {
  id: string;
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  lastActivity?: string;
  lastSection?: string;
  lastTopicId?: string;
  lastSeen?: Timestamp;
}

const formatDate = (timestamp?: Timestamp) => {
  if (!timestamp) return 'Chưa rõ';

  return timestamp.toDate().toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const isOnline = (timestamp?: Timestamp) => {
  if (!timestamp) return false;

  return Date.now() - timestamp.toDate().getTime() < 5 * 60 * 1000;
};

export default function AdminActivity() {
  const [user, loadingUser] = useAuthState(auth);
  const [statuses, setStatuses] = useState<UserStatus[]>([]);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = isActivityAdmin(user?.email);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!isAdmin) {
        setLoading(false);
        return;
      }

      try {
        const [statusSnap, logSnap] = await Promise.all([
          getDocs(query(collection(db, 'user_status'), orderBy('lastSeen', 'desc'), limit(50))),
          getDocs(query(collection(db, 'activity_logs'), orderBy('createdAt', 'desc'), limit(150))),
        ]);

        setStatuses(statusSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as UserStatus)));
        setLogs(logSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ActivityLog)));
      } catch (error) {
        console.error('Error loading activity:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!loadingUser) {
      fetchActivity();
    }
  }, [isAdmin, loadingUser]);

  const onlineCount = useMemo(() => statuses.filter((status) => isOnline(status.lastSeen)).length, [statuses]);

  if (loadingUser || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-500 font-medium">Đang tải hoạt động...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Link>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Không có quyền truy cập</h2>
          <p className="text-gray-600">Feature này chỉ dành cho tài khoản admin.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại Dashboard
      </Link>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 mb-3">
          <Activity className="w-4 h-4" />
          Admin only
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Trạng thái & lịch sử hoạt động</h1>
        <p className="text-gray-500 mt-2">Online được tính khi tài khoản có hoạt động trong 5 phút gần nhất.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="text-sm font-medium text-gray-500">Đang hoạt động</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{onlineCount}</div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="text-sm font-medium text-gray-500">Tài khoản đã ghi nhận</div>
          <div className="text-3xl font-bold text-gray-900 mt-2">{statuses.length}</div>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <div className="text-sm font-medium text-gray-500">Log mới nhất</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">{logs.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:col-span-1">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Trạng thái tài khoản</h2>
          <div className="space-y-3">
            {statuses.map((status) => (
              <div key={status.id} className="rounded-2xl border border-gray-100 p-4">
                <div className="flex items-start gap-3">
                  {status.photoURL ? (
                    <img src={status.photoURL} alt={status.displayName || status.email || 'User'} className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <UserRound className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-800 truncate">{status.displayName || status.email || status.uid}</div>
                    <div className="text-xs text-gray-500 truncate">{status.email}</div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className={`w-2.5 h-2.5 rounded-full ${isOnline(status.lastSeen) ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <span className={isOnline(status.lastSeen) ? 'text-green-700 font-medium' : 'text-gray-500'}>
                        {isOnline(status.lastSeen) ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{formatDate(status.lastSeen)}</div>
                    {status.lastActivity && <div className="text-sm text-gray-700 mt-2">{status.lastActivity}</div>}
                  </div>
                </div>
              </div>
            ))}
            {statuses.length === 0 && <div className="text-gray-500 text-sm">Chưa có trạng thái nào.</div>}
          </div>
        </section>

        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Lịch sử hoạt động</h2>
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="rounded-2xl border border-gray-100 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="font-semibold text-gray-800">{log.label}</div>
                    <div className="text-sm text-gray-500">{log.displayName || log.email || log.uid}</div>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      {log.section && <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600">{log.section}</span>}
                      {log.topicId && <span className="rounded-full bg-blue-50 px-2 py-1 text-blue-700">Topic {log.topicId}</span>}
                      {typeof log.score === 'number' && typeof log.total === 'number' && (
                        <span className="rounded-full bg-green-50 px-2 py-1 text-green-700">{log.score}/{log.total}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 shrink-0">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(log.createdAt)}
                  </div>
                </div>
              </div>
            ))}
            {logs.length === 0 && <div className="text-gray-500 text-sm">Chưa có log hoạt động nào.</div>}
          </div>
        </section>
      </div>
    </div>
  );
}
