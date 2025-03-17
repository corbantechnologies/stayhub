import { Dot, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "250px",
};

function PostCard({ listingId, images, guests, title, location, price }) {
  return (
    <div className="max-w-[400px]">
      <div className="relative max-w-[400px] h-[250px] rounded-xl overflow-hidden">
        <div className="slide-container">
          <Slide>
            {images?.map((slideImage, index) => (
              <div key={index}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(${slideImage.image})`,
                  }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>
        <button className="absolute cursor-pointer top-5 right-5 size-8 bg-black/60 rounded-full grid place-content-center">
          <Heart color="white" size={18} />
        </button>
      </div>
      <Link href={`/listing/${title}/${listingId}`} className="mt-2 px-2 space-y-2">
        <div className="flex flex-col lg:flex-row justify-between">
          <p className="font-semibold">{title}</p>
          <span className="flex gap-1 items-center">
            <Star size={18} fill="black" />
            <span className="text-sm text-[#5e5e5e]">4.6 (120)</span>
          </span>
        </div>
        <p className="flex text-sm items-center gap-1">
          <MapPin size={18} />
          {location}
        </p>
        <ul className="flex flex-wrap text-sm gap-2 text-[#5e5e5e]">
          <li className="flex">{guests} guests</li>
          <li className="flex">
            <Dot size={20} />4 bedrooms
          </li>
          <li className="flex">
            <Dot size={20} />4 beds
          </li>
        </ul>
        <p className="font-semibold">Ksh {price} night</p>
      </Link>
    </div>
  );
}

export default PostCard;
