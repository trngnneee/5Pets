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
import { ChevronLeft, Loader2 } from "lucide-react";

export default function AdminPetImport() {
  const [file, setFile] = useState([]);
  const [pending, setPending] = useState(false);
  const router = useRouter();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (pending) return;

    if (file.length === 0) {
      toast.error("Vui lòng chọn file để import.");
      return;
    }

    const formData = new FormData();
    if (file.length > 0) {
      formData.append("file", file[0]);
    }

    setPending(true);
    const promise = adminPetImport(formData);
    toastHandler(promise, router, "/admin/pet");
    // Thành công thì chuyển trang; chỉ mở lại nút khi lỗi
    promise
      .then((data) => {
        if (data?.code !== "success") setPending(false);
      })
      .catch(() => setPending(false));
  }

  return (
    <>
      <Link href="/admin/pet" className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-[var(--main-color)] hover:underline">
        <ChevronLeft className="size-4" aria-hidden="true" />
        Quay lại danh sách
      </Link>
      <DashboardTitle title="Import dữ liệu thú cưng" />
      <form onSubmit={handleSubmit} className="bg-white w-full p-12.5 rounded-[14px] mt-[30px] border border-[#B9B9B9]">
        <Label className="text-sm font-semibold text-[#606060]">Import file dữ liệu thú cưng</Label>
        <p className="mt-1 text-xs text-gray-500">Hỗ trợ file CSV, XLSX, XLS hoặc JSON, tối đa 5MB.</p>
        <div className="flex flex-col gap-2 mt-[30px]">
          <FileUploader
            value={file}
            onChange={setFile}
            maxFiles={1}
          />
        </div>
        <div className="flex flex-col items-center mt-[30px]">
          <Button disabled={pending} className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] min-w-[220px] px-8 font-bold text-lg">
            {pending && <Loader2 className="animate-spin" aria-hidden="true" />}
            {pending ? "Đang import..." : "Import file"}
          </Button>
          <Link href="/admin/pet" className="text-[var(--main-color)] hover:text-[var(--main-hover)] hover:underline mt-5">Quay trở lại danh sách</Link>
        </div>
      </form>
    </>
  )
}
