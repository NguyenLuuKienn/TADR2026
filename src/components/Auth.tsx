import React, { useState } from 'react';
import { signInWithGoogle, logOut, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LogIn, LogOut } from 'lucide-react';

export function Auth() {
  const [user, loading] = useAuthState(auth);
  const [authError, setAuthError] = useState<string | null>(null);

  const mapAuthError = (error: unknown): string => {
    const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code: string }).code) : '';

    if (code === 'auth/unauthorized-domain') {
      return 'This site domain is not authorized in Firebase Auth. Add nguyenluukienn.github.io in Firebase Console > Authentication > Settings > Authorized domains.';
    }

    if (code === 'auth/popup-closed-by-user') {
      return 'The sign-in popup was closed before login completed.';
    }

    if (code === 'auth/popup-blocked') {
      return 'Browser blocked the sign-in popup. Allow popups for this site and try again.';
    }

    if (code === 'auth/cancelled-popup-request') {
      return 'Another sign-in popup is already open. Complete or close it, then try again.';
    }

    return 'Google sign-in failed. Open browser console to see full error details.';
  };

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (error) {
      setAuthError(mapAuthError(error));
    }
  };

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
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={handleSignIn}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
      >
        <LogIn className="w-4 h-4" />
        Sign In with Google
      </button>
      {authError && <p className="text-xs text-red-600 max-w-md">{authError}</p>}
    </div>
  );
}
