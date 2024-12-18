'use client'

import createCheckoutSession from "@/app/actions/stripe";
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useCountries from "@/app/hooks/useCountries";
import useLoginModal from "@/app/hooks/useLoginModal";
import { getStripe } from "@/app/libs/get-stripejs";
import { SafeListing, SafeReservation, SafeUser, StripeData } from "@/app/types";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
    color: '#262626'
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser?: SafeUser | null;
}

const ListingClient = ({
    reservations = [],
    listing,
    currentUser
}: ListingClientProps) => {

    const router = useRouter();
    const loginModal = useLoginModal();
    const { getByValue } = useCountries();

    const location = getByValue(listing.locationValue);

    const disabledDates = useMemo(() => {

        // get the dates for which the place is already reserved
        let dates: Date[] = [];

        reservations.forEach(reservation => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range]
        });

        return dates;

    }, [reservations]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [totalPrice, setTotalPrice] = useState(listing.price);


    const onCreateReservation = useCallback(async () => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        // use case for creating stripe checkout here

        const stripe = await getStripe();
        if(!stripe) throw new Error('Stripe failed to initialize.');

        const data: StripeData = {
            name: listing.title,
            totalPrice: totalPrice,
            image: listing.imageSrc,
            startDate: dateRange.startDate?.toISOString()!,
            endDate: dateRange.endDate?.toISOString()!,
            listingId: listing.id,
            description: listing.description + ` in ${location?.region}, ${location?.label}`,
            userId: currentUser.id
        };

        await createCheckoutSession(data);
        
        // axios.post('/api/reservations', {
        //     totalPrice,
        //     startDate: dateRange.startDate,
        //     endDate: dateRange.endDate,
        //     listingId: listing?.id
        // }).then(() => {
        //     toast.success('Listing Reserved!!');
        //     setDateRange(initialDateRange);
        //     router.push('/trips');
        // }).catch(() => {
        //     toast.error('Something went wrong')
        // }).finally(() => {
        //     // reset the loading state
        //     setIsLoading(false);
        // })
    }, [totalPrice, dateRange, listing.id, loginModal, router, currentUser]);

    
    useEffect(() => {
        if(dateRange.endDate && dateRange.startDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if(dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }   
        }
    }, [dateRange, listing.price]);

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

                    <div className="
                        order-first
                        mb-10
                        md:order-last
                        md:col-span-3
                    ">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            disabledDates={disabledDates}
                            disabled={isLoading}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            onChangeDate={(value: Range) => setDateRange(value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient