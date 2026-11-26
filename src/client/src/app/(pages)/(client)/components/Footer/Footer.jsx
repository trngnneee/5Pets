import { ContactBox } from "./components/ContactBox";
import { NavBar } from "./components/NavBar";
import { PolicyTerm } from "./components/PolicyTerm";

export const Footer = () => {

  return (
    <>
      <footer className="bg-[#FCEED5] rounded-t-[40px]">
        <div className="container mx-auto pt-20 max-md:pt-10">
          <ContactBox />
          <NavBar />
          <PolicyTerm />
        </div>
      </footer>
    </>
  );
}
