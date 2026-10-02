import { 
  QuizAttempt, 
  SubjectProgress, 
  UserStats, 
  StudyReminder, 
  GoogleSheetsConfig, 
  LeaderboardUser,
  SubjectId,
  UserProfile,
  Question
} from '../types/quiz';
import { DEFAULT_REMINDERS, INITIAL_LEADERBOARD, SUBJECTS, QUESTIONS } from '../data/questionsData';

const GLOBAL_KEYS = {
  USERS_LIST: 'vidyasetu_users_v2',
  ACTIVE_USER_ID: 'vidyasetu_active_user_id_v2',
  SHEETS_CONFIG: 'vidyasetu_sheets_cfg_v2',
  LEADERBOARD: 'vidyasetu_leaderboard_v2'
};

const DEFAULT_USER: UserProfile = {
  id: 'usr-default-swamy',
  name: 'Narayana Swamy',
  email: 'swamy6677@gmail.com',
  avatar: '👨‍🎓',
  registeredAt: '2026-10-01',
  isGoogleLinked: true
};

// ==========================================
// USER PROFILE & LOGIN MANAGEMENT
// ==========================================

export const getAllUsers = (): UserProfile[] => {
  try {
    const raw = localStorage.getItem(GLOBAL_KEYS.USERS_LIST);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [DEFAULT_USER];
};

export const getActiveUser = (): UserProfile => {
  const users = getAllUsers();
  const activeId = localStorage.getItem(GLOBAL_KEYS.ACTIVE_USER_ID);
  const found = users.find(u => u.id === activeId);
  return found || users[0] || DEFAULT_USER;
};

export const setActiveUser = (userId: string): void => {
  localStorage.setItem(GLOBAL_KEYS.ACTIVE_USER_ID, userId);
};

export const createOrLoginUser = (name: string, email?: string, avatar: string = '🎓'): UserProfile => {
  const users = getAllUsers();
  const cleanName = name.trim();
  
  // Check if exists
  let user = users.find(u => 
    u.name.toLowerCase() === cleanName.toLowerCase() || 
    (email && u.email && u.email.toLowerCase() === email.toLowerCase())
  );

  if (!user) {
    user = {
      id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: cleanName,
      email: email || '',
      avatar,
      registeredAt: new Date().toISOString().split('T')[0],
      isGoogleLinked: !!email
    };
    users.push(user);
    localStorage.setItem(GLOBAL_KEYS.USERS_LIST, JSON.stringify(users));
  } else if (email && !user.email) {
    user.email = email;
    user.isGoogleLinked = true;
    localStorage.setItem(GLOBAL_KEYS.USERS_LIST, JSON.stringify(users));
  }

  setActiveUser(user.id);
  return user;
};

export const linkGoogleUser = (name: string, email: string, photoURL?: string): UserProfile => {
  const users = getAllUsers();
  let user = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    // Check if active user has no email, attach to them
    const active = getActiveUser();
    if (!active.isGoogleLinked && (!active.email || active.email === '')) {
      active.name = name || active.name;
      active.email = email;
      active.isGoogleLinked = true;
      active.avatar = photoURL ? '🌐' : active.avatar;
      const updatedList = users.map(u => u.id === active.id ? active : u);
      localStorage.setItem(GLOBAL_KEYS.USERS_LIST, JSON.stringify(updatedList));
      return active;
    }

    user = {
      id: `usr-google-${Date.now()}`,
      name: name || 'Google Learner',
      email,
      avatar: '🌐',
      registeredAt: new Date().toISOString().split('T')[0],
      isGoogleLinked: true
    };
    users.push(user);
    localStorage.setItem(GLOBAL_KEYS.USERS_LIST, JSON.stringify(users));
  } else {
    user.name = name || user.name;
    user.isGoogleLinked = true;
    localStorage.setItem(GLOBAL_KEYS.USERS_LIST, JSON.stringify(users));
  }

  setActiveUser(user.id);
  return user;
};

// ==========================================
// SEQUENTIAL PDF QUESTION DISPATCHER (NO REPEATS)
// ==========================================

