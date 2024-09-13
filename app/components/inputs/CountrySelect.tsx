'use client';

import useCountries from "@/app/hooks/useCountries";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({
  value,
  onChange
}: CountrySelectProps) => {

  const { getAll } = useCountries();
  

  return (
    <div>
      <Select
        onChange={(value) => {
          onChange(value as CountrySelectValue);
        }}
        menuShouldScrollIntoView={false}
        options={getAll()}
        placeholder="Anywhere"
        isClearable
        value={value}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>
              <ReactCountryFlag 
                className="emojiFlag"
                countryCode={option.value}
                style={{
                    fontSize: '1.5em',
                    lineHeight: '1.5em',
                }}
                svg
              />
            </div>
            <div>
              {option.label}, 
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2 z-[10]",
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  )
}

export default CountrySelect