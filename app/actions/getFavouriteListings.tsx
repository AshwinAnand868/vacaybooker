import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    // fetch all the user's favourite listings from the listing table
    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });

    const safeFavourites = favourites.map((favourite) => {
      return {
        ...favourite,
        createdAt: favourite.createdAt.toISOString(),
      };
    });

    return safeFavourites;
  } catch (error: any) {
    throw new Error(error);
  }
}
