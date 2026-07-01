import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { verifyAdmin } from "@/services/authService";

export default function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/admin/login");
          return;
        }

        await verifyAdmin();
      } catch (error) {
        localStorage.removeItem("token");

        toast.error("Session expired. Please login again.");

        router.replace("/admin/login");
      }
    };

    checkAdmin();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    router.replace("/admin/login");
  };

  return {
    handleLogout,
  };
}