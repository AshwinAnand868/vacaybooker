'use client';

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
    value: Range,
    onChange: (value: RangeKeyDict) => void;
    disabledDates?: Date[]
}

const Calendar = ({
    value,
    disabledDates,
    onChange
}: CalendarProps) => {
  return (
    <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()} // disable selection of date in the past
        disabledDates={disabledDates}
    /> 
  )
}

export default Calendar