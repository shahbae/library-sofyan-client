import { useEffect, useState } from "react";
import { SidebarLayout } from "@/components/sidebar";
import { MemberData, columns } from "@/components/member/data_columns";
import { DataTable } from "@/components/member/data_table";
import { MemberDialog } from "@/components/member/dialog";
import { addMember, getData, updateMember } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function Member() {
  const [data, setData] = useState<MemberData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    setData(result);
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
        await addMember(memberData);
      } else if (dialogMode === "edit" && editingMember) {
        await updateMember(memberData.id, memberData);
      }
      fetchData();
      setIsDialogOpen(false);
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
        <DataTable columns={columns(openEditDialog)} data={data} />

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
      </div>
    </SidebarLayout>
  );
}
