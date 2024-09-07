'use client'

import { IconType } from "react-icons"

interface CategoryInputProps {
    onClick: (value: string) => void,
    selected?: boolean,
    label: string,
    icon: IconType
}


const CategoryInput = ({
    icon: Icon, // Icon is an alias for icon to be used as a component here
    label,
    selected,
    onClick
}: CategoryInputProps) => {
  return (
    <div 
        onClick={() => onClick(label)}
        className={`
            rounded-xl
            border-2
            flex
            flex-col
            p-4
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
        `}
    >
        <Icon size={30} />
        <div className="font-semibold">
            {label}
        </div>
    </div>
  )
}

export default CategoryInput