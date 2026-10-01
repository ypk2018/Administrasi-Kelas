export type UserRole = 
  | 'super_admin'
  | 'kepala_sekolah'
  | 'operator'
  | 'waka'
  | 'wali_kelas'
  | 'guru_mapel'
  | 'bk'
  | 'siswa'
  | 'ortu';

export interface UserAccount {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  email: string;
  classId?: string; // For wali_kelas
  nis?: string; // For siswa
  parentId?: string; // For ortu
}

export interface SchoolConfig {
  name: string;
  npsn: string;
  address: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  postalCode: string;
  email: string;
  phone: string;
  website: string;
  headmasterName: string;
  headmasterNip: string;
  logoUrl: string;
  currentAcademicYear: string;
  currentSemester: 'Ganjil' | 'Genap';
  signatureCity: string;
}

export interface Student {
  id: string;
  nis: string;
  nisn: string;
  fullName: string;
  nickname: string;
  gender: 'L' | 'P';
  birthPlace: string;
  birthDate: string;
  nik: string;
  kkNumber: string;
  religion: string;
  address: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  phone: string;
  email: string;
  childNumber: number;
  siblingCount: number;
  familyStatus: string;
  livingWith: string;
  distanceToSchool: string;
  transportation: string;
  specialNeeds?: string;
  status: 'Aktif' | 'Mutasi Keluar' | 'Lulus' | 'Keluar';
  classId: string;
  photoUrl?: string;
  father: {
    name: string;
    nik: string;
    education: string;
    occupation: string;
    income: string;
    phone: string;
  };
  mother: {
    name: string;
    nik: string;
    education: string;
    occupation: string;
    income: string;
    phone: string;
  };
  guardian?: {
    name: string;
    relation: string;
    nik: string;
    education: string;
    occupation: string;
    phone: string;
    address: string;
  };
}

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  gender: 'L' | 'P';
  phone: string;
  email: string;
  subject: string;
  status: 'PNS' | 'PPPK' | 'Honorer';
}

export interface Rombel {
  id: string;
  name: string; // e.g. "VII-A"
  gradeLevel: '7' | '8' | '9';
  academicYear: string;
  semester: 'Ganjil' | 'Genap';
  teacherId: string; // Wali kelas
  leaderId?: string; // Ketua kelas
  viceLeaderId?: string;
  secretaryId?: string;
  treasurerId?: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: 'H' | 'S' | 'I' | 'A';
  note?: string;
}

export interface GradeRecord {
  id: string;
  studentId: string;
  classId: string;
  subjectId: string;
  semester: 'Ganjil' | 'Genap';
  academicYear: string;
  knowledgeScore: number;
  skillScore: number;
  description: string;
  status: 'Lengkap' | 'Belum Lengkap' | 'Perlu Perbaikan' | 'Terkunci';
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  category: 'Kelompok A (Umum)' | 'Kelompok B (Muatan Lokal/Keterampilan)';
  kkm: number;
}

export interface Assessment {
  id: string;
  title: string;
  subjectId: string;
  classId: string;
  type: 'Formatif' | 'Sumatif';
  scope: string;
  date: string;
  maxScore: number;
}

export interface Extracurricular {
  id: string;
  name: string;
  coach: string;
  schedule: string;
  description: string;
}

export interface ExtracurricularMember {
  id: string;
  extracurricularId: string;
  studentId: string;
  predicate: 'A' | 'B' | 'C' | 'K';
  description: string;
}

export interface Achievement {
  id: string;
  studentId: string;
  title: string;
  category: string;
  level: 'Sekolah' | 'Kecamatan' | 'Kabupaten' | 'Provinsi' | 'Nasional' | 'Internasional';
  organizer: string;
  date: string;
  rank: string;
  note?: string;
}

export interface Violation {
  id: string;
  studentId: string;
  date: string;
  violationType: string;
  category: 'Ringan' | 'Sedang' | 'Berat';
  chronology: string;
  actionTaken: string;
  handler: string;
  parentContacted: boolean;
  followUp: string;
  status: 'Proses' | 'Selesai' | 'Dalam Pemantauan';
}

export interface WaliNote {
  id: string;
  studentId: string;
  date: string;
  category: 'Akademik' | 'Kehadiran' | 'Sikap/Perilaku' | 'Sosial' | 'Kedisiplinan' | 'Minat & Bakat' | 'Kesehatan' | 'Lainnya';
  note: string;
  action: string;
  status: 'Aktif' | 'Selesai';
}

export interface ParentCommunication {
  id: string;
  studentId: string;
  date: string;
  parentName: string;
  media: 'Tatap Muka' | 'Telepon' | 'WhatsApp' | 'Surat' | 'Pertemuan Sekolah' | 'Lainnya';
  topic: string;
  summary: string;
  followUp: string;
  status: 'Selesai' | 'Berlanjut';
}

export interface CounselingRecord {
  id: string;
  studentId: string;
  date: string;
  purpose: string;
  notes: string;
  result: string;
  followUp: string;
  handler: string;
}

export interface MutasiRecord {
  id: string;
  studentId: string;
  date: string;
  type: 'Masuk' | 'Keluar' | 'Pindah Kelas' | 'Naik Kelas' | 'Lulus';
  originOrDestination: string;
  reason: string;
  note: string;
}

export interface PromotionRecord {
  id: string;
  studentId: string;
  classId: string;
  academicYear: string;
  status: 'Diproses' | 'Menunggu Verifikasi' | 'Disetujui' | 'Tidak Disetujui' | 'Perlu Rapat';
  recommendation: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  targetRole: UserRole | 'all';
  author: string;
  active: boolean;
}

export interface AcademicCalendarEvent {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  category: 'Libur' | 'Asesmen' | 'Kegiatan Sekolah' | 'Rapat' | 'Penerimaan Rapor';
  description: string;
}

export interface AuditLog {
  id: string;
  username: string;
  role: string;
  timestamp: string;
  module: string;
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'IMPORT' | 'EXPORT' | 'PRINT';
  details: string;
  ipAddress?: string;
}
