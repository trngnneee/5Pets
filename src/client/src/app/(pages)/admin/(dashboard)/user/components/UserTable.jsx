"use client"

import { formatDate } from "@/helper/date";
import { adminGetList } from "@/lib/adminAPI/account";
import { useEffect, useState } from "react";
import { TableEmptyRow, TableLoadingRows } from "../../components/TableStateRows";

const COLUMN_COUNT = 5;

export const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await adminGetList();
        if (promise.code == "success") {
          setUserList(promise.data);
        }
      } finally {
        setLoaded(true);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <h2 className="text-[24px] font-bold text-gray-600 mt-[50px]">Danh sách tài khoản</h2>
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
            {!loaded && <TableLoadingRows columns={COLUMN_COUNT} rows={3} />}
            {loaded && userList.length === 0 && (
              <TableEmptyRow columns={COLUMN_COUNT} message="Chưa có tài khoản nào" />
            )}
            {loaded && userList.length > 0 &&
              userList.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-gray-800">{item.fullname}</td>
                  <td className="p-3 break-all">{item.email}</td>
                  <td className="p-3 tabular-nums whitespace-nowrap">{formatDate(item.createdAt) || "-"}</td>
                  <td className="p-3 tabular-nums whitespace-nowrap">{formatDate(item.updatedAt) || "-"}</td>
                  <td className="p-3">{item.approvedBy || "-"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
