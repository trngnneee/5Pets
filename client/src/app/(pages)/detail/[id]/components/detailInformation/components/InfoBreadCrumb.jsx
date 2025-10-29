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
import React from "react"

export const InfoBreadCrumb = () => {
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

          {pathSegments.map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const displayName =
              decodeURIComponent(segment)
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <React.Fragment key={href}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{displayName}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}