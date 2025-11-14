"use client"

import Link from "next/link";
import { HeaderSearch } from "./components/HeaderSearch";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { clientCategoryList } from "@/lib/clientAPI/category";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promise = await clientCategoryList();
      if (promise.code == "success")
      {
        setCategoryList(promise.data);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-[#FCEED5] py-7 relative">
        <div className="container mx-auto flex justify-between items-center relative z-10">
          <div className="w-[180px] h-auto">
            <img
              src="/logo.png"
              alt="5Pets Logo"
              className="w-full h-full"
            />
          </div>
          <div className="flex items-center gap-12">
            <Link className="text-[16px] font-bold text-[#003459]" href="/">Trang chủ</Link>
            <NavigationMenu viewport={false} className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {categoryList.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.children.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent px-2 py-1.5 font-medium text-muted-foreground hover:text-primary *:[svg]:-me-0.5 *:[svg]:size-3.5">
                          <NavigationMenuLink href={`/category/${item.id}`} className="text-[16px] font-bold text-[#003459]">{item.name}</NavigationMenuLink>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="z-50 p-1 shadow-lg border border-gray-200 data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16!">
                          <ul
                            className={cn(
                              "min-w-64"
                            )}
                          >
                            {item.children.map((child, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink
                                  href={`/category/${child.id}`}
                                  className="py-1.5"
                                >
                                  {child.name}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={`/category/${item.id}`}
                        className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                      >
                        {item.name}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Link className="text-[16px] font-bold text-[#003459]" href="#">Giới thiệu</Link>
          </div>
          <div className="flex items-center gap-3.5">
            <HeaderSearch />
            <Button onClick={() => router.push("/admin/account/login")} className="bg-[#003459] hover:bg-[#001e33] rounded-[57px] font-bold">Admin Dashboard</Button>
          </div>
        </div>
        <div className="absolute top-0 left-0 z-0 h-4/5 w-auto overflow-hidden">
          <img
            src="/itemHeader.svg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}