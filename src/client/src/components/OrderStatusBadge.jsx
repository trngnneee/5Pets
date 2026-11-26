import { CheckCircle2, Clock, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { orderStatusVariable } from "@/config/variable";

// Mỗi trạng thái có màu + icon riêng để không phụ thuộc vào màu sắc
const STATUS_STYLE = {
  pending: {
    Icon: Clock,
    className: "bg-amber-50 text-amber-800 border-amber-200",
  },
  shipping: {
    Icon: Truck,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  delivered: {
    Icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export const OrderStatusBadge = ({ status, className }) => {
  const style = STATUS_STYLE[status];
  const label = orderStatusVariable.find((item) => item.value === status)?.label || status || "—";
  const Icon = style?.Icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium",
        style?.className || "bg-gray-50 text-gray-600 border-gray-200",
        className
      )}
    >
      {Icon && <Icon className="size-3.5" aria-hidden="true" />}
      {label}
    </span>
  );
};
