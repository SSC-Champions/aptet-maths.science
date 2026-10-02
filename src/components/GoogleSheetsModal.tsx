import React, { useState } from 'react';
import { GoogleSheetsConfig } from '../types/quiz';
import { User } from 'firebase/auth';
import { 
  FileSpreadsheet, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw, 
  Plus, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Calendar,
  AlertCircle
} from 'lucide-react';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  sheetsConfig: GoogleSheetsConfig;
  onCreateSpreadsheet: () => Promise<void>;
  onSyncAll: () => Promise<void>;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  sheetsConfig,
  onCreateSpreadsheet,
  onSyncAll,
  onSignIn,
  onSignOut
}) => {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [showConfirmSync, setShowConfirmSync] = useState(false);

  if (!isOpen) return null;

  const handleCreateSheet = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      await onCreateSpreadsheet();
      setStatusMessage('Spreadsheet created and formatted successfully!');
    } catch (err: any) {
      setStatusMessage(err.message || 'Error creating spreadsheet');
    } finally {
      setLoading(false);
    }
  };

  const handlePerformSync = async () => {
    setShowConfirmSync(false);
    setLoading(true);
    setStatusMessage(null);
    try {
      await onSyncAll();
      setStatusMessage('All progress and study schedules synced successfully!');
    } catch (err: any) {
      setStatusMessage(err.message || 'Error syncing data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shadow-xs">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Google Sheets Progress Tracker
            </h3>
            <p className="text-xs text-slate-500">
              Sync quiz records &amp; learning metrics directly to your Google Account
            </p>
          </div>
        </div>

        {/* Account Status */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentUser?.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full border border-indigo-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  {currentUser?.email ? currentUser.email[0].toUpperCase() : 'G'}
                </div>
              )}
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-slate-900 dark:text-white">
                  <span>{currentUser?.displayName || 'Google Account Connected'}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-xs text-slate-500 font-mono">
                  {currentUser?.email || 'Authenticated for Google Sheets'}
                </p>
              </div>
            </div>

            <button
              onClick={onSignOut}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* Spreadsheet Status */}
        {sheetsConfig.spreadsheetId ? (
          <div className="space-y-4 mb-6">
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Study Tracker Spreadsheet Active
                  </span>
                </div>
                {sheetsConfig.spreadsheetUrl && (
                  <a
                    href={sheetsConfig.spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:underline bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-1 rounded-lg"
                  >
                    <span>Open in Sheets</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  <span className="font-semibold">Spreadsheet ID: </span>
                  <span className="font-mono text-[11px] break-all">{sheetsConfig.spreadsheetId}</span>
                </p>
                {sheetsConfig.lastSyncedAt && (
                  <p>
                    <span className="font-semibold">Last Synced: </span>
                    {sheetsConfig.lastSyncedAt}
                  </p>
                )}
              </div>
            </div>

            {/* Sheets Layout Structure description */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200">Quiz Attempts</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Logs test scores &amp; time</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200">Subject Mastery</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Subject level stats</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="font-bold text-slate-800 dark:text-slate-200">Study Schedule</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Active reminders</div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowConfirmSync(true)}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Syncing...' : 'Sync Current Progress Now'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl p-6 mb-6">
            <FileSpreadsheet className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">
              No Spreadsheet Created Yet
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5 leading-relaxed">
              Create a personalized Google Sheet to automatically track your daily quiz attempts, calculate overall mastery, and store study reminders.
            </p>
            <button
              onClick={handleCreateSheet}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all mx-auto disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {loading ? 'Creating Spreadsheet...' : 'Create Study Tracker in Google Sheets'}
            </button>
          </div>
        )}

        {statusMessage && (
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-200 text-xs font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
          >
            Done
          </button>
        </div>

        {/* Confirmation Sub-Modal for Mutating Operations */}
        {showConfirmSync && (
          <div className="absolute inset-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs rounded-3xl p-6 flex flex-col justify-center text-center">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">
              Update Google Sheet Content?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto mb-6">
              This will update the "Subject Mastery" and "Study Schedule" tabs with your latest quiz statistics and active study reminder alerts.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowConfirmSync(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handlePerformSync}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Yes, Update Sheet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
