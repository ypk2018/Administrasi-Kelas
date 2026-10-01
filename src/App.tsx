import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { NotificationModal } from './components/NotificationModal';
import {
  initialSchoolConfig,
  initialUsers,
  initialTeachers,
  initialRombels,
  initialSubjects,
  initialStudents,
  initialAttendance,
  initialGrades,
  initialExtracurriculars,
  initialExtracurricularMembers,
  initialAchievements,
  initialViolations,
  initialWaliNotes,
  initialParentComms,
  initialAnnouncements,
  initialCalendar,
  initialAuditLogs
} from './data/mockData';
import {
  SchoolConfig,
  UserAccount,
  Student,
  Teacher,
  Rombel,
  Subject,
  AttendanceRecord,
  GradeRecord,
  Assessment,
  Extracurricular,
  ExtracurricularMember,
  Achievement,
  Violation,
  WaliNote,
  ParentCommunication,
  CounselingRecord,
  MutasiRecord,
  PromotionRecord,
  Announcement,
  AcademicCalendarEvent,
  AuditLog
} from './types';

// Import Views
import { DashboardView } from './views/DashboardView';
import { MasterDataView } from './views/MasterDataView';
import { StudentsView } from './views/StudentsView';
import { RombelView } from './views/RombelView';
import { AttendanceView } from './views/AttendanceView';
import { GradesView } from './views/GradesView';
import { AssessmentView } from './views/AssessmentView';
import { ExtracurricularView } from './views/ExtracurricularView';
import { AchievementsView } from './views/AchievementsView';
import { ViolationsView } from './views/ViolationsView';
import { CounselingView } from './views/CounselingView';
import { WaliNotesView } from './views/WaliNotesView';
import { ParentCommView } from './views/ParentCommView';
import { MutasiView } from './views/MutasiView';
import { PromotionView } from './views/PromotionView';
import { LegerReportView } from './views/LegerReportView';
import { ReportsView } from './views/ReportsView';
import { DocumentsView } from './views/DocumentsView';
import { MonitoringView } from './views/MonitoringView';
import { CalendarView } from './views/CalendarView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { DocumentationView } from './views/DocumentationView';
import { AuditLogView } from './views/AuditLogView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [config, setConfig] = useState<SchoolConfig>(() => {
    const saved = localStorage.getItem('smpn7_config');
    return saved ? JSON.parse(saved) : initialSchoolConfig;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount>(() => {
    const saved = localStorage.getItem('smpn7_user');
    return saved ? JSON.parse(saved) : initialUsers[0];
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('smpn7_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem('smpn7_teachers');
    return saved ? JSON.parse(saved) : initialTeachers;
  });

  const [rombels, setRombels] = useState<Rombel[]>(() => {
    const saved = localStorage.getItem('smpn7_rombels');
    return saved ? JSON.parse(saved) : initialRombels;
  });

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem('smpn7_subjects');
    return saved ? JSON.parse(saved) : initialSubjects;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('smpn7_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [grades, setGrades] = useState<GradeRecord[]>(() => {
    const saved = localStorage.getItem('smpn7_grades');
    return saved ? JSON.parse(saved) : initialGrades;
  });

  const [assessments, setAssessments] = useState<Assessment[]>(() => {
    const saved = localStorage.getItem('smpn7_assessments');
    return saved ? JSON.parse(saved) : [];
  });

  const [extracurriculars, setExtracurriculars] = useState<Extracurricular[]>(() => {
    const saved = localStorage.getItem('smpn7_extracurriculars');
    return saved ? JSON.parse(saved) : initialExtracurriculars;
  });

  const [extracurricularMembers, setExtracurricularMembers] = useState<ExtracurricularMember[]>(() => {
    const saved = localStorage.getItem('smpn7_extracurricularMembers');
    return saved ? JSON.parse(saved) : initialExtracurricularMembers;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('smpn7_achievements');
    return saved ? JSON.parse(saved) : initialAchievements;
  });

  const [violations, setViolations] = useState<Violation[]>(() => {
    const saved = localStorage.getItem('smpn7_violations');
    return saved ? JSON.parse(saved) : initialViolations;
  });

  const [waliNotes, setWaliNotes] = useState<WaliNote[]>(() => {
    const saved = localStorage.getItem('smpn7_waliNotes');
    return saved ? JSON.parse(saved) : initialWaliNotes;
  });

  const [parentComms, setParentComms] = useState<ParentCommunication[]>(() => {
    const saved = localStorage.getItem('smpn7_parentComms');
    return saved ? JSON.parse(saved) : initialParentComms;
  });

  const [counselings, setCounselings] = useState<CounselingRecord[]>(() => {
    const saved = localStorage.getItem('smpn7_counselings');
    return saved ? JSON.parse(saved) : [];
  });

  const [mutations, setMutations] = useState<MutasiRecord[]>(() => {
    const saved = localStorage.getItem('smpn7_mutations');
    return saved ? JSON.parse(saved) : [];
  });

  const [promotions, setPromotions] = useState<PromotionRecord[]>(() => {
    const saved = localStorage.getItem('smpn7_promotions');
    return saved ? JSON.parse(saved) : [];
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('smpn7_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [calendar, setCalendar] = useState<AcademicCalendarEvent[]>(() => {
    const saved = localStorage.getItem('smpn7_calendar');
    return saved ? JSON.parse(saved) : initialCalendar;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('smpn7_auditLogs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('smpn7_config', JSON.stringify(config));
    localStorage.setItem('smpn7_user', JSON.stringify(currentUser));
    localStorage.setItem('smpn7_students', JSON.stringify(students));
    localStorage.setItem('smpn7_teachers', JSON.stringify(teachers));
    localStorage.setItem('smpn7_rombels', JSON.stringify(rombels));
    localStorage.setItem('smpn7_subjects', JSON.stringify(subjects));
    localStorage.setItem('smpn7_attendance', JSON.stringify(attendance));
    localStorage.setItem('smpn7_grades', JSON.stringify(grades));
    localStorage.setItem('smpn7_assessments', JSON.stringify(assessments));
    localStorage.setItem('smpn7_extracurriculars', JSON.stringify(extracurriculars));
    localStorage.setItem('smpn7_extracurricularMembers', JSON.stringify(extracurricularMembers));
    localStorage.setItem('smpn7_achievements', JSON.stringify(achievements));
    localStorage.setItem('smpn7_violations', JSON.stringify(violations));
    localStorage.setItem('smpn7_waliNotes', JSON.stringify(waliNotes));
    localStorage.setItem('smpn7_parentComms', JSON.stringify(parentComms));
    localStorage.setItem('smpn7_counselings', JSON.stringify(counselings));
    localStorage.setItem('smpn7_mutations', JSON.stringify(mutations));
    localStorage.setItem('smpn7_promotions', JSON.stringify(promotions));
    localStorage.setItem('smpn7_announcements', JSON.stringify(announcements));
    localStorage.setItem('smpn7_calendar', JSON.stringify(calendar));
    localStorage.setItem('smpn7_auditLogs', JSON.stringify(auditLogs));
  }, [
    config, currentUser, students, teachers, rombels, subjects, attendance, grades,
    assessments, extracurriculars, extracurricularMembers, achievements, violations,
    waliNotes, parentComms, counselings, mutations, promotions, announcements, calendar, auditLogs
  ]);

  const handleResetDemoData = () => {
    setConfig(initialSchoolConfig);
    setCurrentUser(initialUsers[0]);
    setStudents(initialStudents);
    setTeachers(initialTeachers);
    setRombels(initialRombels);
    setSubjects(initialSubjects);
    setAttendance(initialAttendance);
    setGrades(initialGrades);
    setAssessments([]);
    setExtracurriculars(initialExtracurriculars);
    setExtracurricularMembers(initialExtracurricularMembers);
    setAchievements(initialAchievements);
    setViolations(initialViolations);
    setWaliNotes(initialWaliNotes);
    setParentComms(initialParentComms);
    setCounselings([]);
    setMutations([]);
    setPromotions([]);
    setAnnouncements(initialAnnouncements);
    setCalendar(initialCalendar);
    setAuditLogs(initialAuditLogs);
  };

  const logAction = (module: string, action: AuditLog['action'], details: string) => {
    const newLog: AuditLog = {
      id: 'al_' + Date.now(),
      username: currentUser.username,
      role: currentUser.role,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      module,
      action,
      details
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header
        config={config}
        currentUser={currentUser}
        onSelectUser={(u) => {
          setCurrentUser(u);
          logAction('SISTEM', 'LOGIN', `Berganti role ke ${u.name} (${u.role})`);
        }}
        allUsers={initialUsers}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        unreadCount={announcements.length}
      />

      <div className="flex-1 flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <DashboardView
              config={config}
              currentUser={currentUser}
              students={students}
              rombels={rombels}
              attendance={attendance}
              grades={grades}
              achievements={achievements}
              violations={violations}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'master' && (
            <MasterDataView
              teachers={teachers}
              subjects={subjects}
              rombels={rombels}
              onAddTeacher={(t) => {
                setTeachers([...teachers, t]);
                logAction('MASTER_DATA', 'CREATE', `Menambahkan guru ${t.name}`);
              }}
            />
          )}

          {activeTab === 'students' && (
            <StudentsView
              students={students}
              rombels={rombels}
              onAddStudent={(s) => {
                setStudents([...students, s]);
                logAction('SISWA', 'CREATE', `Menambahkan siswa ${s.fullName}`);
              }}
              onUpdateStudent={(s) => {
                setStudents(students.map((item) => item.id === s.id ? s : item));
                logAction('SISWA', 'UPDATE', `Memperbarui data siswa ${s.fullName}`);
              }}
              onDeleteStudent={(id) => {
                setStudents(students.filter((item) => item.id !== id));
                logAction('SISWA', 'DELETE', `Menghapus siswa ID ${id}`);
              }}
              attendance={attendance}
              grades={grades}
              extracurricularMembers={extracurricularMembers}
              achievements={achievements}
              violations={violations}
              waliNotes={waliNotes}
              parentComms={parentComms}
              counselings={counselings}
              mutations={mutations}
            />
          )}

          {activeTab === 'rombel' && (
            <RombelView rombels={rombels} teachers={teachers} students={students} />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView
              students={students}
              rombels={rombels}
              attendance={attendance}
              onSaveAttendance={(records) => {
                const filtered = attendance.filter((a) => !records.some((r) => r.studentId === a.studentId && r.date === a.date));
                setAttendance([...filtered, ...records]);
                logAction('KEHADIRAN', 'CREATE', 'Menyimpan presensi harian siswa');
              }}
            />
          )}

          {activeTab === 'grades' && (
            <GradesView subjects={subjects} rombels={rombels} grades={grades} students={students} />
          )}

          {activeTab === 'assessment' && (
            <AssessmentView
              assessments={assessments}
              subjects={subjects}
              rombels={rombels}
              onAddAssessment={(asm) => {
                setAssessments([...assessments, asm]);
                logAction('ASESMEN', 'CREATE', `Menambahkan asesmen ${asm.title}`);
              }}
            />
          )}

          {activeTab === 'extracurricular' && (
            <ExtracurricularView
              extracurriculars={extracurriculars}
              members={extracurricularMembers}
              students={students}
              onAddMember={(m) => {
                setExtracurricularMembers([...extracurricularMembers, m]);
                logAction('EKSKUL', 'CREATE', 'Menambahkan anggota ekstrakurikuler');
              }}
            />
          )}

          {activeTab === 'achievements' && (
            <AchievementsView
              achievements={achievements}
              students={students}
              onAddAchievement={(ach) => {
                setAchievements([...achievements, ach]);
                logAction('PRESTASI', 'CREATE', `Menambahkan prestasi ${ach.title}`);
              }}
            />
          )}

          {activeTab === 'violations' && (
            <ViolationsView
              violations={violations}
              students={students}
              onAddViolation={(v) => {
                setViolations([...violations, v]);
                logAction('PELANGGARAN', 'CREATE', `Mencatat pelanggaran ${v.violationType}`);
              }}
            />
          )}

          {activeTab === 'counseling' && (
            <CounselingView counselings={counselings} students={students} />
          )}

          {activeTab === 'wali_notes' && (
            <WaliNotesView
              waliNotes={waliNotes}
              students={students}
              onAddWaliNote={(n) => {
                setWaliNotes([...waliNotes, n]);
                logAction('CATATAN_WALI', 'CREATE', 'Menambahkan catatan wali kelas');
              }}
            />
          )}

          {activeTab === 'parent_comm' && (
            <ParentCommView
              parentComms={parentComms}
              students={students}
              onAddComm={(pc) => {
                setParentComms([...parentComms, pc]);
                logAction('KOMUNIKASI', 'CREATE', 'Mencatat komunikasi orang tua');
              }}
            />
          )}

          {activeTab === 'mutasi' && (
            <MutasiView mutations={mutations} students={students} />
          )}

          {activeTab === 'promotion' && (
            <PromotionView
              promotions={promotions}
              students={students}
              rombels={rombels}
              onUpdatePromotion={(promo) => {
                setPromotions([...promotions.filter((p) => p.studentId !== promo.studentId), promo]);
                logAction('KENAIKAN_KELAS', 'UPDATE', 'Memperbarui status kenaikan kelas');
              }}
            />
          )}

          {activeTab === 'leger_rapor' && (
            <LegerReportView
              config={config}
              rombels={rombels}
              students={students}
              subjects={subjects}
              grades={grades}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView config={config} students={students} rombels={rombels} />
          )}

          {activeTab === 'documents' && (
            <DocumentsView config={config} students={students} />
          )}

          {activeTab === 'monitoring' && (
            <MonitoringView rombels={rombels} />
          )}

          {activeTab === 'calendar' && (
            <CalendarView events={calendar} />
          )}

          {activeTab === 'announcements' && (
            <AnnouncementsView announcements={announcements} />
          )}

          {activeTab === 'documentation' && (
            <DocumentationView />
          )}

          {activeTab === 'audit_logs' && (
            <AuditLogView auditLogs={auditLogs} />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              config={config}
              onUpdateConfig={(newConfig) => {
                setConfig(newConfig);
                logAction('PENGATURAN', 'UPDATE', 'Memperbarui konfigurasi sekolah');
              }}
              onResetDemoData={handleResetDemoData}
            />
          )}
        </main>
      </div>

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        announcements={announcements}
      />
    </div>
  );
}
