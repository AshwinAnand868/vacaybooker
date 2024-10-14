"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface FavouritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser;
}

const FavouritesClient = ({ listings, currentUser }: FavouritesClientProps) => {
  return (
    <Container>
      <Heading
        title="Your Favourites"
        subtitle="Take a look at all your favourites listings below!"
      />

      <div
        className="
        mt-10 
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-6
        gap-8"
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id} // making every listing card unique
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;
