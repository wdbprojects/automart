import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";

interface FavouriteButtonProps {
  setIsFavourite: (isFavourite: boolean) => void;
  isFavourite: boolean;
  id: number;
}

const FavouriteButton = (props: FavouriteButtonProps) => {
  const { setIsFavourite, isFavourite, id } = props;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "cursor-pointer rounded-full z-10 absolute top-2.5 left-3.5 bg-slate-500/30 hover:bg-slate-500/50 dark:hover:bg-slate-400/30 gorup !h-6 !w-6 lg:!h-8 lg:!w-8 2xl:!h-10 2xl:!w-10",
      )}
      onClick={() => {}}
    >
      <HeartIcon
        className={cn(
          "fill-transparent text-white duration-200 transition-colors ease-in-out !w-3.5 !h-3.5 lg:!w-4 lg:!h-4 2xl:!w-5 2xl:!h-5",
          isFavourite ? "" : "",
        )}
      />
    </Button>
  );
};

export default FavouriteButton;
