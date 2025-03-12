import { Dot, Heart, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function PostCard({image,guests, title, location, price}) {
  return (
    <Link href={`/listing/${title}`} className="max-w-[400px]">
        <div className="relative max-w-[400px] rounded-xl overflow-hidden">
            <Image src={image} alt='home' width={400} height={400} className="object-cover rounded-xl" />
            <button className="absolute cursor-pointer top-5 right-5 size-8 bg-black/60 rounded-full grid place-content-center">
                <Heart color='white' size={18}/>
            </button>
        </div>
        <div className="mt-2 px-2 space-y-2">
            <div className="flex justify-between">
            <p className="font-semibold">{title}</p>
            <span className="flex gap-1 items-center">
            <Star size={18} fill='black' />
            <span className="text-sm text-[#5e5e5e]">4.6 (120)</span>
            </span>
            </div>
           <p className="flex text-sm items-center gap-1"><MapPin size={18} />{location}</p>
            <ul className="flex flex-wrap text-sm gap-2 text-[#5e5e5e]">
                <li className="flex">{guests} guests</li>
                <li className="flex"><Dot size={20}/>4 bedrooms</li>
                <li className="flex"><Dot size={20}/>4 beds</li>
            </ul>
            <p className="font-semibold">Ksh {price} night</p>
        </div>
    </Link>
  )
}

export default PostCard