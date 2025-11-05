import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useAdmin } from "@/context/AdminContext";

export const DashboardHeader = () => {
  const { userInfo } = useAdmin();

  return (
    <>
      <div className="bg-white h-20 flex items-center border-b border-b-[#E0E0E0]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="w-[200px] h-auto overflow-hidden">
            <img
              src="/logo.png"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2.5">
            <Avatar
              className="w-11 h-11"
            >
              <AvatarImage src="/dog1.jpg" alt="Kelly King" />
              <AvatarFallback>Admin</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-sm text-[var(--main-color)]">{userInfo?.fullname}</div>
              <div className="text-[#565656] font-semibold text-[12px]">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}