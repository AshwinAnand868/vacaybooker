'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="
            flex
            flex-col
            items-center
            justify-center
            h-[70vh]
        ">
            <PuffLoader
                size={100}
                color="red"
            />
        </div>
    )
}

export default Loader;