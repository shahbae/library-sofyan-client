"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Edit } from "@/pages/member/edit"

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
    accessorKey: "status",
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation(); // Hentikan propagasi event klik
            }}>
              <Edit
                trigger={<span onClick={(e) => {
                  e.stopPropagation(); // Pastikan klik tidak menutup dropdown
                }}>Edit Anggota</span>}
                defaultValues={{
                  nama: member.nama,
                  email: member.email,
                  no_hp: member.no_hp,
                  alamat: member.alamat,
                }}
                onSubmit={(data) => {
                  console.log("Data disimpan:", data);
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuItem>Hapus Anggota</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]
