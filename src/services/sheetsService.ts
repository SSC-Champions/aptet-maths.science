import { QuizAttempt, SubjectProgress, StudyReminder } from '../types/quiz';
import { SUBJECTS } from '../data/questionsData';

export interface CreateSheetResponse {
  spreadsheetId: string;
  spreadsheetUrl: string;
}

export const createQuizTrackerSpreadsheet = async (accessToken: string): Promise<CreateSheetResponse> => {
  const title = `VidyaSetu - Quiz Tracker & Progress (${new Date().toLocaleDateString()})`;

  const requestBody = {
    properties: {
      title,
    },
    sheets: [
      {
        properties: {
          title: 'Quiz Attempts',
          gridProperties: { rowCount: 100, columnCount: 10 },
        },
      },
      {
        properties: {
          title: 'Subject Mastery',
          gridProperties: { rowCount: 20, columnCount: 8 },
        },
      },
      {
        properties: {
          title: 'Study Schedule',
          gridProperties: { rowCount: 30, columnCount: 6 },
        },
      },
    ],
  };

  const res = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create Google Spreadsheet (HTTP ${res.status})`);
  }

  const data = await res.json();
  const spreadsheetId = data.spreadsheetId;
  const spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Initialize Headers
  await initializeSheetHeaders(accessToken, spreadsheetId);

  return { spreadsheetId, spreadsheetUrl };
};

const initializeSheetHeaders = async (accessToken: string, spreadsheetId: string) => {
  const attemptsHeader = [
    ['Timestamp', 'Subject', 'Quiz Mode', 'Score', 'Total Questions', 'Accuracy %', 'Time Spent (s)', 'XP Earned', 'Status']
  ];

  const masteryHeader = [
    ['Subject ID', 'Subject Name', 'Quizzes Taken', 'Questions Answered', 'Correct Answers', 'Best Score %', 'Mastery Level', 'Last Practiced']
  ];

  const scheduleHeader = [
    ['Subject', 'Reminder Title', 'Scheduled Time', 'Days', 'Status', 'Notes']
  ];

  const updates = [
    { range: "'Quiz Attempts'!A1:I1", values: attemptsHeader },
    { range: "'Subject Mastery'!A1:H1", values: masteryHeader },
    { range: "'Study Schedule'!A1:F1", values: scheduleHeader },
  ];

  for (const update of updates) {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(update.range)}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: update.values }),
      }
    );
  }
};

export const appendQuizAttemptToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  attempt: QuizAttempt
): Promise<boolean> => {
  const status = attempt.scorePercentage >= 80 ? 'Mastered (A)' : attempt.scorePercentage >= 60 ? 'Passed (B)' : 'Needs Practice (C)';
  const row = [
    attempt.date,
    attempt.subjectName,
    attempt.mode.toUpperCase(),
    attempt.correctAnswers,
    attempt.totalQuestions,
    `${attempt.scorePercentage}%`,
    `${Math.floor(attempt.timeSpentSeconds / 60)}m ${attempt.timeSpentSeconds % 60}s`,
    attempt.xpEarned,
    status
  ];

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Quiz Attempts'!A1:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [row] }),
    }
  );

  return res.ok;
};

export const syncAllProgressToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  progressMap: Record<string, SubjectProgress>,
  reminders: StudyReminder[]
): Promise<boolean> => {
  // 1. Prepare Subject Mastery Rows
  const masteryRows = SUBJECTS.map(subj => {
    const p = progressMap[subj.id] || {
      subjectId: subj.id,
      quizzesTaken: 0,
      totalAnswered: 0,
      correctAnswered: 0,
      bestScorePercentage: 0,
      masteryLevel: 'Novice',
    };
    return [
      subj.id,
      subj.name,
      p.quizzesTaken,
      p.totalAnswered,
      p.correctAnswered,
      `${p.bestScorePercentage}%`,
      p.masteryLevel,
      p.lastPracticed || 'Not practiced yet'
    ];
  });

  // 2. Prepare Study Schedule Rows
  const scheduleRows = reminders.map(r => {
    const subj = SUBJECTS.find(s => s.id === r.subjectId)?.name || r.subjectId;
    return [
      subj,
      r.title,
      r.time,
      r.days.join(', '),
      r.enabled ? 'ACTIVE' : 'PAUSED',
      r.notes || ''
    ];
  });

  // Write Mastery rows starting from row 2
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Subject Mastery'!A2:H${masteryRows.length + 2}?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: masteryRows }),
    }
  );

  if (scheduleRows.length > 0) {
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Study Schedule'!A2:F${scheduleRows.length + 2}?valueInputOption=USER_ENTERED`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: scheduleRows }),
      }
    );
  }

  return true;
};
