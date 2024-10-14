"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeReservation, SafeUser } from "../types";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser;
}

const ReservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback((id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation successfully deleted");
        router.refresh();
      })
      .catch(() => {
        toast.error("Unable to delete the reservation");
      })
      .finally(() => {
        setDeletingId("");
      });
  }, []);

  return (
    <Container>
      <Heading
        title="Reservations on your listings"
        subtitle="These are the reservations that your guests have made on your properties"
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
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id} // making every listing card unique
            data={reservation.listing}
            actionId={reservation.id}
            actionLabel="Cancel guest reservation"
            onAction={onCancel}
            currentUser={currentUser}
            disabled={deletingId === reservation.id}
            reservation={reservation}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
