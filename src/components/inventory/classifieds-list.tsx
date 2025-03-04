import { ClassifiedWithImages, Favorites } from "@/config/types";
import ClassifiedCard from "@/components/inventory/classified-card";

interface ClassifiedsListProps {
  classifieds: ClassifiedWithImages[];
  favorites: number[];
}

const ClassifiedsList = (props: ClassifiedsListProps) => {
  const { classifieds, favorites } = props;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {classifieds.map((classified) => {
        return (
          <ClassifiedCard
            key={classified.id}
            classified={classified}
            favorites={favorites}
          />
        );
      })}
    </div>
  );
};
export default ClassifiedsList;
