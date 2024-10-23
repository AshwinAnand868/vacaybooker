'use client';

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {

  const searchModal = useSearchModal();
  const params = useSearchParams();

  const locationValue = params?.get('location');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const { getByValue } = useCountries();

  const locationLabel = useMemo(() => {

    if(locationValue) {
      return getByValue(locationValue)?.label;
    } else {
      return 'Anywhere';
    }

  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if(startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let duration = differenceInDays(start, end);

      if(duration === 0) {
        duration = 1;
      }

      return `${duration} Day(s)`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if(guestCount) {
      return `${guestCount} Guest(s)`;
    }

    return 'Add Guests';
  }, [guestCount])


  return (
    <div onClick={searchModal.onOpen}
      className="
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
        "
    >
      <div
        className="
            flex
            justify-between
            items-center
        "
      >
        <div
          className="
                text-sm
                font-semibold
                px-6
            "
        >
          {locationLabel}
        </div>
        <div
          className="
            hidden
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {durationLabel}
        </div>
        <div className="
          text-sm
          pl-6
          pr-2
          text-gray-600
          flex
          flex-row
          items-center
          gap-3
        ">
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
              p-2
              bg-rose-500
              rounded-full
              text-white
            ">
              <BiSearch size={18}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
