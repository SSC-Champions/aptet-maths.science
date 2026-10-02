import React, { useState } from 'react';
import { StudyReminder, SubjectId } from '../types/quiz';
import { SUBJECTS } from '../data/questionsData';
import { playStudyChime } from '../services/storageService';
import { 
  Bell, 
  Plus, 
  Trash2, 
  Clock, 
  Volume2, 
  Check, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface StudyRemindersProps {
  reminders: StudyReminder[];
  onSaveReminders: (updated: StudyReminder[]) => void;
  onStartQuiz: (subjectId: SubjectId) => void;
}

const ALL_DAYS: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[] = [
  'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
];

export const StudyReminders: React.FC<StudyRemindersProps> = ({
  reminders,
  onSaveReminders,
  onStartQuiz
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [subjectId, setSubjectId] = useState<SubjectId>('cdp');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('18:00');
  const [selectedDays, setSelectedDays] = useState<('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[]>([
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri'
  ]);
  const [notes, setNotes] = useState('');
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [chimePlaying, setChimePlaying] = useState(false);

  const handleToggleReminder = (id: string) => {
    const updated = reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r);
    onSaveReminders(updated);
  };

  const handleDeleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    onSaveReminders(updated);
  };

  const handleDayToggle = (day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun') => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter(d => d !== day));
      }
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const subjName = SUBJECTS.find(s => s.id === subjectId)?.name || 'Subject';
    const newReminder: StudyReminder = {
      id: `rem-${Date.now()}`,
      subjectId,
      title: title.trim() || `${subjName} Study Session`,
      time,
      days: selectedDays,
      enabled: true,
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    onSaveReminders([...reminders, newReminder]);
    setShowAddModal(false);
    setTitle('');
    setNotes('');
  };

  const requestBrowserNotifications = async () => {
    if (typeof Notification !== 'undefined') {
      const res = await Notification.requestPermission();
      setNotificationPermission(res);
      if (res === 'granted') {
        new Notification('VidyaSetu Study Reminders Active', {
          body: 'You will receive study notifications when practice time arrives!',
          icon: '/favicon.ico'
        });
      }
    }
  };

  const handleTestChime = () => {
    playStudyChime();
    setChimePlaying(true);
    setTimeout(() => setChimePlaying(false), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-bold uppercase tracking-wider">
                Consistency Engine
              </span>
              <span className="text-xs text-purple-300 font-medium">
                Custom Study Routines
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Subject Study Reminders
            </h1>
            <p className="text-purple-200 text-sm mt-1 max-w-lg">
              Set customized alerts for daily practice questions, revision drills, and mock exams to maintain high retention.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={handleTestChime}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
            >
              <Volume2 className={`w-4 h-4 ${chimePlaying ? 'text-amber-400 animate-spin' : ''}`} />
              <span>Test Study Bell</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Reminder
            </button>
          </div>
        </div>
      </div>

      {/* Browser Notification Permission Banner */}
      {notificationPermission !== 'granted' && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
                Enable Desktop Notifications
              </h4>
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Receive browser alerts when it's time for your daily subject practice drills.
              </p>
            </div>
          </div>
          <button
            onClick={requestBrowserNotifications}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            Allow Notifications
          </button>
        </div>
      )}

      {/* Reminders List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Scheduled Study Alerts ({reminders.length})
            </h2>
            <p className="text-xs text-slate-500">
              Active alarms will chime with custom study notes
            </p>
          </div>
        </div>

        {reminders.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No reminders configured. Click "Add Reminder" above to set your study schedule!
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map(rem => {
              const subj = SUBJECTS.find(s => s.id === rem.subjectId);

              return (
                <div 
                  key={rem.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    rem.enabled 
                      ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/80' 
                      : 'bg-slate-100/40 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center text-indigo-600 dark:text-indigo-400 font-mono font-black text-sm shrink-0 shadow-xs">
                      <Clock className="w-4 h-4 mb-0.5 text-slate-400" />
                      {rem.time}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                          {rem.title}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${subj?.badgeBg || 'bg-slate-100 text-slate-600'}`}>
                          {subj?.name || rem.subjectId}
                        </span>
                      </div>

                      {rem.notes && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                          {rem.notes}
                        </p>
                      )}

                      {/* Day chips */}
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {ALL_DAYS.map(day => {
                          const isDayActive = rem.days.includes(day);
                          return (
                            <span
                              key={day}
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                                isDayActive 
                                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            >
                              {day}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => onStartQuiz(rem.subjectId)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold hover:bg-indigo-100 transition-colors"
                    >
                      Start Drill
                    </button>

                    {/* Toggle switch */}
                    <button
                      onClick={() => handleToggleReminder(rem.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        rem.enabled ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                      title={rem.enabled ? 'Disable Reminder' : 'Enable Reminder'}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          rem.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>

                    <button
                      onClick={() => handleDeleteReminder(rem.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                      title="Delete Reminder"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Create Study Reminder
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Set customized daily practice alerts to establish regular study habits
            </p>

            <form onSubmit={handleCreateReminder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value as SubjectId)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200"
                >
                  {SUBJECTS.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.teluguName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Reminder Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Evening Math Trigonometry Practice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Alert Time (24h)
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Repeat Days
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_DAYS.map(day => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => handleDayToggle(day)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Focus Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Focus on previous exam question bits and formulas"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
