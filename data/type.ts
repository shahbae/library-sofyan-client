export type MemberData = {
    id: string;
    nama: string;
    email: string;
    no_hp: string;
    alamat: string;
    tanggal_daftar: Date;
    status_anggota: "active" | "inactive";
  };