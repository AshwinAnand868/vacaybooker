'use client';

import useRentModal from "@/app/hooks/useRentModal";
import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
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

    const [step, setStep] = useState(STEPS.CATEGORY); // first default step in the modal process

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');

    // expect id to be string type, but value can be of any type for this form
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


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
        <div className="flex flex-col gap-8 p-2">
            <Heading
                title="Which of these best describes your place?"
                subtitle="Pick a category"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-[53vh]">
                {categories.map((item) => {
                    return (
                        <div key={item.label}>
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label} // when category being watched is equal to item label
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find your place!"
                />

                <CountrySelect

                />
            </div>
        )
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onSubmit={onNext}
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
