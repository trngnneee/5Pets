"use client"

import { Label } from "@/components/ui/label";
import { DashboardTitle } from "../../components/DashboardTitle";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "../../components/ImageUploader";
import { useEffect, useState } from "react";
import Link from "next/link";
import JustValidate from "just-validate";
import { adminCategoryAllList, adminCreateCategory } from "@/lib/adminAPI/category";
import { toastHandler } from "@/lib/toastHandler";
import { useRouter } from "next/navigation";
import { buildCategoryTree } from "./../../../../../../helper/renderCategory"

export default function AdminCategoryCreate() {
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [imageList, setImageList] = useState([]);
  const [submit, setSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const promise = await adminCategoryAllList();
      if (promise.code == "success") {
        setCategoryList(promise.data);
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    const validation = new JustValidate("#categoryCreateForm");
    validation
      .addField('#name', [
        {
          rule: 'required',
          errorMessage: 'Tên danh mục bắt buộc!'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Tên danh mục không được vượt quá 50 ký tự!',
        },
      ])
      .onSuccess((event) => {
        event.preventDefault();

        setSubmit(true);
      })
  }, [])

  const handleSubmit = () => {
    if (!submit) return;

    if (!imageList || imageList.length === 0) {
      toastHandler(Promise.reject("Vui lòng tải lên ít nhất một hình ảnh!"));
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("parent", parent);
    imageList.forEach((file) => {
      formData.append("file", file);
    })

    const promise = adminCreateCategory(formData);
    toastHandler(promise, router, "/admin/category")
  }

  return (
    <>
      <Link href="/admin/category" className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-[var(--main-color)] hover:underline">
        <ChevronLeft className="size-4" aria-hidden="true" />
        Quay lại danh sách
      </Link>
      <DashboardTitle title="Tạo danh mục" />
      <form onSubmit={handleSubmit} id="categoryCreateForm" className="bg-white w-full p-12.5 rounded-[14px] mt-[30px] border border-[#B9B9B9]">
        <div className="flex gap-[30px]">
          <div className="w-full flex flex-col gap-3">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-[#606060]"
            >
              Tên danh mục<span className="ml-0.5 text-red-500" aria-hidden="true">*</span>
            </Label>
            <Input
              placeholder="Danh mục 1..."
              id="name"
              name="name"
              aria-required="true"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <Label
              htmlFor="parent"
              className="text-sm font-semibold text-[#606060]"
            >
              Danh mục cha
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild id="parent">
                <Button
                  type="button"
                  className="w-full flex items-center justify-between rounded-md border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <span>{(categoryList.find((item) => item.id == parent)?.name) || "Chọn danh mục"}</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setParent("")}>Chọn danh mục</DropdownMenuItem>
                {categoryList?.length > 0 && buildCategoryTree(categoryList, setParent)}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-[30px]">
          <Label className="text-sm font-semibold text-[#606060]">
            Ảnh đại diện<span className="ml-0.5 text-red-500" aria-hidden="true">*</span>
          </Label>
          <ImageUploader
            value={imageList}
            onChange={setImageList}
            maxFiles={1}
          />
        </div>
        <div className="flex flex-col items-center mt-[30px]">
          <Button disabled={submit} className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] min-w-[220px] px-8 font-bold text-lg">Tạo danh mục</Button>
          <Link href="/admin/category" className="text-[var(--main-color)] hover:text-[var(--main-hover)] hover:underline mt-5">Quay trở lại danh sách</Link>
        </div>
      </form>
    </>
  );
}