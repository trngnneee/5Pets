"use client"

import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"
import Link from "next/link"

export const AdminEditButton = ({ link, itemName }) => {
  const label = itemName ? `Chỉnh sửa ${itemName}` : "Chỉnh sửa";

  return (
    <>
      <Button asChild className="bg-[var(--main-color)] hover:bg-[var(--main-hover)]">
        <Link href={link} aria-label={label} title={label}>
          <Pen aria-hidden="true" />
        </Link>
      </Button>
    </>
  )
}
