import {
  SchoolConfig,
  UserAccount,
  Teacher,
  Student,
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
} from '../types';

export const initialSchoolConfig: SchoolConfig = {
  name: 'SMP NEGERI 7 SENTANI',
  npsn: '60300452',
  address: 'Jl. Raya Sentani No. 7, Dobonsolo',
  village: 'Dobonsolo',
  district: 'Sentani',
  regency: 'Kabupaten Jayapura',
  province: 'Papua',
  postalCode: '99352',
  email: 'smpn7sentani@smp.belajar.id',
  phone: '(0967) 591234',
  website: 'https://smpn7sentani.sch.id',
  headmasterName: 'Maikel Paul Wally, S.Pd.',
  headmasterNip: '197812232003121006',
  logoUrl: 'Lambang_Kabupaten_Jayapura-removebg-preview.png',
  rightLogoUrl: 'Logo_SMP_N_7_Terbaru-removebg-preview.png',
  currentAcademicYear: '2026/2027',
  currentSemester: 'Ganjil',
  signatureCity: 'Sentani'
};

export const initialUsers: UserAccount[] = [
  { id: 'u1', username: 'superadmin', name: 'Super Administrator', role: 'super_admin', email: 'admin@smpn7sentani.sch.id' },
  { id: 'u2', username: 'kepsek', name: 'Maikel Paul Wally, S.Pd.', role: 'kepala_sekolah', email: 'maikel.wally@smp.belajar.id' },
  { id: 'u3', username: 'operator', name: 'Yulianus Keiya, S.Kom', role: 'operator', email: 'operator@smpn7sentani.sch.id' },
  { id: 'u4', username: 'waka', name: 'Dra. Maria Kogoya', role: 'waka', email: 'maria.kogoya@smp.belajar.id' },
  { id: 'u5', username: 'walikelas7a', name: 'Sartika Wandikbo, S.Pd.', role: 'wali_kelas', classId: 'r1', email: 'sartika@smp.belajar.id' },
  { id: 'u6', username: 'walikelas7b', name: 'Yohanis Suebu, S.Pd.', role: 'wali_kelas', classId: 'r2', email: 'yohanis@smp.belajar.id' },
  { id: 'u7', username: 'gurumapel', name: 'Petrus Tabuni, S.Pd.', role: 'guru_mapel', email: 'petrus@smp.belajar.id' },
  { id: 'u8', username: 'bk', name: 'Debora Felle, S.Psi.', role: 'bk', email: 'debora@smp.belajar.id' },
  { id: 'u9', username: 'siswa1', name: 'Elias Wally', role: 'siswa', nis: '1001', email: 'elias1001@siswa.smp.belajar.id' },
  { id: 'u10', username: 'ortu1', name: 'Bpk. Markus Wally (Orang Tua)', role: 'ortu', parentId: 'p1', email: 'markus.wally@gmail.com' }
];

export const initialTeachers: Teacher[] = [
  { id: 't1', nip: '197812232003121006', name: 'Maikel Paul Wally, S.Pd.', gender: 'L', phone: '081248111222', email: 'maikel.wally@smp.belajar.id', subject: 'Pendidikan Agama Kristen', status: 'PNS' },
  { id: 't2', nip: '198205142008012001', name: 'Sartika Wandikbo, S.Pd.', gender: 'P', phone: '081344556677', email: 'sartika@smp.belajar.id', subject: 'Matematika', status: 'PNS' },
  { id: 't3', nip: '198509202010011002', name: 'Yohanis Suebu, S.Pd.', gender: 'L', phone: '081199887766', email: 'yohanis@smp.belajar.id', subject: 'Bahasa Indonesia', status: 'PPPK' },
  { id: 't4', nip: '199003152015032004', name: 'Dra. Maria Kogoya', gender: 'P', phone: '082188776655', email: 'maria.kogoya@smp.belajar.id', subject: 'Ilmu Pengetahuan Alam (IPA)', status: 'PNS' },
  { id: 't5', nip: '199207112019031003', name: 'Petrus Tabuni, S.Pd.', gender: 'L', phone: '085244332211', email: 'petrus@smp.belajar.id', subject: 'Ilmu Pengetahuan Sosial (IPS)', status: 'PPPK' }
];

