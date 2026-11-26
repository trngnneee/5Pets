import { Skeleton } from "@/components/ui/skeleton";
import { Inbox } from "lucide-react";

// Hàng skeleton hiển thị trong lúc đang tải dữ liệu bảng
export const TableLoadingRows = ({ columns, rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b" aria-hidden="true">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="p-3">
              <Skeleton className="h-4 w-full max-w-[160px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

// Hàng thông báo khi bảng không có dữ liệu
export const TableEmptyRow = ({ columns, message = "Chưa có dữ liệu", description }) => {
  return (
    <tr>
      <td colSpan={columns} className="p-10 text-center">
        <div className="flex flex-col items-center gap-2 text-gray-500">
          <Inbox className="size-8 text-gray-300" aria-hidden="true" />
          <div className="font-medium text-gray-600">{message}</div>
          {description && <div className="text-xs text-gray-500">{description}</div>}
        </div>
      </td>
    </tr>
  );
};
