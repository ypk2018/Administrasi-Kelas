import React, { useState } from 'react';
import { Student, AttendanceRecord, GradeRecord, ExtracurricularMember, Achievement, Violation, WaliNote, ParentCommunication, CounselingRecord, MutasiRecord } from '../types';
import { X, User, Users, CalendarCheck, BookOpen, Award, AlertTriangle, FileText, MessageSquare, ArrowLeftRight, HeartHandshake } from 'lucide-react';

interface StudentProfileModalProps {
  student: Student | null;
  onClose: () => void;
  attendance: AttendanceRecord[];
  grades: GradeRecord[];
  extracurricularMembers: ExtracurricularMember[];
  achievements: Achievement[];
  violations: Violation[];
  waliNotes: WaliNote[];
  parentComms: ParentCommunication[];
  counselings: CounselingRecord[];
  mutations: MutasiRecord[];
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  onClose,
  attendance,
  grades,
  extracurricularMembers,
  achievements,
  violations,
  waliNotes,
  parentComms,
  counselings,
  mutations
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'parents' | 'attendance' | 'grades' | 'extracurricular' | 'achievements' | 'violations' | 'notes' | 'counseling' | 'mutation'>('profile');

  if (!student) return null;

  const studentAttendance = attendance.filter((a) => a.studentId === student.id);
  const studentGrades = grades.filter((g) => g.studentId === student.id);
  const studentEkskul = extracurricularMembers.filter((e) => e.studentId === student.id);
  const studentAchievements = achievements.filter((a) => a.studentId === student.id);
  const studentViolations = violations.filter((v) => v.studentId === student.id);
  const studentNotes = waliNotes.filter((n) => n.studentId === student.id);
  const studentComms = parentComms.filter((c) => c.studentId === student.id);
  const studentCounselings = counselings.filter((co) => co.studentId === student.id);
  const studentMutations = mutations.filter((m) => m.studentId === student.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-emerald-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              {student.fullName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold">{student.fullName}</h2>
              <p className="text-xs text-emerald-200">NIS: {student.nis} · NISN: {student.nisn} · Kelas: {student.classId}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto px-4 py-2 gap-1 shrink-0">
          {[
            { id: 'profile', label: 'Profil', icon: User },
            { id: 'parents', label: 'Orang Tua', icon: Users },
            { id: 'attendance', label: 'Kehadiran', icon: CalendarCheck },
            { id: 'grades', label: 'Nilai', icon: BookOpen },
            { id: 'extracurricular', label: 'Ekskul', icon: Award },
            { id: 'achievements', label: 'Prestasi', icon: Award },
            { id: 'violations', label: 'Pelanggaran', icon: AlertTriangle },
            { id: 'notes', label: 'Catatan Wali', icon: FileText },
            { id: 'counseling', label: 'Konseling BK', icon: HeartHandshake },
            { id: 'mutation', label: 'Mutasi & Riwayat', icon: ArrowLeftRight },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive ? 'bg-emerald-800 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 border-b pb-2">Identitas Peserta Didik</h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-slate-500">Nama Lengkap</span>
                  <span className="font-medium text-slate-900">{student.fullName}</span>
                  <span className="text-slate-500">Nama Panggilan</span>
                  <span className="font-medium text-slate-900">{student.nickname}</span>
                  <span className="text-slate-500">Jenis Kelamin</span>
                  <span className="font-medium text-slate-900">{student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
                  <span className="text-slate-500">Tempat, Tanggal Lahir</span>
                  <span className="font-medium text-slate-900">{student.birthPlace}, {student.birthDate}</span>
                  <span className="text-slate-500">NIK / No. KK</span>
                  <span className="font-mono text-slate-900">{student.nik} / {student.kkNumber}</span>
                  <span className="text-slate-500">Agama</span>
                  <span className="font-medium text-slate-900">{student.religion}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-slate-900 border-b pb-2">Alamat & Domisili</h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-slate-500">Alamat Rumah</span>
                  <span className="font-medium text-slate-900">{student.address}</span>
                  <span className="text-slate-500">Kampung / Kelurahan</span>
                  <span className="font-medium text-slate-900">{student.village}</span>
                  <span className="text-slate-500">Distrik / Kabupaten</span>
                  <span className="font-medium text-slate-900">{student.district}, {student.regency}</span>
                  <span className="text-slate-500">Nomor HP / Email</span>
                  <span className="font-medium text-slate-900">{student.phone} / {student.email}</span>
                  <span className="text-slate-500">Moda Transportasi</span>
                  <span className="font-medium text-slate-900">{student.transportation}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Data Ayah Kandung</h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-slate-500">Nama Ayah</span>
                  <span className="font-medium text-slate-900">{student.father.name}</span>
                  <span className="text-slate-500">NIK Ayah</span>
                  <span className="font-mono text-slate-900">{student.father.nik}</span>
                  <span className="text-slate-500">Pendidikan</span>
                  <span className="font-medium text-slate-900">{student.father.education}</span>
                  <span className="text-slate-500">Pekerjaan</span>
                  <span className="font-medium text-slate-900">{student.father.occupation}</span>
                  <span className="text-slate-500">Penghasilan</span>
                  <span className="font-medium text-slate-900">{student.father.income}</span>
                  <span className="text-slate-500">Nomor HP</span>
                  <span className="font-medium text-slate-900">{student.father.phone}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <h3 className="font-bold text-slate-900 text-sm">Data Ibu Kandung</h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-slate-500">Nama Ibu</span>
                  <span className="font-medium text-slate-900">{student.mother.name}</span>
                  <span className="text-slate-500">NIK Ibu</span>
                  <span className="font-mono text-slate-900">{student.mother.nik}</span>
                  <span className="text-slate-500">Pendidikan</span>
                  <span className="font-medium text-slate-900">{student.mother.education}</span>
                  <span className="text-slate-500">Pekerjaan</span>
                  <span className="font-medium text-slate-900">{student.mother.occupation}</span>
                  <span className="text-slate-500">Penghasilan</span>
                  <span className="font-medium text-slate-900">{student.mother.income}</span>
                  <span className="text-slate-500">Nomor HP</span>
                  <span className="font-medium text-slate-900">{student.mother.phone}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Rekapitulasi Kehadiran Siswa</h3>
              {studentAttendance.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Belum ada catatan kehadiran tercatat untuk siswa ini.</p>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                      <tr>
                        <th className="p-3">Tanggal</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Keterangan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentAttendance.map((a) => (
                        <tr key={a.id}>
                          <td className="p-3">{a.date}</td>
                          <td className="p-3 font-bold">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              a.status === 'H' ? 'bg-emerald-100 text-emerald-800' :
                              a.status === 'S' ? 'bg-amber-100 text-amber-800' :
                              a.status === 'I' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {a.status === 'H' ? 'Hadir' : a.status === 'S' ? 'Sakit' : a.status === 'I' ? 'Izin' : 'Tanpa Keterangan'}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600">{a.note || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Capaian Nilai Akademik</h3>
              {studentGrades.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Belum ada nilai yang diinput oleh guru mata pelajaran.</p>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                      <tr>
                        <th className="p-3">Mata Pelajaran</th>
                        <th className="p-3">Pengetahuan</th>
                        <th className="p-3">Keterampilan</th>
                        <th className="p-3">Deskripsi Capaian</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {studentGrades.map((g) => (
                        <tr key={g.id}>
                          <td className="p-3 font-bold">{g.subjectId}</td>
                          <td className="p-3 font-mono-tabular font-bold text-emerald-800">{g.knowledgeScore}</td>
                          <td className="p-3 font-mono-tabular font-bold text-emerald-800">{g.skillScore}</td>
                          <td className="p-3 text-slate-600">{g.description}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-bold text-[10px]">
                              {g.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'extracurricular' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Keikutsertaan Ekstrakurikuler</h3>
              {studentEkskul.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Belum terdaftar dalam ekstrakurikuler.</p>
              ) : (
                <div className="space-y-2">
                  {studentEkskul.map((e) => (
                    <div key={e.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>Ekstrakurikuler ID: {e.extracurricularId}</span>
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded">Predikat: {e.predicate}</span>
                      </div>
                      <p className="text-xs text-slate-600">{e.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Prestasi Peserta Didik</h3>
              {studentAchievements.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Belum ada catatan prestasi.</p>
              ) : (
                <div className="space-y-2">
                  {studentAchievements.map((a) => (
                    <div key={a.id} className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm">{a.title}</h4>
                      <p className="text-xs text-slate-600">Tingkat: <strong className="text-slate-800">{a.level}</strong> · Penyelenggara: {a.organizer} · Tanggal: {a.date}</p>
                      {a.note && <p className="text-xs text-slate-500 italic">Catatan: {a.note}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'violations' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Catatan Pelanggaran & Pembinaan</h3>
              {studentViolations.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Tidak ada catatan pelanggaran (Siswa disiplin).</p>
              ) : (
                <div className="space-y-2">
                  {studentViolations.map((v) => (
                    <div key={v.id} className="p-4 bg-red-50/50 border border-red-200 rounded-xl space-y-2">
                      <div className="flex justify-between font-bold text-slate-900 text-xs">
                        <span>{v.violationType}</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-[10px]">{v.category}</span>
                      </div>
                      <p className="text-xs text-slate-600">Kronologi: {v.chronology}</p>
                      <p className="text-xs text-slate-600">Tindakan: {v.actionTaken} (Ditangani oleh: {v.handler})</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Catatan Perkembangan Wali Kelas</h3>
              {studentNotes.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Belum ada catatan wali kelas.</p>
              ) : (
                <div className="space-y-2">
                  {studentNotes.map((n) => (
                    <div key={n.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-900">
                        <span>Kategori: {n.category}</span>
                        <span className="text-slate-400">{n.date}</span>
                      </div>
                      <p className="text-xs text-slate-700">{n.note}</p>
                      <p className="text-xs text-emerald-800 font-medium">Tindak Lanjut: {n.action}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'counseling' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Bimbingan Konseling (BK)</h3>
              {studentCounselings.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Tidak ada catatan konseling khusus.</p>
              ) : (
                <div className="space-y-2">
                  {studentCounselings.map((c) => (
                    <div key={c.id} className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-1">
                      <h4 className="font-bold text-slate-900 text-xs">{c.purpose}</h4>
                      <p className="text-xs text-slate-600">{c.notes}</p>
                      <p className="text-xs text-blue-900 font-medium">Hasil: {c.result}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'mutation' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Riwayat Mutasi & Status</h3>
              {studentMutations.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">Siswa berstatus aktif murni sejak masuk sekolah.</p>
              ) : (
                <div className="space-y-2">
                  {studentMutations.map((m) => (
                    <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <div className="font-bold text-xs text-slate-900">Jenis: {m.type} ({m.date})</div>
                      <p className="text-xs text-slate-600">Alasan: {m.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Tutup Profil
          </button>
        </div>
      </div>
    </div>
  );
};
