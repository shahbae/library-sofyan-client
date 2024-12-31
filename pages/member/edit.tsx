"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EditMemberDialogProps {
  trigger: React.ReactNode;
  onSubmit: (data: { nama: string; email: string; no_hp: string; alamat: string }) => void;
  defaultValues?: { nama: string; email: string; no_hp: string; alamat: string };
}

export function Edit({ trigger, onSubmit, defaultValues }: EditMemberDialogProps) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="mx-5 max-w-[300px] md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Anggota</DialogTitle>
          <DialogDescription>Silahkan edit datanya.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = {
              nama: formData.get("nama") as string,
              email: formData.get("email") as string,
              no_hp: formData.get("no_hp") as string,
              alamat: formData.get("alamat") as string,
            };
            onSubmit(data);
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama" className="text-left">
                Nama
              </Label>
              <Input id="nama" name="nama" defaultValue={defaultValues?.nama} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input id="email" name="email" defaultValue={defaultValues?.email} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="no_hp" className="text-left">
                Nomor HP
              </Label>
              <Input id="no_hp" name="no_hp" defaultValue={defaultValues?.no_hp} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alamat" className="text-left">
                Alamat
              </Label>
              <Textarea id="alamat" name="alamat" defaultValue={defaultValues?.alamat} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
