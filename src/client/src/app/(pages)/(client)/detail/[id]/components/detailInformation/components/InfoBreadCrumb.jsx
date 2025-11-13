"use client"

import { HomeIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { petBreadcrumbs } from "@/lib/clientAPI/breadcrumb"
import { set } from "date-fns"

export const InfoBreadCrumb = () => {
  const pathname = usePathname();
  const id = pathname.split("/").slice(-1);
  const [pathName, setPathName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promise = await petBreadcrumbs(id);
      if (promise.code == "success") {
        setPathName(promise.data);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <HomeIcon size={16} aria-hidden="true" />
              <span className="sr-only">Trang chủ</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {pathName && pathName.map((item, index) => {
            const isLast = index === pathName.length - 1;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/category/${item.id}`}>{item.name}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < pathName.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}