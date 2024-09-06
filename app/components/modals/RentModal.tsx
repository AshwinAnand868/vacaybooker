'use client';

import useRentModal from "@/app/hooks/useRentModal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import Modal from "./Modal";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY); // first default step

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => {

        if(STEPS.PRICE === step) {
            return 'Create';
        }

        return 'Next';

    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(STEPS.CATEGORY === step) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[50vh]">
                {categories.map((item) => {
                    return (
                        <div key={item.label}>
                            {item.label}
                        </div>
                    )
                })}
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onSubmit={rentModal.onClose}
            onClose={rentModal.onClose}
            title="Rent your home!"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={STEPS.CATEGORY === step ? undefined: onBack}
            body={bodyContent}
        />
    )
};

export default RentModal;
