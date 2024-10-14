'use client';

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types";

interface PropertiesClientProps {
    currentUser?: SafeUser;
    properties: SafeListing[]
}

const PropertiesClient = ({
    properties,
    currentUser
}: PropertiesClientProps) => {
    return (
        <Container>
          <Heading
            title="Your Properties"
            subtitle="Take a look at your properties below!"
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
            {properties.map((property) => (
              <ListingCard
                key={property.id} // making every listing card unique
                data={property}
                currentUser={currentUser}
              />
            ))}
          </div>
        </Container>
    );
} 

export default PropertiesClient;