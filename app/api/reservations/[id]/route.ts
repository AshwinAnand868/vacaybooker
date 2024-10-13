import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
    id: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    // data fetch
    const { id } = params;

    // validation of the data
    if(!id || typeof id !== 'string') {
        throw new Error('Invalid Id')
    }

    /*
      a. Delete a reseervation by:
         1. either reservation id
         OR 2. the user who reserved that place
         OR 3. the author who created the listing itself
    */
    const reservation = await prisma.reservation.delete({
        where: {
            id: id,
            OR: [
                { userId: currentUser.id },
                { listing: {userId: currentUser.id }}
            ]
        }
    });

    return NextResponse.json(reservation);
}