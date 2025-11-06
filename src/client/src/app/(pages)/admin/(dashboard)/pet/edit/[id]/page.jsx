"use client";

import { useEffect, useState } from "react";
import { DashboardTitle } from "../../../components/DashboardTitle";
import { useParams, useRouter } from "next/navigation";
import { adminCategoryAllList } from "@/lib/adminAPI/category";
import JustValidate from "just-validate";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { ImageUploader } from "../../../components/ImageUploader";
import Link from "next/link";
import { buildCategoryTree } from "@/helper/renderCategory";
import { genderList } from "@/config/variable";
import { toastHandler } from "@/lib/toastHandler";
import { Textarea } from "@/components/ui/textarea";
import { adminPetDetail, adminPetUpdate } from "@/lib/adminAPI/pet";

export default function AdminPetEdit() {
  const { id } = useParams();
  const [categoryList, setCategoryList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imageList, setImageList] = useState([]);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [submit, setSubmit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const promise = await adminCategoryAllList();
      if (promise.code == "success") {
        setCategoryList(promise.data);
      }
      const promise2 = await adminPetDetail(id);
      if (promise2.code == "success") {
        setName(promise2.data.name);
        setCategory(promise2.data.category);
        const images = (promise2.data.imageList || []).map((url, index) => ({
          name: `image-${index + 1}.jpg`,
          size: 0,
          type: "image/jpeg",
          url,
          id: `image-${index}-${Date.now()}`
        }));
        setImageList(images);
        setAge(promise2.data.age);
        setGender(promise2.data.gender);
        setPrice(promise2.data.price);
        setColor(promise2.data.color);
        setDescription(promise2.data.description);

        setLoaded(true);
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

  const handleSubmit = async () => {
    if (!submit) return;

    if (!imageList || imageList.length === 0) {
      toastHandler(Promise.reject("Vui lòng tải lên ít nhất một hình ảnh!"));
      return;
    }

    const normalizedList = imageList.map((img) => {
      if (img instanceof File) {
        return {
          id: `${img.name}-${Date.now()}`,
          name: img.name,
          size: img.size,
          type: img.type,
          url: URL.createObjectURL(img),
          file: img,
        };
      }
      return img;
    });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("price", price);
    formData.append("color", color);
    formData.append("description", description);

    const existingImages = normalizedList.filter((img) => img.url && !img.file);
    const existingUrls = existingImages.map((img) => img.url);
    formData.append("existingImages", JSON.stringify(existingUrls));

    const newImages = normalizedList.filter((img) => img.file);
    newImages.forEach((img) => {
      formData.append("images", img.file);
    });

    const promise = adminPetUpdate(id, formData);
    toastHandler(promise, router, "/admin/pet");
  };

  return (
    <>
      <DashboardTitle title="Chỉnh sửa thú cưng" />
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
          {loaded && (
            <ImageUploader
              value={imageList.length > 0 ? imageList : []}
              onChange={setImageList}
              maxFiles={7}
            />
          )}
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
          <Button disabled={submit} className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] w-1/4 font-bold text-lg">Chỉnh sửa thú cưng</Button>
          <Link href="/admin/pet" className="text-[var(--main-color)] hover:text-[var(--main-hover)] hover:underline mt-5">Quay trở lại danh sách</Link>
        </div>
      </form>
    </>
  )
}