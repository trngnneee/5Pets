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
import React, { useEffect, useState } from "react"
import { categoryBreadcrumbs } from "@/lib/clientAPI/breadcrumb"

export const SectionBreadcrumb = ({ id }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await categoryBreadcrumbs(id);
        if (promise.code == "success")
        {
          setBreadcrumbs(promise.data);
        }
      } catch {
        setBreadcrumbs([]);
      }
    }
    fetchData();
  }, [id])

  return (
    <div className="container mx-auto my-[9px]">
      <Breadcrumb aria-label="Đường dẫn">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <HomeIcon size={16} aria-hidden="true" />
              <span className="sr-only">Trang chủ</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {breadcrumbs.length > 0 && breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={`/category/${item.id}`}>{item.name}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}