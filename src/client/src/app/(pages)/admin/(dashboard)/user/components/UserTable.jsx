"use client"

import { formatDate } from "@/helper/date";
import { adminGetList } from "@/lib/adminAPI/account";
import { useEffect, useState } from "react";

export const UserTable = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promise = await adminGetList();
      if (promise.code == "success") {
        setUserList(promise.data);
      }
    }
    fetchData();
  }, [])
  
  return (
    <>
      <div className="text-[24px] font-bold text-gray-600 mt-[50px]">Danh sách tài khoản</div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="p-3 text-left">Tên người dùng</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Tạo lúc</th>
              <th className="p-3 text-left">Cập nhật lúc</th>
              <th className="p-3 text-left">Người duyệt</th>
            </tr>
          </thead>
          <tbody>
            {userList.length > 0 &&
              userList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">{item.fullname}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{formatDate(item.createdAt) || "-"}</td>
                  <td className="p-3">{formatDate(item.updatedAt) || "-"}</td>
                  <td className="p-3">{item.approvedBy || "-"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}