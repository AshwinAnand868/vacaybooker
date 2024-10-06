"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Button from "../Button";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: SafeListing;
  currentUser?: SafeUser | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionId?: string;
  actionLabel?: string;
  disabled?: boolean;
}

const ListingCard = ({
  currentUser,
  data,
  reservation,
  onAction,
  actionId = "",
  actionLabel,
  disabled,
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    
  }, [reservation]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  return <div
    onClick={() => router.push(`/listings/${data.id}`)}
    className="
      col-span-1 cursor-pointer group
    "
  >
    <div className="flex flex-col gap-2 w-full">
      <div
        className="
          aspect-square
          relative
          w-full
          rounded-xl
          overflow-hidden
        "
      >
        <Image
          fill
          alt="Listing"
          src={data.imageSrc}
          className="
            object-cover
            group-hover:scale-110
            h-full
            w-full
            transition
          "
        />

        <div className="absolute top-8 right-3">
          <HeartButton listingId={data.id} currentUser={currentUser} />
        </div>
      </div>

      <div className="font-semibold text-lg">
        {location?.region}, {location?.label}
      </div>

      <div className="font-light text-neutral-500">
        {reservationDate || data.category}
      </div>

      <div className="flex flex-row items-center gap-1">
        <div className="font-semibold">
          $ {price}
        </div>
        {!reservation && (
          <div className="font-light">night</div>
        )}
      </div>

      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          label={actionLabel}
          onClick={handleCancel}
          small
        />
      )}
    </div>
  </div>
};

export default ListingCard;