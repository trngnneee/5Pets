"use client"

import { useState } from "react";
import { FileUploader } from "./components/FileUploader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardTitle } from "../../components/DashboardTitle";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { adminPetImport } from "@/lib/adminAPI/pet";
import { toastHandler } from "@/lib/toastHandler";
import { useRouter } from "next/navigation";

export default function AdminPetImport() {
  const [file, setFile] = useState([]);
  const router = useRouter();
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (file.length === 0) {
      toast.error("Vui lòng chọn file để import.");
      return;
    }

    const formData = new FormData();
    if (file.length > 0) {
      formData.append("file", file[0]);
    }

    const promise = adminPetImport(formData);
    toastHandler(promise, router, "/admin/pet");
  }

  return (
    <>
      <DashboardTitle title="Import dữ liệu thú cưng" />
      <form onSubmit={handleSubmit} className="bg-white w-full p-12.5 rounded-[14px] mt-[30px] border border-[#B9B9B9]">
        <Label className="text-sm font-semibold text-[#606060]">Import file dữ liệu thú cưng</Label>
        <div className="flex flex-col gap-2 mt-[30px]">
          <FileUploader
            value={file}
            onChange={setFile}
            maxFiles={1}
          />
        </div>
        <div className="flex flex-col items-center mt-[30px]">
          <Button className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] w-1/4 font-bold text-lg">Import file</Button>
          <Link href="/admin/pet" className="text-[var(--main-color)] hover:text-[var(--main-hover)] hover:underline mt-5">Quay trở lại danh sách</Link>
        </div>
      </form>
    </>
  )
}