export const initialRombels: Rombel[] = [
  { id: 'r1', name: 'VII-A', gradeLevel: '7', academicYear: '2026/2027', semester: 'Ganjil', teacherId: 't2', leaderId: 's1', viceLeaderId: 's2', secretaryId: 's3', treasurerId: 's4' },
  { id: 'r2', name: 'VII-B', gradeLevel: '7', academicYear: '2026/2027', semester: 'Ganjil', teacherId: 't3', leaderId: 's5', viceLeaderId: 's6', secretaryId: 's7', treasurerId: 's8' },
  { id: 'r3', name: 'VIII-A', gradeLevel: '8', academicYear: '2026/2027', semester: 'Ganjil', teacherId: 't4' },
  { id: 'r4', name: 'IX-A', gradeLevel: '9', academicYear: '2026/2027', semester: 'Ganjil', teacherId: 't5' }
];

export const initialSubjects: Subject[] = [
  { id: 'sub1', code: 'PAV', name: 'Pendidikan Agama dan Budi Pekerti', category: 'Kelompok A (Umum)', kkm: 75 },
  { id: 'sub2', code: 'PBN', name: 'Pendidikan Pancasila dan Kewarganegaraan', category: 'Kelompok A (Umum)', kkm: 75 },
  { id: 'sub3', code: 'BIN', name: 'Bahasa Indonesia', category: 'Kelompok A (Umum)', kkm: 75 },
  { id: 'sub4', code: 'MAT', name: 'Matematika', category: 'Kelompok A (Umum)', kkm: 70 },
  { id: 'sub5', code: 'IPA', name: 'Ilmu Pengetahuan Alam (IPA)', category: 'Kelompok A (Umum)', kkm: 70 },
  { id: 'sub6', code: 'IPS', name: 'Ilmu Pengetahuan Sosial (IPS)', category: 'Kelompok A (Umum)', kkm: 70 },
  { id: 'sub7', code: 'BIG', name: 'Bahasa Inggris', category: 'Kelompok A (Umum)', kkm: 70 },
  { id: 'sub8', code: 'SBY', name: 'Seni Budaya', category: 'Kelompok B (Muatan Lokal/Keterampilan)', kkm: 75 },
  { id: 'sub9', code: 'ORJ', name: 'Pendidikan Jasmani, Olahraga, dan Kesehatan', category: 'Kelompok B (Muatan Lokal/Keterampilan)', kkm: 75 },
  { id: 'sub10', code: 'MLK', name: 'Muatan Lokal Bahasa Daerah (Sentani)', category: 'Kelompok B (Muatan Lokal/Keterampilan)', kkm: 75 }
];

