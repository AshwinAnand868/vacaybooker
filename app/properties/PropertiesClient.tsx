'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
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

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success('Property listing deleted.');
            router.refresh();
        })
        .catch((error) => {
            // toast.error('Something went wrong. Unable to delete the listing.')
            toast.error(error?.response?.data?.error);
        })
        .finally(() => {
            setDeletingId('');
        })

    }, [router]);

    return (
        <Container>
          <Heading
            title="Your Properties"
            subtitle="List of your properties"
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
                actionId={property.id}
                actionLabel="Delete property"
                onAction={onCancel}
                disabled={deletingId === property.id}
              />
            ))}
          </div>
        </Container>
    );
} 

export default PropertiesClient;