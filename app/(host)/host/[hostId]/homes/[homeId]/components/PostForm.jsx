/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { AlertModal } from "@/components/custom/AlertModal";
import { useCreateListing, useUpdateListing } from "@/actions/react-query/queriesAndMutations";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(2, "Title is required and must be at least 2 characters long"),
  description: z.string().min(2, "Description is required and must be at least 2 characters long"),
  location: z.string().min(2, "Location is required and must be at least 2 characters long"),
  guests: z.coerce.number().min(1, "At least 1 guest is required"),
  checkin: z.string().min(2, "Check-in time is required"),
  checkout: z.string().min(2, "Check-out time is required"),
  pricing: z.coerce.number().min(1, "Pricing is required and must be at least 1"),
  longstay_discount: z.coerce.number().min(1).optional(),
  longstay_min_days: z.coerce.number().min(1).optional(),
  cleaning_fee: z.coerce.number().min(0).optional(),
  facilities: z.string().optional(),
});

export const ProductForm = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [deletedImages, setDeletedImages] = useState(new Set());
  const { listingId } = useParams();
  const router = useRouter();
  const {
    mutateAsync: createNewListing,
    isError,
  } = useCreateListing();
  const {
    mutateAsync: updateListing,
    isSuccess: updateSuccess,
    isError: updateError,
  } = useUpdateListing();

  const axiosAuth = useAxiosAuth();

  function handleImageChange(e) {
    const selectedFiles = e.target.files;
    setFiles(Array.from(selectedFiles));
  }
  useEffect(() => {
    if (files.length < 1) return;
    const newImageUrls = [];
    files.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [files]);

  const handleImageDelete = (image) => {
    setDeletedImages((prev) => {
      const newDeletedImages = new Set(prev);
      if (newDeletedImages.has(image)) {
        newDeletedImages.delete(image);
      } else {
        newDeletedImages.add(image);
      }
      return newDeletedImages;
    });
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      location:"",
      guests:1,
      uploaded_images: [],
      pricing: 0,
      checkin: "",
      checkout: "",
      facilities: "",
        cleaning_fee: 0,
      longstay_discount: 0,
      longstay_min_days: 1,
    },
  });
  useEffect(() => {
    if (initialData) {
      setInitialImages(initialData?.images);
      form.reset({
        ...initialData,
        price: parseFloat(String(initialData.price)),
        facilities: initialData.facilities ? initialData?.facilities?.join(", ") : "",
      });
    }
  }, [initialData, form]);

  const title = initialData ? "Edit Listing" : "Create Listing";
  const description = initialData ? "Edit a Listing" : "Create a Listing";
  const action = initialData ? "Save changes" : "Create";
  const toastMessage = initialData ? "Listing updated" : "Listing created";

  const parseInputToArray = (input) => {
    if (!input) return [];
    return input
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter((item) => item);
  };

  async function onSubmit(values) {
    const facilitiesArray = parseInputToArray(values.facilities);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("pricing", values.pricing);
    formData.append("location", values.location);
    formData.append("guests", values.guests);
    formData.append("checkin", values.checkin);
    formData.append("checkout", values.checkout);
    formData.append("longstay_discount", values.longstay_discount);
    formData.append("longstay_min_days", values.longstay_min_days);
    formData.append("cleaning_fee", values.cleaning_fee);
    formData.append("facilities", JSON.stringify(facilitiesArray));
    files.forEach((file) => {
      formData.append("uploaded_images", file);
    });

    try {
      setLoading(true);
      if (initialData) {
        const data = {
          listingId,
          values: formData,
          axiosAuth: axiosAuth,
        };
        await updateListing(data);
        if (updateSuccess) {
          toast.success(toastMessage, { id: "updatesuccess" });
          router.replace(`/host`);
        }
        if (updateError) {
          toast.error("Failed to update listing. Please try again.");
        }
      } else {
        const data = {
          values: formData,
          axiosAuth: axiosAuth,
        };
        const result = await createNewListing(data);
        if (result.success) {
          toast.success(toastMessage, { id: "createsuccess" });
          router.replace(`/host`);
        }
        if (isError) {
          toast.error("Failed to create listing. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Something went wrong", { id: "error" });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
      />
      <div>
        <h1 className="text-xl md:text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <hr />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <div>
          <p>Listing images</p>
          <div className="flex items-center">
            <input
              style={{ display: "none" }}
              type="file"
              multiple
              id="avatar"
              onChange={handleImageChange}
            />
            <label
              htmlFor="avatar"
              className="bg-blue-50 mt-2 border border-primary cursor-pointer border-dashed rounded-xl w-full p-6 grid place-content-center"
            >
              <div className="flex justify-center">
                <img
                  src="/image-placeholder.svg"
                  alt="placeholder"
                  className="w-12"
                />
              </div>
              <p className="text-sm">Click to upload listing image</p>
            </label>
            {imageURLs.map((imageSrc, index) => (
              <img
                key={index}
                src={imageSrc}
                alt="Preview"
                className="size-10 ml-2 rounded object-cover"
              />
            ))}
           
          </div>
          </div>
          <div className="grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className='placeholder:text-sm'
                      placeholder="Listing title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className='placeholder:text-sm'
                      placeholder="Airbnb location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="My airbnb is awesome!"
                      className='placeholder:text-sm'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facilities</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      className='placeholder:text-sm'
                      placeholder="Wi-Fi, Swimming pool, ..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 md:block gap-4">
              <FormField
                control={form.control}
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Guests allowed</FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="number" placeholder='4' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-in time</FormLabel>
                    <FormControl>
                      <Input type='time' disabled={loading} placeholder='9:00 am - 10:00 pm' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Check-out time</FormLabel>
                    <FormControl>
                      <Input type='time' disabled={loading} placeholder='9:00 am - 6:00 pm' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing</FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longstay_discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Long-stay Discount <span className="text-sm text-gray-500">(Optional)</span> </FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longstay_min_days"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum stay days</FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
              <FormField
                control={form.control}
                name="cleaning_fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>cleaning_fee <span className="text-sm text-gray-500">(Optional)</span> </FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="animate-spin" /> : `${action}`}
          </Button>
        </form>
      </Form>
    </>
  );
};
