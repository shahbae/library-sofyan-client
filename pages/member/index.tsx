import { SidebarLayout } from "../../components/fragments/sidebar";
import { columns, MemberData } from "../../components/fragments/data_columns";
import { DataTable } from "../../components/fragments/data_table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

async function getData(): Promise<MemberData[]> {
    // Fetch data from your API here.
    return [
        {
            "id": "0bbf7b25-9676-42cc-9ceb-131c973bb90a",
            "nama": "Clemens Funk",
            "email": "dillan40@example.net",
            "no_hp": "678-402-2347",
            "alamat": "687 Schumm Fort\nRoweberg, IL 14087",
            "tanggal_daftar": new Date("1978-07-27"),
            "status_anggota": "inactive"
        },
        {
            "id": "2388414f-1cd6-417d-9671-178ffc7960aa",
            "nama": "Mandy Ferry",
            "email": "schulist.berta@example.org",
            "no_hp": "530-960-8932",
            "alamat": "17341 Lang Mission Apt. 220\nVivianefort, MI 10300-2803",
            "tanggal_daftar": new Date("1987-03-25"),
            "status_anggota": "inactive"
        },
        {
            "id": "25aa18e3-4e10-451b-8f23-6b1fbfaf9730",
            "nama": "Miss Zoie Hickle Jr.",
            "email": "kenna.cremin@example.org",
            "no_hp": "+1-318-447-9955",
            "alamat": "45756 Frieda Pine Suite 697\nMuellerside, WY 68956",
            "tanggal_daftar": new Date("1977-02-12"),
            "status_anggota": "active"
        },
        {
            "id": "546eba11-11cd-4f9c-b166-4553b1c24bf0",
            "nama": "Ms. Imogene Aufderhar",
            "email": "gino59@example.com",
            "no_hp": "845.743.1620",
            "alamat": "992 Zula Hills Suite 786\nAiyanaton, MT 34083",
            "tanggal_daftar": new Date("2010-03-03"),
            "status_anggota": "inactive"
        },
        {
            "id": "59adc1c6-ccc3-4f55-bfd4-cd3e28876512",
            "nama": "Elaina Kilback I",
            "email": "maryse.stoltenberg@example.com",
            "no_hp": "832.804.0856",
            "alamat": "124 Gusikowski Knolls Apt. 193\nSethmouth, TN 95770-3206",
            "tanggal_daftar": new Date("1997-10-03"),
            "status_anggota": "inactive"
        },
        {
            "id": "74ac2761-0666-4999-84f3-09db22cf1a35",
            "nama": "Jewell Kessler",
            "email": "cummerata.nicklaus@example.net",
            "no_hp": "(820) 472-0647",
            "alamat": "2397 Grady Streets\nSchmelerport, MO 91637-8266",
            "tanggal_daftar": new Date("2021-02-11"),
            "status_anggota": "active"
        },
        {
            "id": "76178d3f-e356-43ec-b3e4-81b359b3742d",
            "nama": "Mrs. Concepcion Schmidt V",
            "email": "maymie.johns@example.com",
            "no_hp": "+1.904.906.3256",
            "alamat": "71977 Laron Wall Apt. 882\nPort Ariane, CO 11200",
            "tanggal_daftar": new Date("2019-03-21"),
            "status_anggota": "active"
        },
        {
            "id": "7f04e38c-10df-44ce-84a6-145f7a4ee9cf",
            "nama": "Jerrell Gutmann MD",
            "email": "omurazik@example.com",
            "no_hp": "+15628793160",
            "alamat": "687 Miller Expressway Apt. 164\nNorth Nelda, TX 29929",
            "tanggal_daftar": new Date("2015-05-19"),
            "status_anggota": "inactive"
        },
        {
            "id": "bcb9c511-f77e-465a-a272-6930be547bf0",
            "nama": "Carolanne Reichert",
            "email": "abshire.jazlyn@example.com",
            "no_hp": "+1-859-212-9287",
            "alamat": "2136 Raegan Lodge\nSouth Peggietown, NJ 97746-2327",
            "tanggal_daftar": new Date("1995-05-27"),
            "status_anggota": "inactive"
        },
        {
            "id": "ccbad89a-b934-477f-ae24-287a2ad80ef0",
            "nama": "Terrence Pagac",
            "email": "adam80@example.net",
            "no_hp": "1-540-556-8504",
            "alamat": "56857 Zieme Station Suite 155\nFramiton, OH 50499",
            "tanggal_daftar": new Date("1991-10-29"),
            "status_anggota": "inactive"
        }
    ]
  }

export default function Member() {
    const [data, setData] = useState<MemberData[]>([]);

    useEffect(() => {
        async function fetchData() {
            const result = await getData();
            setData(result);
        }
        fetchData();
    }, []);
  return (
    <div>
        <SidebarLayout>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-sans font-bold">Manajemen Anggota Library Sofyan Corp</h1>
                    <p>Berikut adalah daftar anggota yang terdaftar di perpustakaan.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Tambah Anggota</Button>
                    </DialogTrigger>
                    <DialogContent className="mx-5 max-w-[300px] md:max-w-xl">
                        <DialogHeader>
                        <DialogTitle>Tambah Anggota</DialogTitle>
                        <DialogDescription>
                            Silahkan isi datanya.
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
                        </div>
                        <DialogFooter>
                        <Button type="submit">Simpan</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <DataTable columns={columns} data={data} />
          </div>
        </SidebarLayout>
    </div>
  );
}
