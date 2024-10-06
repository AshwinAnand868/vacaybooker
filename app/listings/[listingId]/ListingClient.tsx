'use client'

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
}

const ListingClient = ({
    reservations,
    listing,
    currentUser
}: ListingClientProps) => {

    const category = useMemo(() => {
        return categories.find((item) => listing.category === item.label);
    }, [listing.category]);



  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    id={listing.id}
                    locationValue={listing.locationValue}
                    imageSrc={listing.imageSrc}
                    currentUser={currentUser}
                    title={listing.title}
                />

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                ">
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        bathroomCount={listing.bathroomCount}
                        guestCount={listing.guestCount}
                        locationValue={listing.locationValue}
                    />
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient