"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MemberData } from "./data_columns";
import { Switch } from "../ui/switch";

export type MemberDialogProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  memberData: MemberData;
  onClose: () => void;
  onSubmit: (data: MemberData) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onStatusChange: (status: "active" | "inactive") => void;
  validationError: Record<string, string | null>;
  isLoading: boolean;
};

export function MemberDialog({
  isOpen,
  mode,
  memberData,
  onClose,
  onSubmit,
  onChange,
  validationError,
  isLoading,
  onStatusChange,
}: MemberDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(memberData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mx-5 max-w-[300px] md:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Anggota" : "Edit Anggota"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Silahkan isi data anggota baru."
              : "Silahkan ubah data anggota."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama" className="text-left">
                Nama
              </Label>
              <Input
                id="nama"
                value={memberData.nama}
                onChange={onChange}
                className="col-span-3"
              />
              {validationError.nama && (
                <p className="font-sans font-semibold text-sm p-1 rounded-full bg-red-500/10 text-red-500 col-span-4 text-center">
                  {validationError.nama}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                id="email"
                value={memberData.email}
                onChange={onChange}
                className="col-span-3"
              />
              {validationError.email && (
                <p className="font-sans font-semibold text-sm p-1 rounded-full bg-red-500/10 text-red-500 col-span-4 text-center">
                  {validationError.email}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="no_hp" className="text-left">
                Nomor HP
              </Label>
              <Input
                id="no_hp"
                value={memberData.no_hp}
                onChange={onChange}
                className="col-span-3"
              />
              {validationError.no_hp && (
                <p className="font-sans font-semibold text-sm p-1 rounded-full bg-red-500/10 text-red-500 col-span-4 text-center">
                  {validationError.no_hp}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alamat" className="text-left">
                Alamat
              </Label>
              <Textarea
                id="alamat"
                value={memberData.alamat}
                onChange={onChange}
                className="col-span-3"
              />
              {validationError.alamat && (
                <p className="font-sans font-semibold text-sm p-1 rounded-full bg-red-500/10 text-red-500 col-span-4 text-center">
                  {validationError.alamat}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-left">
                Status
              </Label>
              <Switch
                id="status"
                checked={memberData.status_anggota === "active"}
                onCheckedChange={(checked) =>
                  onStatusChange(checked ? "active" : "inactive")
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Menyimpan..."
                : mode === "add"
                ? "Tambah"
                : "Simpan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
