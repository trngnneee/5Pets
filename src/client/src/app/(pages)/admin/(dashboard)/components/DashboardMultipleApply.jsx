import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, CircleAlertIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const DashboardMultipleApply = ({ itemsToDelete, api }) => {
  const [status, setStatus] = useState("");
  const selectedCount = itemsToDelete?.length || 0;
  const canApply = status === "delete" && selectedCount > 0;

  const handleDeleteAll = () => {
    if (canApply) {
      const promise = fetch(api, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idList: itemsToDelete }),
        credentials: "include"
      }).then(res => {
        if (!res.ok) {
          throw new Error("Xóa không thành công. Vui lòng thử lại.");
        }
        return res.json();
      });

      toast.promise(promise, {
        loading: "Đang xóa...",
        success: (data) => {
          window.location.reload();
          return data.message;
        },
        error: (data) => {
          return data.message;
        },
      });
    }
    else {
      toast.error("Vui lòng chọn hành động và phần tử để xóa.");
    }
  }

  return (
    <>
      <div className="bg-white rounded-[14px] border-[0.6px] border-[#D5D5D5] text-sm font-medium overflow-hidden flex items-center justify-between w-[300px] shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex justify-center w-full items-center">
            <Button
              type="button"
              aria-label={`Chọn hành động hàng loạt. Đã chọn ${selectedCount} mục`}
              className="flex justify-center items-center gap-2 p-4 bg-white hover:bg-[#F5F6FA] rounded-none shadow-none text-[var(--main-color)]"
            >
              <div className="">{status ? "Xóa" : "-- Hành động --"}</div>
              {selectedCount > 0 && (
                <span className="rounded-full bg-[var(--main-color)] px-1.5 text-[11px] leading-5 text-white tabular-nums" aria-hidden="true">
                  {selectedCount}
                </span>
              )}
              <ChevronDownIcon
                className="-me-1 opacity-60"
                size={16}
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => { setStatus("") }}>-- Hành động --</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setStatus("delete") }}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              disabled={!canApply}
              title={!canApply ? "Chọn hành động và ít nhất một mục" : undefined}
              className="w-1/2 bg-white hover:bg-red-50 text-red-600 shadow-none rounded-none border-l border-[#D5D5D5] font-semibold"
            >
              Áp dụng
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
              <div
                className="flex size-9 shrink-0 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600"
                aria-hidden="true"
              >
                <CircleAlertIcon size={16} />
              </div>
              <AlertDialogHeader>
                <AlertDialogTitle>Xóa {selectedCount} mục đã chọn?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAll} className="bg-destructive text-white hover:bg-destructive/90">Xác nhận</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}
