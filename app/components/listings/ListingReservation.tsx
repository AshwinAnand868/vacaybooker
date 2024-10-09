'use client';

import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';

interface ListingReservationProps {
    disabledDates: Date[];
    price: number;
    totalPrice: number;
    dateRange: Range;
    onSubmit: () => void;
    onChangeDate: (value: Range) => void;
    disabled?: boolean;
}

const ListingReservation = ({
    price,
    totalPrice,
    disabledDates,
    dateRange,
    onSubmit,
    onChangeDate,
    disabled
}: ListingReservationProps) => {
  return (
    <div className='
        bg-white
        border-neutral-200
        rounded-xl
        border-[1px]
        overflow-hidden
    '>
        <div className='
            flex flex-row gap-1 p-4
        '>
            <div className='font-semibold text-2xl'>
                {price}
            </div>
            <div className='font-light text-neutral-600'>
                night
            </div>
        </div>
        <hr />
         <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
         />
    </div>
  )
}

export default ListingReservation