export const initialStudents: Student[] = [
  {
    id: 's1',
    nis: '1001',
    nisn: '3124567890',
    fullName: 'Elias Wally',
    nickname: 'Elias',
    gender: 'L',
    birthPlace: 'Sentani',
    birthDate: '2013-05-12',
    nik: '9403125205130001',
    kkNumber: '9403120102140002',
    religion: 'Kristen Protestan',
    address: 'Jl. Yabaso No. 15, Dobonsolo',
    village: 'Dobonsolo',
    district: 'Sentani',
    regency: 'Kabupaten Jayapura',
    province: 'Papua',
    phone: '081248999888',
    email: 'elias1001@siswa.smp.belajar.id',
    childNumber: 1,
    siblingCount: 2,
    familyStatus: 'Anak Kandung',
    livingWith: 'Orang Tua',
    distanceToSchool: '2 km',
    transportation: 'Jalan Kaki',
    status: 'Aktif',
    classId: 'r1',
    father: { name: 'Markus Wally', nik: '9403121203800001', education: 'SMA/Sederajat', occupation: 'Petani/Pekebun', income: 'Rp 1.500.000 - 3.000.000', phone: '081248111333' },
    mother: { name: 'Martha Demena', nik: '9403125008850002', education: 'SMP/Sederajat', occupation: 'Ibu Rumah Tangga', income: '< Rp 1.000.000', phone: '081248222444' }
  },
  {
    id: 's2',
    nis: '1002',
    nisn: '3124567891',
    fullName: 'Ruth Felle',
    nickname: 'Ruth',
    gender: 'P',
    birthPlace: 'Jayapura',
    birthDate: '2013-08-20',
    nik: '9403126008130005',
    kkNumber: '9403120102140008',
    religion: 'Kristen Protestan',
    address: 'Kampung Ifar Besar',
    village: 'Ifar Besar',
    district: 'Sentani',
    regency: 'Kabupaten Jayapura',
    province: 'Papua',
    phone: '081344777666',
    email: 'ruth1002@siswa.smp.belajar.id',
    childNumber: 2,
    siblingCount: 1,
    familyStatus: 'Anak Kandung',
    livingWith: 'Orang Tua',
    distanceToSchool: '4 km',
    transportation: 'Angkutan Umum',
    status: 'Aktif',
    classId: 'r1',
    father: { name: 'Yafet Felle', nik: '9403121004750003', education: 'D3/S1', occupation: 'Pegawai Negeri Sipil', income: 'Rp 3.000.000 - 5.000.000', phone: '081344555666' },
    mother: { name: 'Susana Suebu', nik: '9403124509790001', education: 'SMA/Sederajat', occupation: 'Wiraswasta', income: 'Rp 1.500.000 - 3.000.000', phone: '081344666777' }
  },
  {
    id: 's3',
    nis: '1003',
    nisn: '3124567892',
    fullName: 'Daniel Suebu',
    nickname: 'Dani',
    gender: 'L',
    birthPlace: 'Sentani',
    birthDate: '2013-02-14',
    nik: '9403121402130009',
    kkNumber: '9403120102140015',
    religion: 'Kristen Protestan',
    address: 'Bambar Sentani',
    village: 'Bambar',
    district: 'Sentani',
    regency: 'Kabupaten Jayapura',
    province: 'Papua',
    phone: '082188333222',
    email: 'daniel1003@siswa.smp.belajar.id',
    childNumber: 1,
    siblingCount: 3,
    familyStatus: 'Anak Kandung',
    livingWith: 'Orang Tua',
    distanceToSchool: '5 km',
    transportation: 'Sepeda Motor',
    status: 'Aktif',
    classId: 'r1',
    father: { name: 'Lukas Suebu', nik: '9403120201720004', education: 'SMA/Sederajat', occupation: 'Nelayan/Pencari Ikan Danau', income: 'Rp 1.500.000 - 3.000.000', phone: '082188111222' },
    mother: { name: 'Maria Kogoya', nik: '9403124103780005', education: 'SD/Sederajat', occupation: 'Petani', income: '< Rp 1.000.000', phone: '082188222333' }
  },
  {
    id: 's4',
    nis: '1004',
    nisn: '3124567893',
    fullName: 'Priscilla Kogoya',
    nickname: 'Cilla',
    gender: 'P',
    birthPlace: 'Sentani',
    birthDate: '2013-11-05',
    nik: '9403124511130012',
    kkNumber: '9403120102140020',
    religion: 'Kristen Protestan',
    address: 'Hawai Sentani',
    village: 'Hinekombe',
    district: 'Sentani',
    regency: 'Kabupaten Jayapura',
    province: 'Papua',
    phone: '085244111000',
    email: 'priscilla1004@siswa.smp.belajar.id',
    childNumber: 2,
    siblingCount: 2,
    familyStatus: 'Anak Kandung',
    livingWith: 'Orang Tua',
    distanceToSchool: '1 km',
    transportation: 'Jalan Kaki',
    status: 'Aktif',
    classId: 'r1',
    father: { name: 'Piter Kogoya', nik: '9403121508700010', education: 'S1', occupation: 'Pegawai Swasta', income: 'Rp 3.000.000 - 5.000.000', phone: '085244999111' },
    mother: { name: 'Naomi Tapyor', nik: '9403125506740011', education: 'D3/S1', occupation: 'Guru Honorer', income: 'Rp 1.500.000 - 3.000.000', phone: '085244888222' }
  },
  {
    id: 's5',
    nis: '1005',
    nisn: '3124567894',
    fullName: 'Yosia Demena',
    nickname: 'Yosia',
    gender: 'L',
    birthPlace: 'Sentani',
    birthDate: '2013-03-30',
    nik: '9403123003130022',
    kkNumber: '9403120102140030',
    religion: 'Kristen Protestan',
    address: 'Ifale Sentani',
    village: 'Ifale',
    district: 'Sentani',
    regency: 'Kabupaten Jayapura',
    province: 'Papua',
    phone: '081344123456',
    email: 'yosia1005@siswa.smp.belajar.id',
    childNumber: 1,
    siblingCount: 1,
    familyStatus: 'Anak Kandung',
    livingWith: 'Orang Tua',
    distanceToSchool: '3 km',
    transportation: 'Angkutan Umum',
    status: 'Aktif',
    classId: 'r2',
    father: { name: 'Nathan Demena', nik: '9403121105760021', education: 'SMA/Sederajat', occupation: 'Wiraswasta', income: 'Rp 1.500.000 - 3.000.000', phone: '081344111222' },
    mother: { name: 'Yuliana Mehue', nik: '9403125102800022', education: 'SMA/Sederajat', occupation: 'Ibu Rumah Tangga', income: '< Rp 1.000.000', phone: '081344333444' }
  }
];

