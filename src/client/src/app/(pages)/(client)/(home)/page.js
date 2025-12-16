import { Section1 } from "./components/Section1/Setion1";
import { Section2 } from "./components/Section2/Section2";
import { Section3 } from "./components/Section3/Section3";
import { Section4 } from "./components/Section4/Section4";
import Chatbot from "@/components/ui/chatbot";

export default function Home() {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Chatbot />
    </>
  );
}
