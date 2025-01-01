import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarLayout } from "../components/sidebar";
import { getDashboardData } from "@/api/api";

export default function Dashboard() {
  const [data, setData] = useState({ total_anggota: 0, total_anggota_aktif: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true); // Aktifkan loading
    try {
      const result = await getDashboardData();
      setData(result); // Set data dari API
      setError(null); // Hapus pesan error
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("Gagal mengambil data dashboard. Silakan coba lagi.");
    } finally {
      setIsLoading(false); // Matikan loading
    }
  };

  return (
    <div>
      <SidebarLayout>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-sans font-bold">Selamat Datang Di Library Sofyan Corp</h1>
          <p>Halaman Dashboard untuk memantau data library</p>
          <div className="flex flex-row gap-4">
                      {/* Card Total Anggota */}
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Total Anggota</CardTitle>
              <CardDescription>Total anggota library sofyan corp</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : error ? (
                <h1 className="text-red-500">{error}</h1>
              ) : (
                <h1>{data.total_anggota}</h1>
              )}
            </CardContent>
          </Card>

          {/* Card Total Anggota Aktif */}
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle>Total Anggota Aktif</CardTitle>
              <CardDescription>Total anggota aktif library sofyan corp</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <h1>Loading...</h1>
              ) : error ? (
                <h1 className="text-red-500">{error}</h1>
              ) : (
                <h1>{data.total_anggota_aktif} </h1>
              )}
            </CardContent>
          </Card>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
}
