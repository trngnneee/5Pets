import { Suspense } from "react";
import OrderTable from "./components/OrderTable";

export default function AdminOrderPage(){
  return (
    <>
      <div className="mt-6">
        <Suspense fallback={<div>Loading...</div>}>
          <OrderTable />
        </Suspense>
      </div>
    </>
  )
}