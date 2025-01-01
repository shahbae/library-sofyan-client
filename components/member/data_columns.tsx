"use client"

import { ColumnDef } from "@tanstack/react-table"
import { EditIcon} from "lucide-react"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MdDelete } from "react-icons/md"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "../ui/switch"

export type MemberData = {
  id: string
  nama: string
  email: string
  no_hp: string
  alamat: string
  tanggal_daftar: Date
  status_anggota: "active" | "inactive"
}

export const columns: ColumnDef<MemberData>[] = [
  {
    accessorKey: "nama",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "no_hp",
    header: "No HP",
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    accessorKey: "tanggal_daftar",
    header: "Tanggal Daftar",
    cell: ({ row }) => {
        const date = row.original.tanggal_daftar
        return <div>{date.toLocaleDateString()}</div>
      },
  },
  {
    accessorKey: "status_anggota",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.status_anggota
        return <div><Badge variant={status === 'active' ? 'default' : 'secondary'}>{status}</Badge></div>
      },
  },
  {
    accessorKey: "id",
    header: "Aksi",
    id: "actions",
    cell: ({ row }) => {
      const  member = row.original
      return (
        <div className="flex flex-row items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"ghost"}>
                <EditIcon className="h-4 w-4 text-indigo-400" />
              </Button>
            </DialogTrigger>
                    <DialogContent className="mx-5 max-w-[300px] md:max-w-xl">
                        <DialogHeader>
                        <DialogTitle>Edit Anggota</DialogTitle>
                        <DialogDescription>
                            Silahkan edit datanya.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nama" className="text-left">
                                Nama
                                </Label>
                                <Input
                                id="nama"
                                className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-left">
                                Email
                                </Label>
                                <Input
                                id="email"
                                className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="no_hp" className="text-left">
                                Nomer HP
                                </Label>
                                <Input
                                id="no_hp"
                                className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="alamat" className="text-left">
                                Alamat
                                </Label>
                                <Textarea
                                id="alamat"
                                className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-left">
                                Status
                                </Label>
                                <Switch id="status" />
                            </div>
                        </div>
                        <DialogFooter>
                        <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            <Button variant="ghost">
              <MdDelete className="h-4 w-4 text-red-400" />
            </Button>
        </div>
      );
    },
  },
]
