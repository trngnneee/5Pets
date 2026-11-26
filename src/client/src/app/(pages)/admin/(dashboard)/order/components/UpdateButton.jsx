"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { OrderStatusBadge } from "@/components/OrderStatusBadge"
import { orderStatusVariable } from "@/config/variable"
import { adminOrderUpdate } from "@/lib/adminAPI/order"
import { Pen } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export const UpdateButton = ({ id, currentStatus = "" }) => {
  const [status, setStatus] = useState(currentStatus);
  const selectId = `order-status-${id}`;

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
      error: (err) => `Cập nhật trạng thái đơn hàng thất bại: ${err?.message || err}`
    })
  }

  return (
    <>
      <AlertDialog
        onOpenChange={(open) => {
          // Mỗi lần mở lại, chọn sẵn trạng thái hiện tại
          if (open) setStatus(currentStatus);
        }}
      >
        <AlertDialogTrigger asChild>
          <Button
            aria-label="Cập nhật trạng thái"
            title="Cập nhật trạng thái"
            className="bg-[var(--main-color)] hover:bg-[var(--main-hover)]"
          >
            <Pen aria-hidden="true" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Thay đổi trạng thái đơn hàng</AlertDialogTitle>
            <AlertDialogDescription>
              Trạng thái hiện tại: <OrderStatusBadge status={currentStatus} className="align-middle" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2">
            <Label htmlFor={selectId}>Trạng thái mới</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id={selectId} className="w-full">
                <SelectValue placeholder="Chọn trạng thái cần cập nhật"/>
              </SelectTrigger>
              <SelectContent>
                {orderStatusVariable.map((item) => (
                  <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpdateStatus}
              disabled={!status || status === currentStatus}
            >
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
