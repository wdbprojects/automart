import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { endpoints } from "@/config/endpoints";

interface FavoriteButtonProps {
  setIsFavorite: (isFavorite: boolean) => void;
  isFavorite: boolean;
  id: number;
}

const FavoriteButton = (props: FavoriteButtonProps) => {
  const { isFavorite, setIsFavorite, id } = props;
  const router = useRouter();
  const handleFavorite = async () => {
    const { ids } = await api.post<{ ids: number[] }>(endpoints.favorites, {
      json: { id },
    });
    if (ids.includes(id)) setIsFavorite(true);
    else setIsFavorite(false);
    setTimeout(() => {
      router.refresh();
    }, 250);
  };

  return (
    <Button
      variant="link"
      size="icon"
      className={cn(
        "cursor-pointer absolute top-2 left-3 rounded-full z-10 group h-7 w-7",
        isFavorite ? "bg-white/80" : "bg-muted/15",
      )}
      onClick={() => {
        handleFavorite();
      }}
    >
      <Heart
        className={cn(
          "text-white w-3.5 h-3.5 duration-200 transition-colors ease-in-out",
          isFavorite
            ? "text-red-500 fill-red-500"
            : "group-hover:text-red-500 group-hover:fill-red-500",
        )}
      />
    </Button>
  );
};
export default FavoriteButton;
