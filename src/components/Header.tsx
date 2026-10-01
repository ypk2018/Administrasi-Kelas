import React from 'react';
import { SchoolConfig, UserAccount } from '../types';
import { Bell, Shield, User, LogOut, Calendar, GraduationCap } from 'lucide-react';

interface HeaderProps {
  config: SchoolConfig;
  currentUser: UserAccount;
  onSelectUser: (user: UserAccount) => void;
  allUsers: UserAccount[];
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  currentUser,
  onSelectUser,
  allUsers,
  onOpenNotifications,
  unreadCount
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);

  const roleLabels: Record<string, string> = {
    super_admin: 'Super Admin',
    kepala_sekolah: 'Kepala Sekolah',
    operator: 'Operator Sekolah',
    waka: 'Wakil Kepala Sekolah',
    wali_kelas: 'Wali Kelas VII-A',
    guru_mapel: 'Guru Mata Pelajaran',
    bk: 'Guru BK',
    siswa: 'Siswa (Elias Wally)',
    ortu: 'Orang Tua / Wali'
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 h-16 px-4 md:px-6 flex items-center justify-between shadow-xs">
      {/* Zone 1: Brand title / School identity */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-lg shadow-sm">
          7
        </div>
        <div>
          <h1 className="text-base font-bold tracking-tight text-slate-900 leading-tight">
            {config.name}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block">
            Kabupaten Jayapura, Papua · TP {config.currentAcademicYear} ({config.currentSemester})
          </p>
        </div>
      </div>

      {/* Zone 2: Academic status / info badge */}
      <div className="hidden lg:flex items-center gap-4 text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
          <span>TP: {config.currentAcademicYear}</span>
        </div>
        <span className="text-slate-300">|</span>
        <div className="flex items-center gap-1.5 font-medium">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
          <span>Semester {config.currentSemester}</span>
        </div>
      </div>

      {/* Zone 3: Primary actions (Notifications & Role Switcher) */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenNotifications}
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Pusat Notifikasi"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-800 transition-colors"
          >
            <Shield className="w-4 h-4 text-emerald-700" />
            <div className="text-left hidden sm:block">
              <div className="font-bold">{currentUser.name}</div>
              <div className="text-[10px] text-slate-500 font-normal">{roleLabels[currentUser.role]}</div>
            </div>
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs text-slate-400 font-medium">Ganti Role Pengguna (Demo):</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {allUsers.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      onSelectUser(u);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-50 flex items-center justify-between ${
                      currentUser.id === u.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{u.name}</div>
                      <div className="text-[10px] text-slate-400">{roleLabels[u.role] || u.role}</div>
                    </div>
                    {currentUser.id === u.id && <span className="text-emerald-700 text-xs">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
