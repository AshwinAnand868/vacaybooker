import prisma from "@/app/libs/prismadb";

export default async function getReservations({
  listingId,
  userId,
  authorId,
}: {
  listingId?: string;
  authorId?: string;
  userId?: string;
}) {
  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (authorId) {
      query.listing = { userId: authorId }; // nested queries in prisma
    }

    if (userId) {
      query.userId = userId;
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // technically, we could return all reservations here, but the problem could occur due to date objects in Listing, so it is best to return safe type
    // return reservations;

    const safeReservations = reservations.map((reservation) => {
      return {
        ...reservation,
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing: {
          ...reservation.listing,
          createdAt: reservation.listing.createdAt.toISOString(),
        },
      };
    });

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