export const initialAttendance: AttendanceRecord[] = [
  { id: 'att1', studentId: 's1', classId: 'r1', date: '2026-10-01', status: 'H' },
  { id: 'att2', studentId: 's2', classId: 'r1', date: '2026-10-01', status: 'H' },
  { id: 'att3', studentId: 's3', classId: 'r1', date: '2026-10-01', status: 'S', note: 'Demam' },
  { id: 'att4', studentId: 's4', classId: 'r1', date: '2026-10-01', status: 'H' },
  { id: 'att5', studentId: 's5', classId: 'r2', date: '2026-10-01', status: 'I', note: 'Izin Keluarga' }
];

export const initialGrades: GradeRecord[] = [
  { id: 'g1', studentId: 's1', classId: 'r1', subjectId: 'sub3', semester: 'Ganjil', academicYear: '2026/2027', knowledgeScore: 82, skillScore: 85, description: 'Menunjukkan penguasaan yang baik dalam menyusun teks laporan hasil observasi.', status: 'Lengkap' },
  { id: 'g2', studentId: 's1', classId: 'r1', subjectId: 'sub4', semester: 'Ganjil', academicYear: '2026/2027', knowledgeScore: 78, skillScore: 80, description: 'Memahami konsep bilangan bulat dan pecahan dengan baik.', status: 'Lengkap' },
  { id: 'g3', studentId: 's2', classId: 'r1', subjectId: 'sub3', semester: 'Ganjil', academicYear: '2026/2027', knowledgeScore: 90, skillScore: 92, description: 'Sangat mahir dalam menganalisis unsur intrinsik cerita pendek.', status: 'Lengkap' },
  { id: 'g4', studentId: 's2', classId: 'r1', subjectId: 'sub4', semester: 'Ganjil', academicYear: '2026/2027', knowledgeScore: 88, skillScore: 85, description: 'Menguasai materi aljabar dengan sangat baik dan teliti.', status: 'Lengkap' }
];

export const initialExtracurriculars: Extracurricular[] = [
  { id: 'ex1', name: 'Pramuka Penggalang', coach: 'Yohanis Suebu, S.Pd.', schedule: 'Jumat, 15:00 WIT', description: 'Kepramukaan wajib dan pembentukan karakter disiplin.' },
  { id: 'ex2', name: 'Palang Merah Remaja (PMR)', coach: 'Dra. Maria Kogoya', schedule: 'Sabtu, 09:00 WIT', description: 'Pelatihan pertolongan pertama dan kesehatan remaja.' },
  { id: 'ex3', name: 'Klub Sepak Bola / Futsal SMPN 7', coach: 'Petrus Tabuni, S.Pd.', schedule: 'Rabu, 15:30 WIT', description: 'Pembinaan bakat olahraga sepak bola pelajar.' },
  { id: 'ex4', name: 'Seni Tari Tradisional Papua', coach: 'Sartika Wandikbo, S.Pd.', schedule: 'Kamis, 15:00 WIT', description: 'Melestarikan seni tari daerah Sentani dan Papua.' }
];

export const initialExtracurricularMembers: ExtracurricularMember[] = [
  { id: 'em1', extracurricularId: 'ex1', studentId: 's1', predicate: 'A', description: 'Aktif mengikuti latihan baris-berbaris dan keterampilan kepramukaan.' },
  { id: 'em2', extracurricularId: 'ex3', studentId: 's1', predicate: 'A', description: 'Menunjukkan kerjasama tim yang sangat baik sebagai penyerang.' },
  { id: 'em3', extracurricularId: 'ex2', studentId: 's2', predicate: 'A', description: 'Sangat cekatan dalam praktik pertolongan pertama.' }
];

export const initialAchievements: Achievement[] = [
  { id: 'ach1', studentId: 's1', title: 'Juara 1 Lomba Cerdas Cermat Tingkat Kabupaten Jayapura', category: 'Akademik', level: 'Kabupaten', organizer: 'MKKS SMP Kabupaten Jayapura', date: '2026-08-17', rank: 'Juara 1', note: 'Mewakili sekolah dalam rangka HUT RI ke-81.' },
  { id: 'ach2', studentId: 's2', title: 'Juara 2 Olimpiade Matematika SMP', category: 'Akademik', level: 'Kabupaten', organizer: 'Dinas Pendidikan Kabupaten Jayapura', date: '2026-05-20', rank: 'Juara 2', note: 'Prestasi gemilang di bidang sains.' }
];

