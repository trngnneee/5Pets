import { cn } from "@/lib/utils";

// Trạng thái rỗng: luôn có lời nhắn + hành động tiếp theo thay vì để trống
export const EmptyState = ({ icon: Icon, title, description, action, className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center px-4 py-12 text-center", className)}>
      {Icon && (
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#FCEED5] text-[var(--main-color)]">
          <Icon className="size-7" aria-hidden="true" />
        </div>
      )}
      <div className="text-lg font-bold text-[var(--main-color)]">{title}</div>
      {description && (
        <p className="mt-1 max-w-md text-sm text-[#667479]">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};
