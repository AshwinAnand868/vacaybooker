'use client';

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}


const EmptyState = ({
    title = "Oops, No exact matches.",
    subtitle = "Please try changing or removing some of the selected filters.",
    showReset
}: EmptyStateProps) => {

    const router = useRouter();


  return (
    <div className="
        h-[60vh]
        flex
        flex-col
        items-center
        justify-center
        gap-2
    ">

        <Heading
            title={title}
            subtitle={subtitle}
            center
        />

        <div className="w-48 mt-4">
            {showReset && (
                <Button
                    outline
                    label="Remove all filters"
                    onClick={() => router.push('/')}
                />
            )}
        </div>
    </div>
  )
}

export default EmptyState