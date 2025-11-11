import { InitialUserTable } from "./components/InitialUserTable";
import { UserTable } from "./components/UserTable";

export default function AdminUser(){
  return (
    <>
      <div>
        <InitialUserTable />
        <UserTable />
      </div>
    </>
  )
}