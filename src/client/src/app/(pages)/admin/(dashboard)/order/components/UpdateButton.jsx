"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { orderStatusVariable } from "@/config/variable"
import { adminOrderUpdate } from "@/lib/adminAPI/order"
import { Pen } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export const UpdateButton = ({ id }) => {
  const [status, setStatus] = useState("");
  
  const handleUpdateStatus = () => {
    if (status == "")
    {
      toast.error("Vui lòng chọn trạng thái cần cập nhật");
      return;
    }

    const finalData = {
      status:  status,
      order_id: id
    };

    const promise = adminOrderUpdate(finalData);
    toast.promise(promise, {
      loading: "Đang cập nhật trạng thái đơn hàng...",
      success: (data) => {
        if (data.code == "success")
        {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return data.message;
        }
        else return Promise.reject(data.message);
      },
      error: (err) => `Cập nhật trạng thái đơn hàng thất bại: ${err.message}`
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-[var(--main-color)] hover:bg-[var(--main-hover)]">
            <Pen />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={e => e.preventDefault()}>
            <AlertDialog>
              <AlertDialogTrigger>
                Thay đổi trạng thái đơn hàng
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Thay đổi trạng thái đơn hàng</AlertDialogTitle>
                </AlertDialogHeader>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái cần cập nhật"/>
                  </SelectTrigger>
                  <SelectContent>
                    {orderStatusVariable.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleUpdateStatus}>Xác nhận</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Thay đổi thông tin khách hàng</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}