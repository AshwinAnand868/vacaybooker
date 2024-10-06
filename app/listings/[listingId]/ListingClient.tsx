import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";

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
  return (
    <div>ListingClient</div>
  )
}

export default ListingClient