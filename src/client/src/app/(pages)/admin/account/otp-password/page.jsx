import { Suspense } from "react";
import { MainContent } from "./components/MainContent";

export default function AdminOTPPasswordPage(){
  return (
    <>
      <Suspense>
        <MainContent />
      </Suspense>
    </>
  )
}