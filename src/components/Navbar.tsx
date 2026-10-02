import React from 'react';
import { 
  GraduationCap, 
  Flame, 
  Trophy, 
  BarChart3, 
  BookOpen, 
  Bell, 
  Layers, 
  FileSpreadsheet, 
  LogOut, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { UserStats, GoogleSheetsConfig } from '../types/quiz';
import { User } from 'firebase/auth';

interface NavbarProps {
  activeTab: 'quizzes' | 'progress' | 'leaderboard' | 'reminders' | 'flashcards';
  setActiveTab: (tab: 'quizzes' | 'progress' | 'leaderboard' | 'reminders' | 'flashcards') => void;
  userStats: UserStats;
  currentUser: User | null;
  sheetsConfig: GoogleSheetsConfig;
  onGoogleSignIn: () => void;
  onGoogleSignOut: () => void;
  onOpenSheetsModal: () => void;
  isLoggingIn: boolean;
  activeRemindersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userStats,
  currentUser,
  sheetsConfig,
  onGoogleSignIn,
  onGoogleSignOut,
  onOpenSheetsModal,
  isLoggingIn,
  activeRemindersCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('quizzes')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  VidyaSetu
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  TET &amp; Exams
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                విద్యార్థుల అభ్యాస వేదిక
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'quizzes'
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Practice Quizzes
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'progress'
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Progress
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </button>

            <button
              onClick={() => setActiveTab('reminders')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'reminders'
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Bell className="w-4 h-4" />
              Reminders
              {activeRemindersCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              Flashcards
            </button>
          </nav>

          {/* User Status, Streak & Google Sheets Sync */}
          <div className="flex items-center gap-2.5">
            {/* Streak Counter */}
            <div 
              title={`${userStats.currentStreakDays} day study streak!`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
              <span>{userStats.currentStreakDays}d</span>
            </div>

            {/* Total XP */}
            <div 
              title={`Total XP: ${userStats.totalXp} points earned!`}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
              <span>{userStats.totalXp} XP</span>
            </div>

            {/* Google Sheets Status / Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenSheetsModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                  title={sheetsConfig.spreadsheetId ? "Google Sheets Connected & Synced" : "Configure Google Sheets Tracker"}
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span className="hidden sm:inline">
                    {sheetsConfig.spreadsheetId ? 'Sheets Synced' : 'Connect Sheets'}
                  </span>
                </button>

                {/* Profile Pill */}
                <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-800">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt={currentUser.displayName || 'User'} 
                      className="w-8 h-8 rounded-full border border-indigo-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      {currentUser.displayName ? currentUser.displayName[0] : 'S'}
                    </div>
                  )}
                  <button
                    onClick={onGoogleSignOut}
                    title="Sign Out"
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onGoogleSignIn}
                disabled={isLoggingIn}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-xs text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.1C3.28 21.46 7.35 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.57H1.25C.45 8.16 0 9.98 0 12s.45 3.84 1.25 5.43l4.03-3.11z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.28 2.54 1.25 6.57l4.03 3.11c.95-2.83 3.6-4.93 6.72-4.93z"/>
                </svg>
                <span>{isLoggingIn ? 'Connecting...' : 'Sign in for Sheets'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`flex flex-col items-center gap-1 font-medium ${
              activeTab === 'quizzes' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Quizzes
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center gap-1 font-medium ${
              activeTab === 'progress' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Progress
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex flex-col items-center gap-1 font-medium ${
              activeTab === 'leaderboard' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Ranking
          </button>
          <button
            onClick={() => setActiveTab('reminders')}
            className={`flex flex-col items-center gap-1 font-medium ${
              activeTab === 'reminders' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Bell className="w-4 h-4" />
            Reminders
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex flex-col items-center gap-1 font-medium ${
              activeTab === 'flashcards' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            Cards
          </button>
        </div>
      </div>
    </header>
  );
};
