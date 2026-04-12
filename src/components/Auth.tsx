import React from 'react';
import { signInWithGoogle, logOut, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogIn, LogOut } from 'lucide-react';

export function Auth() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-md"></div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {user.photoURL && (
            <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
          )}
          <span className="text-sm font-medium text-gray-700 hidden md:block">{user.displayName}</span>
        </div>
        <button
          onClick={logOut}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
    >
      <LogIn className="w-4 h-4" />
      Sign In with Google
    </button>
  );
}
