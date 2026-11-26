"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { adminAccountApprove, adminAccountList } from "@/lib/adminAPI/account"
import { Check, CircleAlertIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { TableEmptyRow, TableLoadingRows } from "../../components/TableStateRows"

const COLUMN_COUNT = 3;

export const InitialUserTable = () => {
  const [userList, setUserList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await adminAccountList();
        if (promise.code == "success") {
          setUserList(promise.data);
        }
      } finally {
        setLoaded(true);
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
        }
        return res.message;
      },
      error: (err) => err?.message || "Đã có lỗi xảy ra khi duyệt tài khoản."
    })
  }

  return (
    <>
      <h2 className="text-[24px] font-bold text-gray-600 mt-[30px]">
        Danh sách tài khoản chờ duyệt
        {loaded && userList.length > 0 && (
          <span className="ml-2 align-middle rounded-full bg-amber-100 px-2 py-0.5 text-sm font-semibold text-amber-800 tabular-nums">
            {userList.length}
          </span>
        )}
      </h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="p-3 text-left">Tên người dùng</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Duyệt tài khoản</th>
            </tr>
          </thead>
          <tbody>
            {!loaded && <TableLoadingRows columns={COLUMN_COUNT} rows={3} />}
            {loaded && userList.length === 0 && (
              <TableEmptyRow columns={COLUMN_COUNT} message="Không có tài khoản nào chờ duyệt" />
            )}
            {loaded && userList.length > 0 &&
              userList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-gray-800">{item.name}</td>
                  <td className="p-3 break-all">{item.email}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            aria-label={`Duyệt tài khoản ${item.name}`}
                            title="Duyệt tài khoản"
                            className="bg-[var(--main-color)] hover:bg-[var(--main-hover)] text-white"
                          >
                            <Check aria-hidden="true" />
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
                              <AlertDialogTitle>Duyệt tài khoản {item.name}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tài khoản {item.email} sẽ có quyền truy cập trang quản trị. Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                          </div>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleApprove(item.id)}>Xác nhận</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
