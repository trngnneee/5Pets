"use client"

import { useAdminAuth } from "@/hooks/useAdminAuth"

export default function CategoryPage(){
  const {userInfo} = useAdminAuth();
  console.log(userInfo);
  
  return (
    <>
      <div>Trang Danh mục</div>
    </>
  )
}