export const getUserAnsweredQuestionIds = (userId: string, subjectId: SubjectId): number[] => {
  try {
    const raw = localStorage.getItem(`vidyasetu_${userId}_answered_${subjectId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const getNextQuestionsForUser = (
  userId: string,
  subjectId: SubjectId,
  count: number
): {
  questions: Question[];
  startPdfNo: number;
  endPdfNo: number;
  allCompleted: boolean;
  totalAnswered: number;
  totalAvailable: number;
} => {
  // 1. Get all questions for this subject sorted in exact PDF order
  const allSubjQuestions = QUESTIONS
    .filter(q => q.subjectId === subjectId)
    .sort((a, b) => a.pdfQuestionNo - b.pdfQuestionNo);

  // 2. Filter out already answered questions for this user
  const answeredIds = getUserAnsweredQuestionIds(userId, subjectId);
  const remainingQuestions = allSubjQuestions.filter(q => !answeredIds.includes(q.id));

  // If user completed all available questions in this subject
  if (remainingQuestions.length === 0) {
    return {
      questions: allSubjQuestions.slice(0, count), // fallback to beginning
      startPdfNo: allSubjQuestions[0]?.pdfQuestionNo || 1,
      endPdfNo: allSubjQuestions[Math.min(count, allSubjQuestions.length) - 1]?.pdfQuestionNo || count,
      allCompleted: true,
      totalAnswered: allSubjQuestions.length,
      totalAvailable: allSubjQuestions.length
    };
  }

  // 3. Take next 'count' questions in continuous sequence
  const batch = remainingQuestions.slice(0, count);
  const startPdfNo = batch[0].pdfQuestionNo;
  const endPdfNo = batch[batch.length - 1].pdfQuestionNo;

  return {
    questions: batch,
    startPdfNo,
    endPdfNo,
    allCompleted: false,
    totalAnswered: answeredIds.length,
    totalAvailable: allSubjQuestions.length
  };
};

export const markQuestionsAsAnsweredForUser = (
  userId: string, 
  subjectId: SubjectId, 
  questionIds: number[]
): void => {
  const current = getUserAnsweredQuestionIds(userId, subjectId);
  const updatedSet = new Set([...current, ...questionIds]);
  localStorage.setItem(
    `vidyasetu_${userId}_answered_${subjectId}`, 
    JSON.stringify(Array.from(updatedSet))
  );
};

export const resetUserProgression = (userId: string, subjectId: SubjectId): void => {
  localStorage.removeItem(`vidyasetu_${userId}_answered_${subjectId}`);
  // Also update subject progress map
  const map = getSubjectProgressMap(userId);
  if (map[subjectId]) {
    map[subjectId].lastQuestionIndex = 0;
    map[subjectId].answeredQuestionIds = [];
    localStorage.setItem(`vidyasetu_${userId}_progress`, JSON.stringify(map));
  }
};

// ==========================================
// USER ATTEMPTS & PROGRESS (ISOLATED PER USER)
// ==========================================

export const getStoredAttempts = (userId?: string): QuizAttempt[] => {
  const uid = userId || getActiveUser().id;
  try {
    const raw = localStorage.getItem(`vidyasetu_${uid}_attempts`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveQuizAttempt = (attempt: QuizAttempt): void => {
  const uid = attempt.userId;
  const attempts = getStoredAttempts(uid);
  attempts.unshift(attempt);
  localStorage.setItem(`vidyasetu_${uid}_attempts`, JSON.stringify(attempts.slice(0, 100)));

  // Update subject progress
  updateSubjectProgress(uid, attempt);
  // Update overall stats
  updateUserStats(uid, attempt);
  // Update leaderboard
  updateLeaderboardScores(attempt);
};

export const getSubjectProgressMap = (userId?: string): Record<string, SubjectProgress> => {
  const uid = userId || getActiveUser().id;
  try {
    const raw = localStorage.getItem(`vidyasetu_${uid}_progress`);
    if (raw) return JSON.parse(raw);
  } catch {}

  const map: Record<string, SubjectProgress> = {};
  SUBJECTS.forEach(s => {
    map[s.id] = {
      subjectId: s.id,
      quizzesTaken: 0,
      totalAnswered: 0,
      correctAnswered: 0,
      bestScorePercentage: 0,
      masteryLevel: 'Novice',
      lastQuestionIndex: 0,
      answeredQuestionIds: []
    };
  });
  return map;
};

const updateSubjectProgress = (userId: string, attempt: QuizAttempt) => {
  const map = getSubjectProgressMap(userId);
  const current = map[attempt.subjectId] || {
    subjectId: attempt.subjectId,
    quizzesTaken: 0,
    totalAnswered: 0,
    correctAnswered: 0,
    bestScorePercentage: 0,
    masteryLevel: 'Novice',
    lastQuestionIndex: 0,
    answeredQuestionIds: []
  };

  current.quizzesTaken += 1;
  current.totalAnswered += attempt.totalQuestions;
  current.correctAnswered += attempt.correctAnswers;
  current.bestScorePercentage = Math.max(current.bestScorePercentage, attempt.scorePercentage);
  current.lastPracticed = attempt.date;
  current.lastQuestionIndex = attempt.endPdfNo;

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
  localStorage.setItem(`vidyasetu_${userId}_progress`, JSON.stringify(map));
};

export const getUserStats = (userId?: string): UserStats => {
  const uid = userId || getActiveUser().id;
  try {
    const raw = localStorage.getItem(`vidyasetu_${uid}_stats`);
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

const updateUserStats = (userId: string, attempt: QuizAttempt) => {
  const stats = getUserStats(userId);
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

  localStorage.setItem(`vidyasetu_${userId}_stats`, JSON.stringify(stats));
};

// ==========================================
// REMINDERS & SHEETS
// ==========================================

export const getStoredReminders = (userId?: string): StudyReminder[] => {
  const uid = userId || getActiveUser().id;
  try {
    const raw = localStorage.getItem(`vidyasetu_${uid}_reminders`);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_REMINDERS.map(r => ({ ...r, userId: uid }));
};

export const saveReminders = (reminders: StudyReminder[], userId?: string): void => {
  const uid = userId || getActiveUser().id;
  localStorage.setItem(`vidyasetu_${uid}_reminders`, JSON.stringify(reminders));
};

export const getSheetsConfig = (): GoogleSheetsConfig => {
  try {
    const raw = localStorage.getItem(GLOBAL_KEYS.SHEETS_CONFIG);
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
  localStorage.setItem(GLOBAL_KEYS.SHEETS_CONFIG, JSON.stringify(cfg));
};

// ==========================================
// LEADERBOARD
// ==========================================

export const getLeaderboardData = (): LeaderboardUser[] => {
  try {
    const raw = localStorage.getItem(GLOBAL_KEYS.LEADERBOARD);
    let list: LeaderboardUser[] = raw ? JSON.parse(raw) : INITIAL_LEADERBOARD;
    const active = getActiveUser();
    const stats = getUserStats(active.id);

    const exists = list.some(u => u.id === active.id || u.isCurrentUser);
    if (!exists) {
      list.push({
        id: active.id,
        name: `${active.name} (You)`,
        avatar: active.avatar || '🎓',
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
        if (u.id === active.id || u.isCurrentUser) {
          return {
            ...u,
            id: active.id,
            name: `${active.name} (You)`,
            avatar: active.avatar || u.avatar,
            xp: stats.totalXp,
            quizzesTaken: stats.quizzesCompleted,
            accuracy: stats.totalQuestionsAnswered > 0 
              ? Math.round((stats.correctAnswersTotal / stats.totalQuestionsAnswered) * 100) 
              : u.accuracy,
            streak: stats.currentStreakDays,
            isCurrentUser: true
          };
        }
        return u;
      });
    }

    list.sort((a, b) => b.xp - a.xp);
    return list.map((user, idx) => ({ ...user, rank: idx + 1 }));
  } catch {
    return INITIAL_LEADERBOARD.map((u, i) => ({ ...u, rank: i + 1 }));
  }
};

const updateLeaderboardScores = (attempt: QuizAttempt) => {
  const list = getLeaderboardData();
  const active = getActiveUser();
  const stats = getUserStats(active.id);

  const updated = list.map(u => {
    if (u.id === active.id || u.isCurrentUser) {
      return {
        ...u,
        id: active.id,
        name: `${active.name} (You)`,
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
  localStorage.setItem(GLOBAL_KEYS.LEADERBOARD, JSON.stringify(updated));
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
  } catch {}
};
