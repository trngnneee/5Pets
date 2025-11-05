import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"

export const AdminEditButton = () => {
  return (
    <>
      <Button className="bg-[var(--main-color)] hover:bg-[var(--main-hover)]">
        <Pen/>
      </Button>
    </>
  )
}