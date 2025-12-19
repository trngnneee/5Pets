import Chatbot from "./components/ChatBot/ChatBot";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <Chatbot />
      <Header />
      {children}
      <Footer />
    </>
  );
}
