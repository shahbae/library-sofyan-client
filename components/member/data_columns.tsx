"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditIcon } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MdDelete } from "react-icons/md";
import { MemberData } from "@/data/type";

export const columns = (openEditDialog: (member: MemberData) => void,  confirmDelete: (id: string) => void ): ColumnDef<MemberData>[] => [
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nama
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const nama = row.original.nama;
      return <div className="max-w-44 truncate">{nama}</div>;
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
    cell: ({ row }) => {
      const alamat = row.original.alamat;
      return <div className="max-w-xs truncate">{alamat}</div>;
    }
  },
  {
    accessorKey: "tanggal_daftar",
    header: "Tanggal Daftar",
    cell: ({ row }) => {
      const date = row.original.tanggal_daftar;
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "status_anggota",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status_anggota;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const member = row.original;
      return (
        <div className="flex flex-row items-center">
          <Button
            variant="ghost"
            onClick={() => openEditDialog(member)}
          >
            <EditIcon className="h-4 w-4 text-indigo-400" />
          </Button>
          <Button 
            variant="ghost"
            onClick={() => confirmDelete(member.id)}
          >
            <MdDelete className="h-4 w-4 text-red-400" />
          </Button>
        </div>
      );
    },
  },
];
