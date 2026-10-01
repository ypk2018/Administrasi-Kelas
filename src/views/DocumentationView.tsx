import React from 'react';
import { BookMarked, CheckCircle2 } from 'lucide-react';

export const DocumentationView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Panduan & Tutorial Lengkap</h2>
        <p className="text-xs text-slate-500">Petunjuk penggunaan aplikasi administrasi wali kelas dan integrasi Google Apps Script + Spreadsheet untuk SMP Negeri 7 Sentani.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-xs text-xs leading-relaxed text-slate-700">
        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">1</span>
            Cara Membuat Google Spreadsheet & Google Apps Script (Opsional Backend)
          </h3>
          <p>
            Aplikasi ini dirancang sebagai SPA modern yang dapat berjalan langsung secara lokal atau diintegrasikan dengan backend Google Apps Script dan Google Spreadsheet.
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Buka <a href="https://sheets.google.com" target="_blank" rel="noreferrer" className="text-emerald-800 underline font-medium">Google Sheets</a> dan buat spreadsheet baru bernama <strong>DB_SMPN7_SENTANI_2026</strong>.</li>
            <li>Buat sheet sesuai daftar tabel: USERS, SEKOLAH, SISWA, GURU, ROMBEL, NILAI, KEHADIRAN, PRESTASI, PELANGGARAN, CATATAN_WALI_KELAS, dll.</li>
            <li>Buka menu <strong>Ekstensi &gt; Apps Script</strong> untuk menulis backend script jika diperlukan sinkronisasi cloud real-time.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">2</span>
            Panduan Login & Hak Akses Role
          </h3>
          <p>
            Aplikasi menggunakan sistem Role-Based Access Control (RBAC):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Super Admin:</strong> Mengelola seluruh konfigurasi, user, backup, dan reset data demo.</li>
            <li><strong>Kepala Sekolah:</strong> Memantau dashboard, kehadiran, nilai, dan validasi laporan.</li>
            <li><strong>Wali Kelas:</strong> Mengelola data siswa kelas, presensi, catatan wali kelas, dan cetak rapor/leger.</li>
            <li><strong>Guru Mata Pelajaran:</strong> Menginput dan memantau capaian nilai mapel.</li>
            <li><strong>Siswa & Orang Tua:</strong> Melihat profil, kehadiran, dan informasi akademik secara transparan.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs">3</span>
            Cara Backup dan Restore Data
          </h3>
          <p>
            Gunakan menu <strong>Pengaturan Sekolah</strong> untuk melakukan backup seluruh data ke dalam format JSON yang aman, atau lakukan restore saat diperlukan migrasi perangkat.
          </p>
        </section>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <p className="font-semibold text-emerald-900">
            Aplikasi ini telah disesuaikan sepenuhnya dengan identitas SMP Negeri 7 Sentani, Kabupaten Jayapura, Papua untuk Tahun Pelajaran 2026/2027.
          </p>
        </div>
      </div>
    </div>
  );
};
