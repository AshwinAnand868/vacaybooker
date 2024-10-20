import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    category?: string;
    location?: string;
    roomCount?: number;
    bathroomCount?: number;
    guestCount?: number;
    startDate?: string;
    endDate?: string;
}

export default async function getListings(params: IListingsParams) {
    
    try {
        const { 
            userId,
            roomCount,
            guestCount,
            bathroomCount,
            location,
            startDate,
            endDate,
            category
         } = params;

        let query: any = {};

        if(userId) {
            query.userId = userId;
        }

        if(category) {
            query.category = category;
        }

        if(roomCount) {
            query.roomCount = {
                gte: +roomCount // shortand for converting a string to a number in JS
            };
        }

        if(bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            };
        }

        if(guestCount) {
            query.guestCount = {
                gte: +guestCount
            };
        }

        if(location) {
            query.locationValue = location;
        }

        if(startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate},
                                startDate: { lte: startDate }
                            }, 
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return safeListings;
    } catch(error: any) {
        throw new Error(error);
    }
}