"use client";

import { useEffect, useState } from "react";
import { DashboardTitle } from "../../components/DashboardTitle";
import { useRouter } from "next/navigation";
import { adminCategoryAllList } from "@/lib/adminAPI/category";
import JustValidate from "just-validate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ImageUploader } from "../../components/ImageUploader";
import Link from "next/link";
import { buildCategoryTree } from "@/helper/renderCategory";
import { genderList } from "@/config/variable";
import { toastHandler } from "@/lib/toastHandler";
import { Textarea } from "@/components/ui/textarea";
import { adminCreatePet } from "@/lib/adminAPI/pet";

export default function AdminPetCreate() {
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imageList, setImageList] = useState([]);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
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
          errorMessage: 'Tên thú cưng bắt buộc!'
        },
        {
          rule: 'minLength',
          value: 5,
          errorMessage: 'Tên thú cưng phải có ít nhất 5 ký tự!',
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'Tên thú cưng không được vượt quá 50 ký tự!',
        },
      ])
      .addField('#category', [
        {
          rule: 'required',
          errorMessage: 'Danh mục bắt buộc!'
        }
      ])
      .addField('#age', [
        {
          rule: 'required',
          errorMessage: 'Tuổi bắt buộc!'
        }
      ])
      .addField('#gender', [
        {
          rule: 'required',
          errorMessage: 'Giới tính bắt buộc!'
        }
      ])
      .addField('#price', [
        {
          rule: 'required',
          errorMessage: 'Giá bắt buộc!'
        }
      ])
      .addField('#color', [
        {
          rule: 'required',
          errorMessage: 'Màu sắc bắt buộc!'
        }
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
    formData.append("category", category);
    imageList.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("description", description);

    const promise = adminCreatePet(formData);
    toastHandler(promise, router, "/admin/pet");
  }

  return (
    <>
      <DashboardTitle title="Tạo thú cưng" />
      <form onSubmit={handleSubmit} id="categoryCreateForm" className="bg-white w-full p-12.5 rounded-[14px] mt-[30px] border border-[#B9B9B9]">
        <div className="flex gap-[30px]">
          <div className="w-full flex flex-col gap-3">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-[#606060]"
            >
              Tên thú cưng
            </Label>
            <Input
              placeholder="Thú cưng 1..."
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-3">
            <Label
              className="text-sm font-semibold text-[#606060]"
            >
              Danh mục
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className="w-full flex items-center justify-between rounded-md border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <span>{(categoryList.find((item) => item.id == category)?.name) || "Chọn danh mục"}</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategory("")}>Chọn danh mục</DropdownMenuItem>
                {categoryList?.length > 0 && buildCategoryTree(categoryList, setCategory)}
              </DropdownMenuContent>
            </DropdownMenu>
            <input type="hidden" id="category" name="category" value={category} />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-[30px]">
          <ImageUploader
            value={imageList}
            onChange={setImageList}
            maxFiles={7}
          />
        </div>
        <div className="flex gap-[30px] mt-[30px]">
          <div className="w-full flex flex-col gap-3">
            <Label
              htmlFor="age"
              className="text-sm font-semibold text-[#606060]"
            >
              Tuổi theo tháng
            </Label>
            <Input
              placeholder="1"
              id="age"
              name="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label
              className="text-sm font-semibold text-[#606060]"
            >
              Giống
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  className="w-full flex items-center justify-between rounded-md border border-input bg-background text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <span>{(genderList.find((item) => item.value == gender)?.label) || "Chọn giống"}</span>
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => { setGender("") }}>Chọn giống</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setGender("female") }}>Cái</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setGender("male") }}>Đực</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input type="hidden" id="gender" name="gender" value={gender} />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label
              htmlFor="price"
              className="text-sm font-semibold text-[#606060]"
            >
              Giá
            </Label>
            <Input
              placeholder="100.000"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label
              htmlFor="color"
              className="text-sm font-semibold text-[#606060]"
            >
              Màu sắc
            </Label>
            <Input
              placeholder="Trắng"
              id="color"
              name="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col gap-3">
            <Label
              htmlFor="stock"
              className="text-sm font-semibold text-[#606060]"
            >
              Số lượng
            </Label>
            <Input
              placeholder="1"
              id="stock"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-[30px] flex flex-col gap-3">
          <Label
            htmlFor="desc"
            className="text-sm font-semibold text-[#606060]"
          >
            Mô tả ngắn
          </Label>
          <Textarea id="desc" placeholder="Mô tả ngắn..." value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="flex flex-col items-center mt-[30px]">
          <Button disabled={submit} className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] w-1/4 font-bold text-lg">Tạo thú cưng</Button>
          <Link href="/admin/pet" className="text-[var(--main-color)] hover:text-[var(--main-hover)] hover:underline mt-5">Quay trở lại danh sách</Link>
        </div>
      </form>
    </>
  )
}