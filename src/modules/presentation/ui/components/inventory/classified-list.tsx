import { use } from "react";
import { ClassifiedWithImages } from "@/config/types";
import ClassifiedCard from "./classified-card";

interface ClassifiedListProps {
  classifieds: ClassifiedWithImages[];
  // favourites?: number[];
}

const ClassifiedList = ({ classifieds }: ClassifiedListProps) => {
  // const inventory = use(classifieds);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-4 px-4 min-w-fit">
      {classifieds.map((classified: any) => {
        return <ClassifiedCard key={classified.id} classified={classified} />;
      })}
    </div>
  );
};

export default ClassifiedList;
