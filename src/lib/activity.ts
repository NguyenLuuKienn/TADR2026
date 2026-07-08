import { User } from 'firebase/auth';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const ADMIN_EMAIL = 'jenrrybast20@gmail.com';

export const isActivityAdmin = (email?: string | null) => email === ADMIN_EMAIL;

type ActivityPayload = {
  type: string;
  label: string;
  section?: string;
  topicId?: string;
  score?: number;
  total?: number;
  metadata?: Record<string, unknown>;
};

export const logActivity = async (user: User | null | undefined, payload: ActivityPayload) => {
  if (!user) return;

  try {
    await setDoc(doc(db, 'user_status', user.uid), {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      lastActivity: payload.label,
      lastSection: payload.section || '',
      lastTopicId: payload.topicId || '',
      lastSeen: serverTimestamp(),
    }, { merge: true });

    await addDoc(collection(db, 'activity_logs'), {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      ...payload,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};
