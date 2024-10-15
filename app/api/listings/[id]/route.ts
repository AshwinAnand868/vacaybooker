import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    id: string;
}

export async function DELETE(req: Request,  params: IParams) {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    const { id } = params;

    if(!id || typeof id === 'string') {
        throw new Error('Invalid ID');
    }

    const property = await prisma.listing.deleteMany({
        where: {
            id: id,
            userId: currentUser.id
        }
    });

    return NextResponse.json(property);
}