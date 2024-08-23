'use client';

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
    icon: IconType,
    label: string,
    description: string,
    selected?: boolean
}
const CategoryBox = ({icon: Icon, label, description, selected}: CategoryBoxProps) => {

    // const [hasMounted, setHasMounted] = useState<boolean>(false);

    // useEffect(() => {
    //     setHasMounted(true);
    // }, [])

    const params = useSearchParams();
    const router = useRouter();

    const handleCallback = useCallback(() => {

        // if(!hasMounted) return;
    
        let currentQuery = {};

        if(params) {
            currentQuery = queryString.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            category: label
        };

        if(params.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = queryString.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true});

        router.push(url);
    }, [label, params, router]);
    
  return (
    <div
        className={`
            flex
            flex-col
            justify-center
            items-center
            gap-2
            p-1
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? 'border-b-neutral-800': 'border-transparent'}
            ${selected ? 'text-neutral-800': 'text-neutral-500'}
        `}

        onClick={handleCallback}
    >
        <Icon size={22} />
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}

export default CategoryBox;