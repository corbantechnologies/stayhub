"use client";

import { Button } from "@/components/ui/button";
import { BedDouble, MoveRight, Star, CalendarIcon, Dot, CircleUser } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image";
import { useState } from "react";
import Review from "@/components/custom/Review";
import { useGetSingleListing } from "@/actions/react-query/queriesAndMutations";
import { useParams } from "next/navigation";

function Listing() {
    const {listingId} = useParams()
  const {data:singleListing} = useGetSingleListing(listingId)
  const [date, setDate] = useState({
    from: '',
    to: '',
  })
  let Difference_In_Time = date.to - date.from;
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  return (
    <div className="md:px-8 pt-4">
      <section className="md:grid grid-cols-4 gap-3">
        <div className="md:block col-span-2 row-span-2 md:rounded-l-xl overflow-hidden">
          <Image
            src="/home3.jpg"
            alt="home"
            width={600}
            height={400}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="hidden md:block col-span-1 row-span-1">
          <Image
            src="/home4.jpg"
            alt="home"
            width={120}
            height={120}
            className="w-full object-cover"
          />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 rounded-r-xl overflow-hidden">
          <Image
            src="/home5.jpg"
            alt="home"
            width={120}
            height={120}
            className="w-full object-cover"
          />
        </div>
        <div className="hidden md:block col-span-1 row-span-1">
          <Image
            src="/home8.jpg"
            alt="home"
            width={120}
            height={120}
            className="w-full object-cover"
          />
        </div>
        <div className="hidden md:block col-span-1 row-span-1 rounded-r-xl overflow-hidden">
          <Image
            src="/home7.jpg"
            alt="home"
            width={120}
            height={120}
            className="w-full object-cover"
          />
        </div>
      </section>
      <section className="flex flex-col-reverse md:flex-row gap-8 md:gap-16 mt-5">
        <div className="flex-[1.5] space-y-4">
          <div>
            <h1 className="text-xl md:text-2xl leading-none font-semibold">
              Mirror House
            </h1>
            <small className="text-[#5e5e5e]">South Tyrol, Italy</small>
            <ul className="flex my-1 flex-wrap text-sm gap-2 text-[#5e5e5e]">
                <li className="flex">4 guests</li>
                <li className="flex"><Dot size={20}/>4 bedrooms</li>
                <li className="flex"><Dot size={20}/>4 beds</li>
            </ul>
            <div className="flex items-center text-sm text-[#5e5e5e]">
            <span className="flex gap-1 items-center">
              <Star size={18}/> 4.82
            </span>
            <span className="ml-5">55 reviews</span>
          </div>
          </div>
            <div className="py-5 flex gap-2 items-center border-t border-b">
              <div>
              <CircleUser size={40}/>
              </div>
              <p>Hosted by Ligogo</p>
            </div>
          <div className="border-b pt-3 pb-10">
            <p className="text-xl md:text-2xl font-semibold mb-3">
              Where you&apos;ll sleep
            </p>
            <div className="flex-grow flex flex-wrap gap-5">
              <div className="flex-1 flex flex-col border p-2 md:p-5 rounded-xl">
                <BedDouble size={18} className="mb-3" />
                <span>Bedroom 1</span>
                <small>1 King size bed</small>
              </div>
              <div className="flex-1 flex flex-col border p-2 md:p-5 rounded-xl">
                <BedDouble size={18} className="mb-3" />
                <span>Bedroom 2</span>
                <small>1 double bed</small>
              </div>
              <div className="flex-1 flex flex-col border p-2 md:p-5 rounded-xl">
                <BedDouble size={18} className="mb-3" />
                <span>Bedroom 3</span>
                <small>1 double bed</small>
              </div>
            </div>
          </div>
          <p className="text-[15px] my-10">
            Nestled in the serene woods of Lake Tahoe, this charming cottage
            offers a perfect getaway for nature lovers and families alike. With
            its rustic wooden exterior and inviting front porch, the cottage
            exudes warmth and comfort. Inside, you&apos;ll find a cozy living
            area adorned with plush furnishings, a fireplace, and large windows
            that let in plenty of natural light. The open-concept design
            seamlessly connects the living space to a fully equipped kitchen,
            complete with modern appliances and a dining area that seats four.
            The cottage features two beautifully decorated bedrooms, each
            designed to provide a restful retreat after a day of exploring the
            great outdoors.
          </p>
          <div className="border-t py-8">
          <p className="text-xl md:text-2xl font-semibold mb-3">
              What this place offers
            </p>
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div>
              <span className="flex items-center gap-1">
                <MoveRight size={16}/> Kitchen
              </span>
              <span className="flex items-center gap-1">
                <MoveRight size={16}/> Free parking
              </span>
              <span className="flex items-center gap-1">
                <MoveRight size={16}/> TV
              </span>
              <span className="flex items-center gap-1">
                <MoveRight size={16}/> Air conditioning
              </span>
            </div>
            <div>
              <span className="flex items-center gap-1">
                <MoveRight size={16}/> Wi-Fi
              </span>
              <span className="flex items-center gap-1">
                <MoveRight size={16}/> Pool
              </span>
              <span className="flex items-center gap-1">
                <MoveRight size={16}/> Washer
              </span>
              <span className="flex items-center gap-1">
                <MoveRight size={16}/> Hair dryer
              </span>
            </div>
          </div>
          </div>
        </div>
        <div className="flex-1">
        <div className="p-5 rounded-xl space-y-5 shadow-md border">
          <span className="flex">
            <span className="text-lg font-semibold">Ksh 23,000</span>
            <span>/ night</span>
          </span>
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <span
                  id="date"
                  className={cn(
                    "w-full border pl-2 py-2 rounded-md text-sm flex items-center gap-1 cursor-pointer justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon size={18} />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </span>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  min={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Select>
            <SelectTrigger className="min-w-[180px] w-full">
              <SelectValue placeholder="Guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectContent>
          </Select>
          <Button className='w-full'>Reserve</Button>
          <p className="text-xl font-semibold mb-3">
        Price details
      </p>
          <p className="flex items-center justify-between">
            <span>Ksh 23,000 x {Difference_In_Days}</span>
            <span>Ksh {Number(23000) * Number(Difference_In_Days)}</span>
          </p>
        </div>
        </div>
      </section>
      <section className="border-t">
      <p className="text-xl md:text-2xl mt-6 font-semibold mb-3">
        What others had to say
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Array.from({length: 5}, (_, index) => (
          <Review key={index}/>
        ))}
      </div>
      </section>
    </div>
  );
}

export default Listing;
