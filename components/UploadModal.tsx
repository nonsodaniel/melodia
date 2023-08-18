"use client";
import React, { Fragment, useEffect, useState } from "react";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { generateId } from "@/helpers/constants";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const defaultFormValues = {
    title: "",
    song: null,
    image: null,
    author: "",
  };
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };
  const submit: SubmitHandler<FieldValues> = async (values) => {
    console.log({ values });
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!user || !imageFile || !songFile) {
        return toast.error("Check and fill all fields!");
      }

      const id = generateId();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs") //bucket name
        .upload(`song-${values.title}-${id}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        toast("Song upload failed");
      }

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images") //bucket name
          .upload(`image-${values.title}-${id}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        setIsLoading(false);
        toast("Image upload failed");
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData?.path,
          song_path: songData?.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      setIsLoading(false);
      reset();
      toast.success("Song created!");
      router.refresh();
      uploadModal.onClose();
    } catch (error) {
      toast("An error occured! Kindly try again");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Add your song"
      description="Song must be in mp3 format"
      onChange={handleChange}
      isOpen={uploadModal.isOpen}
    >
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          placeholder="Song title"
          {...register("title", { required: true })}
        />
        <Input
          id="author"
          disabled={isLoading}
          placeholder="Song author"
          {...register("author", { required: true })}
        />
        <div className="">
          <p>Select your song logo</p>
          <Input
            type="file"
            id="image"
            disabled={isLoading}
            placeholder="Select an image"
            accept="image/*"
            {...register("image", { required: true })}
          />
        </div>
        <div className="">
          <p>Select a Song file</p>
          <Input
            type="file"
            id="song"
            disabled={isLoading}
            placeholder="Select a Song"
            accept=".mp3"
            {...register("song", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Uploading your Song" : "Create your Song"}
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
