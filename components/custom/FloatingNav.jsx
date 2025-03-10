import { CalendarDays, CircleUser, Heart, Telescope } from "lucide-react"

function FloatingNav() {
  return (
    <div className='bg-black/80 backdrop-blur-sm text-white p-3 px-9 rounded-full flex items-center gap-2 justify-between '>
      <button className="flex flex-col items-center text-xs"><Telescope />Discover</button>
      <button className="flex flex-col items-center text-xs"><Heart /> Favourites</button>
      <button className="flex flex-col items-center text-xs"><CalendarDays />Bookings</button>
      <button className="flex flex-col items-center text-xs"><CircleUser /> Profile</button>
      </div>
  )
}

export default FloatingNav