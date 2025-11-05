"use client"

import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"
import { useRouter } from "next/navigation"

export const AdminEditButton = ({ link }) => {
  const router = useRouter();
  
  return (
    <>
      <Button onClick={() => router.push(link)} className="bg-[var(--main-color)] hover:bg-[var(--main-hover)]">
        <Pen/>
      </Button>
    </>
  )
}