import { ContactBox } from "./components/ContactBox";
import { NavBar } from "./components/NavBar";
import { PolicyTerm } from "./components/PolicyTerm";

export const Footer = () => {
  
  return (
    <>
      <div className="bg-[#FCEED5] rounded-t-[40px]">
        <div className="container mx-auto pt-20">
          <ContactBox />
          <NavBar />
          <PolicyTerm />
        </div>
      </div>
    </>
  );
}