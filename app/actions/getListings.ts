import prisma from "@/app/libs/prismadb";

export default async function getListings() {
    try {

        // all listings in the database
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return listings;
    } catch(error: any) {
        throw new Error(error);
    }
}