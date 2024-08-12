"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const LoginModal = () => {

  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false
    })
    .then((callback) => {
      setIsLoading(false);

      if(callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if(callback?.error) {
        toast.error(callback.error);
      }
    })
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back " subtitle="Login to your account!" />
      <Input
        required
        id="email"
        label="Email"
        errors={errors}
        disabled={isLoading}
        register={register}
      />
      <Input
        required
        id="password"
        label="Password"
        type="password"
        errors={errors}
        disabled={isLoading}
        register={register}
      />
    </div>
  );

  const footerContent = (
    <div className="flex gap-4 flex-col mt-3">
      <hr />
      <Button
        onClick={() => signIn('google')}
        label="Continue with Google"
        icon={FcGoogle}
        outline
      />
      <Button
        onClick={() => signIn('github')}
        label="Continue with Github"
        icon={AiFillGithub}
        outline
      />
      <div className="text-neutral-500 mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Already have an account?</div>
          <div onClick={loginModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">Log in</div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
