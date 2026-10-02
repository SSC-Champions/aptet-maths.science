import { 
  QuizAttempt, 
  SubjectProgress, 
  UserStats, 
  StudyReminder, 
  GoogleSheetsConfig, 
  LeaderboardUser,
  SubjectId 
} from '../types/quiz';
import { DEFAULT_REMINDERS, INITIAL_LEADERBOARD, SUBJECTS } from '../data/questionsData';

const KEYS = {
  ATTEMPTS: 'vidyasetu_attempts_v1',
  PROGRESS: 'vidyasetu_progress_v1',
  STATS: 'vidyasetu_stats_v1',
  REMINDERS: 'vidyasetu_reminders_v1',
  SHEETS: 'vidyasetu_sheets_cfg_v1',
  LEADERBOARD: 'vidyasetu_leaderboard_v1',
  BOOKMARKS: 'vidyasetu_bookmarks_v1',
  USER_NAME: 'vidyasetu_user_name_v1'
};

export const getStoredAttempts = (): QuizAttempt[] => {
  try {
    const raw = localStorage.getItem(KEYS.ATTEMPTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveQuizAttempt = (attempt: QuizAttempt): void => {
  const attempts = getStoredAttempts();
  attempts.unshift(attempt);
  localStorage.setItem(KEYS.ATTEMPTS, JSON.stringify(attempts.slice(0, 100)));

  // Update subject progress
  updateSubjectProgress(attempt);
  // Update overall stats
  updateUserStats(attempt);
  // Update current user position in leaderboard
  updateLeaderboardScores(attempt);
};

export const getSubjectProgressMap = (): Record<string, SubjectProgress> => {
  try {
    const raw = localStorage.getItem(KEYS.PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch {}

  // Initialize defaults
  const map: Record<string, SubjectProgress> = {};
  SUBJECTS.forEach(s => {
    map[s.id] = {
      subjectId: s.id,
      quizzesTaken: 0,
      totalAnswered: 0,
      correctAnswered: 0,
      bestScorePercentage: 0,
      masteryLevel: 'Novice'
    };
  });
  return map;
};

const updateSubjectProgress = (attempt: QuizAttempt) => {
  const map = getSubjectProgressMap();
  const current = map[attempt.subjectId] || {
    subjectId: attempt.subjectId,
    quizzesTaken: 0,
    totalAnswered: 0,
    correctAnswered: 0,
    bestScorePercentage: 0,
    masteryLevel: 'Novice'
  };

  current.quizzesTaken += 1;
  current.totalAnswered += attempt.totalQuestions;
  current.correctAnswered += attempt.correctAnswers;
  current.bestScorePercentage = Math.max(current.bestScorePercentage, attempt.scorePercentage);
  current.lastPracticed = attempt.date;

  const avgAccuracy = current.totalAnswered > 0 
    ? Math.round((current.correctAnswered / current.totalAnswered) * 100) 
    : 0;

  if (current.quizzesTaken >= 5 && avgAccuracy >= 85) {
    current.masteryLevel = 'Master';
  } else if (current.quizzesTaken >= 3 && avgAccuracy >= 70) {
    current.masteryLevel = 'Proficient';
  } else if (current.quizzesTaken >= 1) {
    current.masteryLevel = 'Intermediate';
  } else {
    current.masteryLevel = 'Novice';
  }

  map[attempt.subjectId] = current;
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(map));
};

export const getUserStats = (): UserStats => {
  try {
    const raw = localStorage.getItem(KEYS.STATS);
    if (raw) return JSON.parse(raw);
  } catch {}

  return {
    totalXp: 120,
    quizzesCompleted: 0,
    totalQuestionsAnswered: 0,
    correctAnswersTotal: 0,
    currentStreakDays: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    achievements: ['First Steps']
  };
};

const updateUserStats = (attempt: QuizAttempt) => {
  const stats = getUserStats();
  stats.quizzesCompleted += 1;
  stats.totalQuestionsAnswered += attempt.totalQuestions;
  stats.correctAnswersTotal += attempt.correctAnswers;
  stats.totalXp += attempt.xpEarned;

  const today = new Date().toISOString().split('T')[0];
  if (stats.lastActiveDate !== today) {
    const lastDate = new Date(stats.lastActiveDate);
    const currentDate = new Date(today);
    const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      stats.currentStreakDays += 1;
    } else if (diffDays > 1) {
      stats.currentStreakDays = 1;
    }
    stats.lastActiveDate = today;
  }

  // Check new achievements
  if (stats.quizzesCompleted >= 1 && !stats.achievements.includes('Quiz Initiator')) {
    stats.achievements.push('Quiz Initiator');
  }
  if (stats.quizzesCompleted >= 5 && !stats.achievements.includes('Consistent Scholar')) {
    stats.achievements.push('Consistent Scholar');
  }
  if (attempt.scorePercentage === 100 && !stats.achievements.includes('Centurion')) {
    stats.achievements.push('Centurion');
  }
  if (stats.totalXp >= 1000 && !stats.achievements.includes('XP Pioneer')) {
    stats.achievements.push('XP Pioneer');
  }
  if (stats.currentStreakDays >= 3 && !stats.achievements.includes('Streak Champion')) {
    stats.achievements.push('Streak Champion');
  }

  localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
};

export const getStoredReminders = (): StudyReminder[] => {
  try {
    const raw = localStorage.getItem(KEYS.REMINDERS);
    return raw ? JSON.parse(raw) : DEFAULT_REMINDERS;
  } catch {
    return DEFAULT_REMINDERS;
  }
};

export const saveReminders = (reminders: StudyReminder[]): void => {
  localStorage.setItem(KEYS.REMINDERS, JSON.stringify(reminders));
};

export const getSheetsConfig = (): GoogleSheetsConfig => {
  try {
    const raw = localStorage.getItem(KEYS.SHEETS);
    if (raw) return JSON.parse(raw);
  } catch {}

  return {
    spreadsheetId: null,
    spreadsheetUrl: null,
    lastSyncedAt: null,
    isAutoSyncEnabled: true
  };
};

export const saveSheetsConfig = (cfg: GoogleSheetsConfig): void => {
  localStorage.setItem(KEYS.SHEETS, JSON.stringify(cfg));
};

export const getUserName = (): string => {
  return localStorage.getItem(KEYS.USER_NAME) || 'Student Aspirant';
};

export const setUserName = (name: string): void => {
  localStorage.setItem(KEYS.USER_NAME, name);
};

export const getLeaderboardData = (): LeaderboardUser[] => {
  try {
    const raw = localStorage.getItem(KEYS.LEADERBOARD);
    let list: LeaderboardUser[] = raw ? JSON.parse(raw) : INITIAL_LEADERBOARD;
    const stats = getUserStats();
    const currentName = getUserName();

    // Check if current user is present
    const exists = list.some(u => u.isCurrentUser);
    if (!exists) {
      list.push({
        id: 'current-user-me',
        name: `${currentName} (You)`,
        avatar: '🎓',
        xp: stats.totalXp,
        quizzesTaken: stats.quizzesCompleted,
        accuracy: stats.totalQuestionsAnswered > 0 
          ? Math.round((stats.correctAnswersTotal / stats.totalQuestionsAnswered) * 100) 
          : 90,
        streak: stats.currentStreakDays,
        isCurrentUser: true,
        badge: 'Aspiring Teacher'
      });
    } else {
      list = list.map(u => {
        if (u.isCurrentUser) {
          return {
            ...u,
            name: `${currentName} (You)`,
            xp: stats.totalXp,
            quizzesTaken: stats.quizzesCompleted,
            accuracy: stats.totalQuestionsAnswered > 0 
              ? Math.round((stats.correctAnswersTotal / stats.totalQuestionsAnswered) * 100) 
              : u.accuracy,
            streak: stats.currentStreakDays,
          };
        }
        return u;
      });
    }

    // Sort by XP descending and calculate rank
    list.sort((a, b) => b.xp - a.xp);
    return list.map((user, idx) => ({ ...user, rank: idx + 1 }));
  } catch {
    return INITIAL_LEADERBOARD.map((u, i) => ({ ...u, rank: i + 1 }));
  }
};

const updateLeaderboardScores = (attempt: QuizAttempt) => {
  const list = getLeaderboardData();
  const currentName = getUserName();
  const stats = getUserStats();

  const updated = list.map(u => {
    if (u.isCurrentUser) {
      return {
        ...u,
        name: `${currentName} (You)`,
        xp: stats.totalXp,
        quizzesTaken: stats.quizzesCompleted,
        accuracy: stats.totalQuestionsAnswered > 0 
          ? Math.round((stats.correctAnswersTotal / stats.totalQuestionsAnswered) * 100) 
          : 90,
        streak: stats.currentStreakDays
      };
    }
    return u;
  });

  updated.sort((a, b) => b.xp - a.xp);
  localStorage.setItem(KEYS.LEADERBOARD, JSON.stringify(updated));
};

export const playStudyChime = () => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.3); // G5
    osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.45); // C6

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
  } catch {
    // AudioContext not allowed before user gesture or unavailable
  }
};
