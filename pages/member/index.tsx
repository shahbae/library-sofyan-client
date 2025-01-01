import { SidebarLayout } from "../../components/sidebar";
import { columns, MemberData } from "../../components/member/data_columns";
import { DataTable } from "../../components/member/data_table";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addMember, getData } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";



export default function Member() {
    const [data, setData] = useState<MemberData[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [validationError, setValidationError] = React.useState<Record<string, string | null>>({});


    const [newMember, setNewMember] = useState<MemberData>({
        id: "", // ID akan dihasilkan di backend atau dengan library UUID
        nama: "",
        email: "",
        no_hp: "",
        alamat: "",
        tanggal_daftar: new Date(),
        status_anggota: "active",
      });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setNewMember((prev) => ({
        ...prev,
        [id]: id === "tanggal_daftar" ? new Date(value) : value,
        }));
        setValidationError((prev) => ({ ...prev, email: null }));
        setValidationError((prev) => ({ ...prev, nama: null }));
        setValidationError((prev) => ({ ...prev, no_hp: null }));
        setValidationError((prev) => ({ ...prev, alamat: null }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validasi: pastikan semua field diisi
        if (!newMember.nama || !newMember.email || !newMember.no_hp || !newMember.alamat) {
            setValidationError((prev) => ({
            ...prev,
            nama: !newMember.nama ? "Nama wajib diisi." : null,
            email: !newMember.email ? "Email wajib diisi." : null,
            no_hp: !newMember.no_hp ? "Nomor HP wajib diisi." : null,
            alamat: !newMember.alamat ? "Alamat wajib diisi." : null,
            }));
            setIsLoading(false);
            return; // Hentikan proses jika ada field kosong
        }
      
        try {
          // Kirim data ke backend
          const savedMember = await addMember(newMember);
      
          if (savedMember) {
            console.log("Member added successfully:", savedMember);
            fetchData(); // Ambil ulang data dari API
          }
      
          setSuccessMessage("Anggota berhasil ditambahkan!");
          setNewMember({
            id: "",
            nama: "",
            email: "",
            no_hp: "",
            alamat: "",
            tanggal_daftar: new Date(),
            status_anggota: "active",
          });
          setIsDialogOpen(false); // Tutup dialog
          
        } catch (error: any) {
            // Tangkap error validasi dari Laravel
            if (error?.data?.errors) {
              const backendErrors = error.data.errors;
        
              // Tangani error email unik
              if (backendErrors.email) {
                setValidationError((prev) => ({
                  ...prev,
                  email: backendErrors.email[0], // Tampilkan pesan error email
                }));
              }
            } else {
              console.error("Unexpected error:", error);
            }
          } finally {
            setIsLoading(false);
          }
      };

        async function fetchData() {
            const result = await getData();
            // console.log("Data fetched:", result);
            // Proses data sebelum diteruskan ke DataTable
            const processedData = result.map((item) => ({
                ...item,
                tanggal_daftar: new Date(item.tanggal_daftar), // Ubah tanggal menjadi objek Date
            }));
            // console.log("Processed Data:", processedData);
            setData(processedData);
        }

    useEffect(() => {
        fetchData();
    }, []);
    // console.log("DataTable data:", data);
  return (
    <div>
        <SidebarLayout>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-sans font-bold">Manajemen Anggota Library Sofyan Corp</h1>
                    <p>Berikut adalah daftar anggota yang terdaftar di perpustakaan.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setIsDialogOpen(true)}>Tambah Anggota</Button>
                    </DialogTrigger>
                    <DialogContent className="mx-5 max-w-[300px] md:max-w-xl">
                        <DialogHeader>
                        <DialogTitle>Tambah Anggota</DialogTitle>
                        <DialogDescription>
                            Silahkan isi datanya.
                        </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-left">
                                Nama
                                </Label>
                                <Input
                                value={newMember.nama} 
                                onChange={handleChange}
                                id="nama"
                                className="col-span-3"
                                />
                                {validationError.nama && <p className="font-sans font-semibold text-sm p-1 rounded-full bg-red-500/10 text-red-500 col-span-4 text-center">{validationError.nama}</p>}

                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-left">
                                Email
                                </Label>
                                <Input
                                value={newMember.email} 
                                onChange={handleChange}
                                id="email"
                                className="col-span-3"
                                />
                                {validationError.email && <p className="font-sans font-semibold text-sm p-1 rounded-full bg-red-500/10 text-red-500 col-span-4 text-center">{validationError.email}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="no_hp" className="text-left">
                                Nomer HP
                                </Label>
                                <Input
                                value={newMember.no_hp} 
                                onChange={handleChange}
                                id="no_hp"
                                className="col-span-3"
                                />
                                {validationError.no_hp && <p className="font-sans font-semibold text-sm p-1 rounded-full bg-red-500/10 text-red-500 col-span-4 text-center">{validationError.no_hp}</p>}
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="alamat" className="text-left">
                                Alamat
                                </Label>
                                <Textarea
                                id="alamat"
                                value={newMember.alamat} 
                                onChange={handleChange}
                                className="col-span-3"
                                />
                                {validationError.alamat && <p className="font-sans font-semibold text-sm p-1 rounded-full bg-red-500/10 text-red-500 col-span-4 text-center">{validationError.alamat}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Menyimpan..." : "Simpan"}
                        </Button>
                        </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={columns} data={data} />
          </div>
        </SidebarLayout>
    </div>
  );
}

