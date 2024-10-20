'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Modal from "./Modal";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {

    const searchModal = useSearchModal();
    const router = useRouter();
    const params = useSearchParams();

    const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
    const [location, setLocation] = useState<CountrySelectValue>();
    const [guestCount, setGuestCount] = useState<number>(1);
    const [bathroomCount, setBathroomCount] = useState<number>(1);
    const [roomCount, setRoomCount] = useState<number>(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, [])

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    },[]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO) {
            return 'Search';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.LOCATION) {
            return undefined;
        }

        return 'Back';
    }, [step]);


    const onSubmit = useCallback( async () => {
        if(step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if(params) {
           currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            location: location?.value,
            guestCount: guestCount,
            roomCount: roomCount,
            bathroomCount // shortcut to write rather than bathroomCount: bathroomCount explicitly
        };

        if(dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {
            skipNull: true
        });

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
        router.refresh();
    }, [
        step,
        searchModal,
        router,
        params,
        dateRange,
        location,
        guestCount,
        bathroomCount,
        roomCount,
        onNext
    ]);
    


    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />

            <CountrySelect 
                value={location}
                onChange={(location) => setLocation(location as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );


    if(step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="When do you plan to go?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />

                <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }



  return (
    <Modal
        isOpen={searchModal.isOpen}
        onClose={searchModal.onClose}
        onSubmit={onSubmit}
        title="Filters"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        body={bodyContent}
        secondaryAction={STEPS.LOCATION === step ? undefined: onBack}
    />
  )
}

export default SearchModal;