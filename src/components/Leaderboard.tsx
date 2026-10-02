import React, { useState } from 'react';
import { LeaderboardUser } from '../types/quiz';
import { 
  Trophy, 
  Medal, 
  Flame, 
  Sparkles, 
  Search, 
  ArrowUpRight, 
  Crown,
  Users
} from 'lucide-react';

interface LeaderboardProps {
  users: LeaderboardUser[];
  onStartQuiz: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ users, onStartQuiz }) => {
  const [filterTime, setFilterTime] = useState<'all' | 'weekly'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentUser = users.find(u => u.isCurrentUser);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const top1 = users[0];
  const top2 = users[1];
  const top3 = users[2];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Trophy className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Hall of Fame</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Student Leaderboard &amp; Rankings
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
          Compete with fellow TET aspirants across Telangana &amp; Andhra Pradesh. Earn XP for every correct answer!
        </p>
      </div>

      {/* Top 3 Podium */}
      {users.length >= 3 && (
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-3xl mx-auto pt-6 items-end">
          
          {/* #2 Rank Silver */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-center relative flex flex-col items-center">
            <div className="absolute -top-4 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-xs flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
              2
            </div>
            <div className="text-3xl sm:text-4xl mt-1 mb-2">{top2.avatar}</div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate w-full">
              {top2.name}
            </h4>
            <span className="text-[10px] text-slate-400 font-semibold mb-2">
              {top2.badge || 'Scholar'}
            </span>
            <div className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-black text-xs">
              {top2.xp} XP
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1">
              {top2.accuracy}% Acc
            </div>
          </div>

          {/* #1 Rank Gold */}
          <div className="bg-gradient-to-b from-amber-500/10 via-white to-white dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-900 rounded-3xl p-5 sm:p-6 border-2 border-amber-300 dark:border-amber-700/80 shadow-lg text-center relative flex flex-col items-center -translate-y-2">
            <div className="absolute -top-6 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-white font-black text-sm flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-md">
              <Crown className="w-5 h-5 fill-white" />
            </div>
            <div className="text-4xl sm:text-5xl mt-1 mb-2">{top1.avatar}</div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base truncate w-full">
              {top1.name}
            </h4>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold mb-2">
              🏆 {top1.badge || 'Champion'}
            </span>
            <div className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-black text-xs sm:text-sm">
              {top1.xp} XP
            </div>
            <div className="text-[11px] text-emerald-600 font-bold mt-1">
              {top1.accuracy}% Accuracy
            </div>
          </div>

          {/* #3 Rank Bronze */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-center relative flex flex-col items-center">
            <div className="absolute -top-4 w-8 h-8 rounded-full bg-amber-700/30 text-amber-800 dark:text-amber-400 font-black text-xs flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-xs">
              3
            </div>
            <div className="text-3xl sm:text-4xl mt-1 mb-2">{top3.avatar}</div>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate w-full">
              {top3.name}
            </h4>
            <span className="text-[10px] text-slate-400 font-semibold mb-2">
              {top3.badge || 'Achiever'}
            </span>
            <div className="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-black text-xs">
              {top3.xp} XP
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1">
              {top3.accuracy}% Acc
            </div>
          </div>
        </div>
      )}

      {/* Current User Standings Card */}
      {currentUser && (
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40 rounded-2xl p-5 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-base shadow-sm">
              #{currentUser.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                  {currentUser.name}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                  Your Standing
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You have {currentUser.xp} XP with {currentUser.accuracy}% accuracy across {currentUser.quizzesTaken} quizzes
              </p>
            </div>
          </div>

          <button
            onClick={onStartQuiz}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-indigo-500/20 transition-all shrink-0"
          >
            Practice More to Rank Up
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Leaderboard Table with Search & Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search student by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Timeframe toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setFilterTime('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterTime === 'all' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setFilterTime('weekly')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filterTime === 'weekly' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs' : 'text-slate-500'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                <th className="pb-3 text-center w-12">Rank</th>
                <th className="pb-3">Student</th>
                <th className="pb-3 text-center">Quizzes</th>
                <th className="pb-3 text-center">Accuracy</th>
                <th className="pb-3 text-center">Streak</th>
                <th className="pb-3 text-right">XP Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.map((u) => {
                const isUser = u.isCurrentUser;
                return (
                  <tr 
                    key={u.id}
                    className={`transition-colors ${
                      isUser 
                        ? 'bg-indigo-50/70 dark:bg-indigo-950/40 font-bold' 
                        : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="py-3.5 text-center font-black">
                      {u.rank === 1 ? '🥇' : u.rank === 2 ? '🥈' : u.rank === 3 ? '🥉' : `#${u.rank}`}
                    </td>

                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{u.avatar}</span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            {u.name}
                            {isUser && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-indigo-600 text-white">
                                YOU
                              </span>
                            )}
                          </div>
                          {u.badge && (
                            <span className="text-[10px] text-slate-400 font-medium">
                              {u.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-center font-medium text-slate-600 dark:text-slate-300">
                      {u.quizzesTaken}
                    </td>

                    <td className="py-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400">
                      {u.accuracy}%
                    </td>

                    <td className="py-3.5 text-center font-semibold text-amber-500">
                      <span className="inline-flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 fill-amber-500" />
                        {u.streak}d
                      </span>
                    </td>

                    <td className="py-3.5 text-right font-black text-purple-600 dark:text-purple-400 font-mono">
                      {u.xp}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