export const initialViolations: Violation[] = [
  { id: 'vio1', studentId: 's3', date: '2026-09-15', violationType: 'Terlambat hadir di sekolah lebih dari 15 menit', category: 'Ringan', chronology: 'Datang pukul 07:25 WIT tanpa alasan darurat.', actionTaken: 'Peringatan lisan dan bimbingan kedisiplinan oleh wali kelas.', handler: 'Sartika Wandikbo, S.Pd.', parentContacted: true, followUp: 'Siswa berjanji tidak mengulangi keterlambatan.', status: 'Selesai' }
];

export const initialWaliNotes: WaliNote[] = [
  { id: 'wn1', studentId: 's1', date: '2026-09-20', category: 'Minat & Bakat', note: 'Menunjukkan bakat kepemimpinan yang menonjol dan aktif berdiskusi dalam kelompok.', action: 'Didorong untuk mengikuti pemilihan ketua kelas / OSIS.', status: 'Aktif' },
  { id: 'wn2', studentId: 's3', date: '2026-09-22', category: 'Kedisiplinan', note: 'Perlu peningkatan kedisiplinan waktu kedatangan ke sekolah.', action: 'Koordinasi dengan orang tua via WhatsApp.', status: 'Aktif' }
];

export const initialParentComms: ParentCommunication[] = [
  { id: 'pc1', studentId: 's3', date: '2026-09-23', parentName: 'Lukas Suebu (Ayah)', media: 'WhatsApp', topic: 'Keterlambatan siswa ke sekolah', summary: 'Menyampaikan informasi keterlambatan ananda Daniel dan berdiskusi mengenai transportasi.', followUp: 'Orang tua berkomitmen mengantar lebih pagi.', status: 'Selesai' }
];

export const initialAnnouncements: Announcement[] = [
  { id: 'ann1', title: 'Persiapan Penilaian Tengah Semester (PTS) Ganjil 2026/2027', content: 'Diberitahukan kepada seluruh Guru dan Siswa SMP Negeri 7 Sentani bahwa PTS Ganjil akan dilaksanakan mulai tanggal 12 Oktober 2026. Harap mempersiapkan diri dengan baik.', date: '2026-10-01', targetRole: 'all', author: 'Kepala Sekolah (Maikel Paul Wally, S.Pd.)', active: true },
  { id: 'ann2', title: 'Rapat Koordinasi Wali Kelas dan BK', content: 'Diundang kepada seluruh Wali Kelas VII, VIII, dan IX untuk menghadiri rapat evaluasi kehadiran dan perkembangan siswa pada hari Jumat pukul 13:00 WIT di Ruang Guru.', date: '2026-09-30', targetRole: 'wali_kelas', author: 'Wakasis', active: true }
];

export const initialCalendar: AcademicCalendarEvent[] = [
  { id: 'cal1', title: 'Awal Tahun Pelajaran 2026/2027', startDate: '2026-07-13', endDate: '2026-07-13', category: 'Kegiatan Sekolah', description: 'Hari pertama masuk sekolah tahun ajaran baru.' },
  { id: 'cal2', title: 'Upacara HUT RI ke-81', startDate: '2026-08-17', endDate: '2026-08-17', category: 'Kegiatan Sekolah', description: 'Upacara bendera di lapangan SMPN 7 Sentani.' },
  { id: 'cal3', title: 'Penilaian Tengah Semester (PTS) Ganjil', startDate: '2026-10-12', endDate: '2026-10-17', category: 'Asesmen', description: 'Pelaksanaan PTS Ganjil berbasis digital dan tertulis.' },
  { id: 'cal4', title: 'Libur Natal dan Tahun Baru 2027', startDate: '2026-12-21', endDate: '2027-01-02', category: 'Libur', description: 'Libur semester ganjil.' }
];

export const initialAuditLogs: AuditLog[] = [
  { id: 'al1', username: 'superadmin', role: 'super_admin', timestamp: '2026-10-01 08:00:00', module: 'SISTEM', action: 'LOGIN', details: 'Berhasil login ke sistem aplikasi.' },
  { id: 'al2', username: 'walikelas7a', role: 'wali_kelas', timestamp: '2026-10-01 08:30:15', module: 'KEHADIRAN', action: 'CREATE', details: 'Memasukkan data kehadiran harian kelas VII-A.' }
];
