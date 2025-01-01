import { useEffect, useState } from "react";
import { SidebarLayout } from "@/components/sidebar";
import { MemberData, columns } from "@/components/member/data_columns";
import { DataTable } from "@/components/member/data_table";
import { MemberDialog } from "@/components/member/dialog";
import { addMember, deleteMember, getData, updateMember } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast, useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Member() {
  const { toast } = useToast()
  const [data, setData] = useState<MemberData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingMember, setEditingMember] = useState<MemberData | null>(null);
  const [newMember, setNewMember] = useState<MemberData>({
    id: "",
    nama: "",
    email: "",
    no_hp: "",
    alamat: "",
    tanggal_daftar: new Date(),
    status_anggota: "active",
  });
  const [validationError, setValidationError] = useState<Record<string, string | null>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getData();
    // Ubah tanggal menjadi objek Date
    const processedData = result.map((item: any) => ({
        ...item,
        tanggal_daftar: new Date(item.tanggal_daftar),
      }));
    setData(processedData);
  };

  const openAddDialog = () => {
    setDialogMode("add");
    setNewMember({
      id: "",
      nama: "",
      email: "",
      no_hp: "",
      alamat: "",
      tanggal_daftar: new Date(),
      status_anggota: "active",
    });
    setValidationError({});
    setIsDialogOpen(true);
  };

  const openEditDialog = (member: MemberData) => {
    setDialogMode("edit");
    setEditingMember(member);
    setNewMember({ ...member });
    setValidationError({});
    setIsDialogOpen(true);
  };

  const handleSubmit = async (memberData: MemberData) => {
    const errors: Record<string, string | null> = {};

    if (!memberData.nama) errors.nama = "Nama wajib diisi.";
    if (!memberData.email) errors.email = "Email wajib diisi.";
    if (!memberData.no_hp) errors.no_hp = "Nomor HP wajib diisi.";
    if (!memberData.alamat) errors.alamat = "Alamat wajib diisi.";

    setValidationError(errors);

    // Jika ada error, hentikan pengiriman
    if (Object.values(errors).some((error) => error !== null)) {
      return;
    }

    setIsLoading(true);

    try {
      if (dialogMode === "add") {
          toast({
              title: "Anggota berhasil ditambahkan",
              description: "Anggota berhasil ditambahkan ke database.",
              className: "bg-blue-500",
            })
        await addMember(memberData);
      } else if (dialogMode === "edit" && editingMember) {
        toast({
            title: "Anggota berhasil diupdate",
            description: "Anggota berhasil diupdate di database.",
            className: "bg-blue-500",
          })
        await updateMember(memberData.id, memberData);
      }
      fetchData();
      setIsDialogOpen(false);
    } catch (error: any) {
        // Tangkap error validasi dari Backend
        if (error?.data?.errors) {
          const backendErrors = error.data.errors;
    
          // Tangani error email unik
          if (backendErrors.email) {
            setValidationError((prev) => ({
              ...prev,
              email: backendErrors.email[0],
            }));
          }
        } else {
          console.error("Unexpected error:", error);
        }
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedMemberId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
        toast({
            title: "Anggota berhasil dihapus",
            description: "Anggota berhasil dihapus dari database.",
            className: "bg-red-500",
        })
      await deleteMember(id);
      fetchData();
      setIsDeleteDialogOpen(false);
      setSelectedMemberId(null);
    } catch (error) {
      console.error("Gagal menghapus anggota:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <SidebarLayout>
      <div className="flex flex-col gap-4">

        {/* Tombol Tambah Anggota */}
        <div className="flex flex-row justify-between">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-sans font-bold">Manajemen Anggota Library Sofyan Corp</h1>
                <p>Berikut adalah daftar anggota yang terdaftar di perpustakaan.</p>
            </div>
            <Button onClick={openAddDialog}>Tambah Anggota</Button>
        </div>

        {/* DataTable */}
        <DataTable columns={columns(openEditDialog, confirmDelete )} data={data} />

        {/* MemberDialog */}
        <MemberDialog
          isOpen={isDialogOpen}
          mode={dialogMode}
          memberData={newMember}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleSubmit}
          onChange={(e) => {
            const { id, value } = e.target;
            setNewMember((prev) => ({
              ...prev,
              [id]: id === "tanggal_daftar" ? new Date(value) : value,
            }));

            // Hapus pesan error saat field diperbarui
            setValidationError((prev) => ({
              ...prev,
              [id]: null,
            }));
          }}
          onStatusChange={(status) => {
            setNewMember((prev) => ({
              ...prev,
              status_anggota: status,
            }));

            // Hapus error status
            setValidationError((prev) => ({
              ...prev,
              status_anggota: null,
            }));
          }}
          validationError={validationError}
          isLoading={isLoading}
        />
        
        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent >
                <DialogHeader>
                <DialogTitle >Konfirmasi Hapus</DialogTitle>
                <DialogDescription>
                    Apakah Anda yakin ingin menghapus anggota ini? <br/> Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                    Batal
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(selectedMemberId!)}>
                    Hapus Anggota
                </Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
      </div>
    </SidebarLayout>
  );
}
