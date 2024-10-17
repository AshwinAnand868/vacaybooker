import { create } from "zustand";

interface SearchModalStore {
    onOpen: () => void;
    onClose: () => void;
    isOpen: boolean;
}

const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}));

export default useSearchModal;