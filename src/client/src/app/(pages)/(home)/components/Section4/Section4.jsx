import { NewsItem } from "./components/NewsItem";
import { SectionHeader } from "./components/SectionHeader";

export const Section4 = () => {
  return (
    <div className="container mx-auto mb-[60px]">
      <SectionHeader/>
      <div className="grid grid-cols-3 gap-7">
        <NewsItem/>
        <NewsItem/>
        <NewsItem/>
      </div>
    </div>
  );
}