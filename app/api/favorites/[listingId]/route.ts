import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  // check if the session exists
  const user = await getCurrentUser();

  if (!user) return NextResponse.error();

  const { listingId } = params;

  // check if the listing is valid
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Listing Id");
  }

  let favoriteIds = [...(user.favouriteIds || [])];

  favoriteIds.push(listingId);

  const returnedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      favouriteIds: favoriteIds,
    },
  });

  return NextResponse.json(returnedUser);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  // check if the session exists
  const user = await getCurrentUser();

  if (!user) return NextResponse.error();

  const { listingId } = params;

  // check if the listing is valid
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Listing Id");
  }

  let favoriteIds = [...(user.favouriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => listingId !== id);
  
  const returnedUser = await prisma.user.update({
    where: {
        id: user.id
    }, data: {
        favouriteIds: favoriteIds
    }
  });
  
  return NextResponse.json(returnedUser);
}
