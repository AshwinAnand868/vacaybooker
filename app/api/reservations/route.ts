import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    // const currentUser = await getCurrentUser();

    // if(!currentUser) {
    //     return NextResponse.error();
    // }
    const body = await req.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice,
        userId
    } = body;

    if(!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        }, data: {
            reservations: {
                create: {
                    userId: userId,
                    totalPrice: Number(totalPrice),
                    startDate: startDate,
                    endDate: endDate,
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}