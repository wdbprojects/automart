import { routes } from "@/config/routes";
import { Favorites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { setSourceId } from "@/lib/source-ids";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validateIdSchema = z.object({
  id: z.number().int(),
});

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { data, error } = validateIdSchema.safeParse(body);
  if (!data) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
  if (typeof data.id !== "number") {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  // NOTE: get the source id from cookies
  const sourceId = await setSourceId();

  // NOTE: retrieve existing favorites from redis session
  const storedFavorites = await redis.get<Favorites>(sourceId);

  const favorites: Favorites = storedFavorites || { ids: [] };

  // NOTE: add or remove the ID based on the current presence in the favorites
  if (favorites.ids.includes(data.id)) {
    // NOTE: remove the id if it already exists
    favorites.ids = favorites.ids.filter((favId) => {
      return favId !== data.id;
    });
  } else {
    // NOTE: add ID if it does not exist
    favorites.ids.push(data.id);
  }

  // NOTE: update the Redis store with the new list of ids
  await redis.set(sourceId, favorites);
  revalidatePath(routes.favorites);
  return NextResponse.json({ ids: favorites.ids }, { status: 200 });
};
