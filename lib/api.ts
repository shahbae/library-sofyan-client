import { MemberData } from "@/components/member/data_columns";
import axios from "axios";

// Membuat instance Axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi untuk mendapatkan data anggota
export async function getData(): Promise<MemberData[]> {
  try {
    const response = await apiClient.get("/anggota"); // Endpoint untuk mendapatkan data anggota
    // console.log("API Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

// Fungsi untuk menambahkan data anggota baru
export async function addMember(member: MemberData): Promise<MemberData> {
    try {
      console.log("data param", member);
      const response = await apiClient.post("/anggota", member);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Log error respons dari backend Laravel
        console.error("Error response from server:", error.response.data);
  
        // Lempar error ke caller agar bisa ditangani
        throw error.response; 
      }
  
      // Jika error bukan dari axios, lempar error generik
      throw new Error("Unexpected error occurred while adding member.");
    }
  }

  export async function updateMember(id: string, updatedData: MemberData): Promise<MemberData> {
    try {
      const response = await apiClient.put(`/anggota/${id}`, updatedData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error response from server:", error.response.data);
        throw error.response;
      }
      throw new Error("Unexpected error occurred while updating member.");
    }
  }
  

// Fungsi untuk menghapus data anggota
export async function deleteMember(id: string): Promise<boolean> {
  try {
    await apiClient.delete(`/anggota/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting member:", error);
    return false;
  }
}
