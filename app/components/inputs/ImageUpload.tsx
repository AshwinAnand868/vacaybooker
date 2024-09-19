'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({
  onChange,
  value
}: ImageUploadProps) => {


  const handleUpload = useCallback((result: any) => {
    onChange(result.info.secure_url);
  }, [onChange]);

  return (
    <div>
      <CldUploadWidget
        onSuccess={handleUpload}
        uploadPreset="fthyx5v5"
        options={{
          maxFiles: 1
        }}
      >

        {({open}) => { 
          // open variable exists but sometimes it is not available when the modal is open, so we will keep a check to save ourselves
          return (
            <div
              onClick={() => open?.()}
              className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed
                border-2
                border-neutral-300
                text-neutral-600
                p-20
                flex
                flex-col
                justify-center
                items-center
                gap-4
              "
            >
              <TbPhotoPlus size={50}/>
              <div className="font-semibold text-lg">
                Click to upload
              </div>
              {
                value && (
                  <div
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      alt="Upload"
                      fill
                      style={{ objectFit: 'contain' }}
                      src={value}
                    />
                  </div>
                )
              }
            </div>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload