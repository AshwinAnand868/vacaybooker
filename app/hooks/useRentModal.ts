import { create } from "zustand";

interface RentModalStore {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

const useRentModal = create<RentModalStore>((set) => ({
    isOpen: false,
    onClose: () => set({isOpen: false}),
    onOpen: () => set({isOpen: true}),
}));

export default useRentModal;