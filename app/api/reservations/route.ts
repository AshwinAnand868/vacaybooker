import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const body = await req.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice
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
                    userId: currentUser.id,
                    totalPrice: totalPrice,
                    startDate: startDate,
                    endDate: endDate,
                }
            }
        }
    });

    return NextResponse.json(listingAndReservation);
}