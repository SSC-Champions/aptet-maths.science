import React, { useState } from 'react';
import { UserProfile } from '../types/quiz';
import { getAllUsers, getActiveUser, createOrLoginUser, setActiveUser } from '../services/storageService';
import { 
  User, 
  LogIn, 
  UserPlus, 
  Users, 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap,
  ArrowRight
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
  onUserChanged: (user: UserProfile) => void;
  isLoggingIn: boolean;
}

const AVATARS = ['👨‍🎓', '👩‍🎓', '👨‍🏫', '👩‍🏫', '🧑‍💻', '👩‍🔬', '⚡', '🏆', '🎯', '📚'];

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onGoogleSignIn,
  onUserChanged,
  isLoggingIn
}) => {
  const [activeTab, setActiveTab] = useState<'switch' | 'register'>('switch');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('👨‍🎓');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const users = getAllUsers();
  const activeUser = getActiveUser();

  const handleSelectUser = (u: UserProfile) => {
    setActiveUser(u.id);
    onUserChanged(u);
    onClose();
  };

  const handleRegisterOrLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a student name or hall-ticket name');
      return;
    }

    try {
      const u = createOrLoginUser(name, email, avatar);
      onUserChanged(u);
      setName('');
      setEmail('');
      setError(null);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error logging in');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Student Login &amp; Profiles
            </h3>
            <p className="text-xs text-slate-500">
              Each student gets isolated progress &amp; non-repeating questions
            </p>
          </div>
        </div>

        {/* Current Active User Banner */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{activeUser.avatar}</span>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                <span>{activeUser.name}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {activeUser.email || 'Local Student Profile'}
              </p>
            </div>
          </div>
          <Check className="w-4 h-4 text-emerald-600 font-bold" />
        </div>

        {/* Switch / New Student Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold mb-5">
          <button
            onClick={() => setActiveTab('switch')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'switch' 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' 
                : 'text-slate-500'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Switch Student ({users.length})
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'register' 
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' 
                : 'text-slate-500'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            New Student / Login
          </button>
        </div>

        {/* Tab 1: Switch Student */}
        {activeTab === 'switch' && (
          <div className="space-y-3 mb-6">
            <div className="text-xs font-semibold text-slate-500 mb-1">
              Select existing profile:
            </div>
            <div className="max-h-52 overflow-y-auto space-y-2 pr-1">
              {users.map(u => {
                const isSelected = u.id === activeUser.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => handleSelectUser(u)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 ring-1 ring-indigo-500'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{u.avatar}</span>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {u.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {u.email ? u.email : `Student ID: ${u.id.substring(0, 10)}`}
                        </div>
                      </div>
                    </div>
                    {isSelected ? (
                      <span className="text-xs font-bold text-indigo-600">Selected</span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: New Student Registration / Login */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterOrLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Student Name / Roll Number
              </label>
              <input
                type="text"
                placeholder="e.g. Swamy, Kavitha, Ananya..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Choose Avatar
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all ${
                      avatar === av 
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950 scale-110 shadow-xs' 
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-xs text-rose-600 font-semibold">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              Save &amp; Start Practicing
            </button>
          </form>
        )}

        {/* Google Sign-In Option Area */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="text-[11px] text-center text-slate-400 mb-3 font-medium">
            — Or continue with Google for live Sheets sync —
          </div>

          <button
            onClick={() => {
              onGoogleSignIn();
              onClose();
            }}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-xs text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.28 21.46 7.35 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.57H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.43l4.03-3.11z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.28 2.54 1.25 6.57l4.03 3.11c.95-2.83 3.6-4.93 6.72-4.93z"/>
            </svg>
            <span>{isLoggingIn ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
