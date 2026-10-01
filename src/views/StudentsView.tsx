import React, { useState } from 'react';
import { Student, Rombel } from '../types';
import { StudentProfileModal } from './StudentProfileModal';
import { Search, Plus, Eye, Edit, Trash2, Users, FileSpreadsheet } from 'lucide-react';

interface StudentsViewProps {
  students: Student[];
  rombels: Rombel[];
  onAddStudent: (student: Student) => void;
  onUpdateStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  attendance: any[];
  grades: any[];
  extracurricularMembers: any[];
  achievements: any[];
  violations: any[];
  waliNotes: any[];
  parentComms: any[];
  counselings: any[];
  mutations: any[];
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  rombels,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassFilter, setSelectedClassFilter] = useState('all');
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Student>>({
    nis: '',
    nisn: '',
    fullName: '',
    nickname: '',
    gender: 'L',
    birthPlace: 'Sentani',
    birthDate: '2013-01-01',
    nik: '',
    kkNumber: '',
    religion: 'Kristen Protestan',
    address: '',
    village: 'Dobonsolo',
    district: 'Sentani',
    regency: 'Kabupaten Jayapura',
    province: 'Papua',
    phone: '',
    email: '',
    childNumber: 1,
    siblingCount: 1,
    status: 'Aktif',
    classId: 'r1',
    father: { name: '', nik: '', education: 'SMA', occupation: 'Wiraswasta', income: '1-3 Juta', phone: '' },
    mother: { name: '', nik: '', education: 'SMA', occupation: 'Ibu Rumah Tangga', income: '< 1 Juta', phone: '' }
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.nis.includes(searchTerm) ||
      s.nisn.includes(searchTerm);
    const matchesClass = selectedClassFilter === 'all' || s.classId === selectedClassFilter;
    return matchesSearch && matchesClass;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.nis) {
      alert('Nama lengkap dan NIS wajib diisi.');
      return;
    }

    if (editingStudent) {
      onUpdateStudent({ ...editingStudent, ...formData } as Student);
      setEditingStudent(null);
    } else {
      const newStudent: Student = {
        id: 's_' + Date.now(),
        nis: formData.nis || '',
        nisn: formData.nisn || '',
        fullName: formData.fullName || '',
        nickname: formData.nickname || '',
        gender: formData.gender as 'L' | 'P',
        birthPlace: formData.birthPlace || '',
        birthDate: formData.birthDate || '',
        nik: formData.nik || '',
        kkNumber: formData.kkNumber || '',
        religion: formData.religion || '',
        address: formData.address || '',
        village: formData.village || '',
        district: formData.district || '',
        regency: formData.regency || '',
        province: formData.province || '',
        phone: formData.phone || '',
        email: formData.email || '',
        childNumber: Number(formData.childNumber) || 1,
        siblingCount: Number(formData.siblingCount) || 0,
        familyStatus: 'Anak Kandung',
        livingWith: 'Orang Tua',
        distanceToSchool: '2 km',
        transportation: 'Jalan Kaki',
        status: formData.status as any || 'Aktif',
        classId: formData.classId || 'r1',
        father: formData.father || { name: '', nik: '', education: '', occupation: '', income: '', phone: '' },
        mother: formData.mother || { name: '', nik: '', education: '', occupation: '', income: '', phone: '' }
      };
      onAddStudent(newStudent);
    }

    setShowAddModal(false);
    setFormData({
      nis: '',
      nisn: '',
      fullName: '',
      nickname: '',
      gender: 'L',
      birthPlace: 'Sentani',
      birthDate: '2013-01-01',
      nik: '',
      kkNumber: '',
      religion: 'Kristen Protestan',
      address: '',
      village: 'Dobonsolo',
      district: 'Sentani',
      regency: 'Kabupaten Jayapura',
      province: 'Papua',
      phone: '',
      email: '',
      childNumber: 1,
      siblingCount: 1,
      status: 'Aktif',
      classId: 'r1',
      father: { name: '', nik: '', education: 'SMA', occupation: 'Wiraswasta', income: '1-3 Juta', phone: '' },
      mother: { name: '', nik: '', education: 'SMA', occupation: 'Ibu Rumah Tangga', income: '< 1 Juta', phone: '' }
    });
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData(student);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Data Peserta Didik</h2>
          <p className="text-xs text-slate-500">Kelola data master siswa SMP Negeri 7 Sentani, Kabupaten Jayapura, Papua.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingStudent(null);
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Siswa</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, NIS, atau NISN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-700"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:border-emerald-700"
          >
            <option value="all">Semua Kelas / Rombel</option>
            {rombels.map((r) => (
              <option key={r.id} value={r.id}>Kelas {r.name}</option>
            ))}
          </select>
          <span className="text-xs text-slate-500 whitespace-nowrap">Total: {filteredStudents.length} siswa</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">NIS / NISN</th>
                <th className="p-4">Nama Lengkap</th>
                <th className="p-4">L/P</th>
                <th className="p-4">Kelas</th>
                <th className="p-4">Tempat, Tanggal Lahir</th>
                <th className="p-4">Orang Tua (Ayah/Ibu)</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Tidak ada data peserta didik yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s, index) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono text-slate-500">{index + 1}</td>
                    <td className="p-4 font-mono font-medium text-slate-900">
                      {s.nis}
                      <span className="block text-[10px] text-slate-400">{s.nisn}</span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">{s.fullName}</td>
                    <td className="p-4 font-medium">{s.gender}</td>
                    <td className="p-4 font-medium text-emerald-800">{s.classId}</td>
                    <td className="p-4 text-slate-600">{s.birthPlace}, {s.birthDate}</td>
                    <td className="p-4 text-slate-600">
                      <div>{s.father.name || '-'}</div>
                      <div className="text-[10px] text-slate-400">HP: {s.father.phone || '-'}</div>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedStudentForProfile(s)}
                        className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 rounded-lg transition-colors inline-flex items-center"
                        title="Lihat Profil Lengkap (Tab)"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(s)}
                        className="p-1.5 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 rounded-lg transition-colors inline-flex items-center"
                        title="Edit Siswa"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Hapus data peserta didik ${s.fullName}?`)) {
                            onDeleteStudent(s.id);
                          }
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-red-100 text-slate-700 hover:text-red-800 rounded-lg transition-colors inline-flex items-center"
                        title="Hapus Siswa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Profile Tabbed Modal */}
      {selectedStudentForProfile && (
        <StudentProfileModal
          student={selectedStudentForProfile}
          onClose={() => setSelectedStudentForProfile(null)}
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

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                {editingStudent ? 'Edit Data Peserta Didik' : 'Tambah Peserta Didik Baru'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nomor Induk Siswa (NIS) *</label>
                  <input
                    type="text"
                    required
                    value={formData.nis || ''}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NISN *</label>
                  <input
                    type="text"
                    required
                    value={formData.nisn || ''}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName || ''}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={formData.nickname || ''}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.gender || 'L'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.birthPlace || ''}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.birthDate || ''}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas / Rombel</label>
                  <select
                    value={formData.classId || 'r1'}
                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700 font-medium"
                  >
                    {rombels.map((r) => (
                      <option key={r.id} value={r.id}>Kelas {r.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Ayah Kandung</label>
                  <input
                    type="text"
                    value={formData.father?.name || ''}
                    onChange={(e) => setFormData({ ...formData, father: { ...formData.father!, name: e.target.value } })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold shadow-xs"
                >
                  Simpan Data Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
