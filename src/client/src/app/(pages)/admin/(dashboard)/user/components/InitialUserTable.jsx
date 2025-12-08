"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { adminAccountApprove, adminAccountList } from "@/lib/adminAPI/account"
import { toastHandler } from "@/lib/toastHandler"
import { Check, CircleAlertIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const InitialUserTable = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promise = await adminAccountList();
      if (promise.code == "success") {
        setUserList(promise.data);
      }
    }
    fetchData();
  }, [])

  const handleApprove = (userId) => {
    const promise = adminAccountApprove(userId);
    toast.promise(promise, {
      loading: "Đang duyệt tài khoản...",
      success: (res) => {
        if (res.code == "success") {
          window.location.reload();
          return res.message;
        }
      },
      error: (err) => toastHandler("error", err.message || "Đã có lỗi xảy ra khi duyệt tài khoản.")
    })
  }

  return (
    <>
      <div className="text-[24px] font-bold text-gray-600 mt-[30px]">Danh sách tài khoản chờ duyệt</div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="p-3 w-10">
                <Checkbox
                  className="data-[state=checked]:bg-[var(--main-color)]"
                // checked={isAllChecked}
                // onCheckedChange={handleCheckAll}
                />
              </th>
              <th className="p-3 text-left">Tên người dùng</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Duyệt tài khoản</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 &&
              userList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 text-center">
                    <Checkbox
                      className="data-[state=checked]:bg-[var(--main-color)]"
                    // checked={itemsToDelete.includes(item.id)}
                    // onCheckedChange={(checked) => handleCheckItem(checked, item.id)}
                    />
                  </td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3 flex items-center justify-center gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] text-white">
                          <Check />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                          <div
                            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                            aria-hidden="true"
                          >
                            <CircleAlertIcon className="opacity-80" size={16} />
                          </div>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Duyệt tài khoản này</AlertDialogTitle>
                            <AlertDialogDescription>
                              Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleApprove(item.id)}>Xác nhận</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}