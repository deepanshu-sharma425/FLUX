"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-10 flex items-center justify-center gap-2 w-full py-4 border-2 border-red-500 text-red-500 rounded-2xl font-bold hover:bg-red-50 transition-colors"
    >
      <LogOut className="w-5 h-5" />
      Logout from Account
    </button>
  );
}
