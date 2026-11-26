"use client"

import Link from "next/link";
import { HeaderSearch } from "./components/HeaderSearch";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { clientCategoryList } from "@/lib/clientAPI/category";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { History, Menu, ShoppingCart, X } from "lucide-react";
import { CART_UPDATED_EVENT, getCart } from "@/helper/cartHelper";

// Lưu ý: thứ tự các <button> trong header được bộ test Katalon dựa vào
// (nút giỏ hàng phải đứng ngay sau "Admin Dashboard"). Nút menu mobile đặt cuối cùng.
export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [categoryList, setCategoryList] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promise = await clientCategoryList();
        if (promise.code == "success") {
          setCategoryList(promise.data);
        }
      } catch {
        setCategoryList([]);
      }
    };
    fetchData();
  }, []);

  // Đồng bộ số lượng giỏ hàng (kể cả khi thay đổi ở tab khác)
  useEffect(() => {
    const syncCart = () => setCartCount(getCart().length);
    syncCart();
    window.addEventListener(CART_UPDATED_EVENT, syncCart);
    window.addEventListener("storage", syncCart);
    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  // Đóng menu mobile khi chuyển trang hoặc bấm Esc
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const isActiveCategory = (item) => {
    if (pathname === `/category/${item.id}`) return true;
    return item.children?.some((child) => pathname === `/category/${child.id}`);
  };

  const navLinkClass = "text-[16px] font-bold text-[var(--main-color)] rounded-sm underline-offset-8 decoration-2 hover:underline aria-[current=page]:underline";

  return (
    <>
      <header className="bg-[#FCEED5] py-7 max-md:py-4 relative overflow-x-clip">
        <div className="container mx-auto flex justify-between items-center gap-4 relative z-10">
          <div className="w-[180px] max-md:w-[120px] h-auto shrink-0" data-aos="zoom-in" data-aos-delay="200">
            <Link href="/" aria-label="5Pets - Trang chủ" className="block rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
              <img
                src="/logo.png"
                alt="5Pets Logo"
                className="w-full h-full"
              />
            </Link>
          </div>
          <nav aria-label="Điều hướng chính" className="flex items-center gap-12 max-md:hidden" data-aos="fade-down" data-aos-delay="100">
            <Link
              className={navLinkClass}
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Trang chủ
            </Link>
            <NavigationMenu viewport={false} className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {categoryList.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    {item.children.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent px-2 py-1.5 font-medium text-muted-foreground hover:text-primary *:[svg]:-me-0.5 *:[svg]:size-3.5">
                          <NavigationMenuLink
                            href={`/category/${item.id}`}
                            aria-current={isActiveCategory(item) ? "page" : undefined}
                            className={navLinkClass}
                          >
                            {item.name}
                          </NavigationMenuLink>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="z-50 p-1 shadow-lg border border-gray-200 data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16!">
                          <ul
                            className={cn(
                              "min-w-64"
                            )}
                          >
                            {item.children.map((child, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink
                                  href={`/category/${child.id}`}
                                  aria-current={pathname === `/category/${child.id}` ? "page" : undefined}
                                  className="py-1.5 aria-[current=page]:font-semibold aria-[current=page]:text-[var(--main-color)]"
                                >
                                  {child.name}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink
                        href={`/category/${item.id}`}
                        aria-current={isActiveCategory(item) ? "page" : undefined}
                        className={cn("py-1.5", navLinkClass)}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          <div className="flex items-center gap-3.5 max-md:gap-2" data-aos="fade-down" data-aos-delay="100">
            <HeaderSearch className="max-md:hidden" />
            <Button onClick={() => router.push("/admin/account/login")} className="bg-[var(--main-color)] hover:bg-[#001e33] rounded-[57px] font-bold max-md:hidden">Admin Dashboard</Button>
            <Button
              onClick={() => router.push("/cart")}
              aria-label={cartCount > 0 ? `Giỏ hàng (${cartCount} sản phẩm)` : "Giỏ hàng"}
              title="Giỏ hàng"
              className="relative bg-[var(--main-color)] hover:bg-[#001e33] rounded-[57px] font-bold"
            >
              <ShoppingCart aria-hidden="true" />
              {cartCount > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 -right-1.5 flex min-w-5 h-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold leading-none text-[var(--main-color)] ring-2 ring-[var(--main-color)] tabular-nums"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Button>
            <Button
              onClick={() => router.push("/order")}
              aria-label="Tra cứu đơn hàng"
              title="Tra cứu đơn hàng"
              className="bg-[var(--main-color)] hover:bg-[#001e33] rounded-[57px] font-bold"
            >
              <History aria-hidden="true" />
            </Button>
            <Button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              variant="outline"
              className="md:hidden rounded-[57px] border-[var(--main-color)] bg-transparent text-[var(--main-color)] hover:bg-white/60"
            >
              {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <div id="mobile-menu" className="md:hidden container mx-auto relative z-10 mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="rounded-2xl bg-white p-4 shadow-xl">
              <HeaderSearch id="search-mobile" />
              <nav aria-label="Điều hướng di động" className="mt-4 flex flex-col">
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  className="rounded-lg px-3 py-2.5 font-bold text-[var(--main-color)] hover:bg-[#FCEED5] aria-[current=page]:bg-[#FCEED5]"
                >
                  Trang chủ
                </Link>
                {categoryList.map((item) => (
                  <div key={item.id}>
                    <Link
                      href={`/category/${item.id}`}
                      aria-current={pathname === `/category/${item.id}` ? "page" : undefined}
                      className="block rounded-lg px-3 py-2.5 font-bold text-[var(--main-color)] hover:bg-[#FCEED5] aria-[current=page]:bg-[#FCEED5]"
                    >
                      {item.name}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/category/${child.id}`}
                        aria-current={pathname === `/category/${child.id}` ? "page" : undefined}
                        className="block rounded-lg py-2 pl-7 pr-3 text-sm text-[#00171F] hover:bg-[#FCEED5] aria-[current=page]:bg-[#FCEED5] aria-[current=page]:font-semibold"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ))}
                <Link
                  href="/admin/account/login"
                  className="mt-3 rounded-[57px] bg-[var(--main-color)] px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-[#001e33]"
                >
                  Admin Dashboard
                </Link>
              </nav>
            </div>
          </div>
        )}

        <div className="absolute top-0 left-0 z-0 h-4/5 w-auto overflow-hidden" aria-hidden="true">
          <img
            src="/itemHeader.svg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </header>
    </>
  );
}
