import { Mail, Phone, UserRoundPen } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"

function UserInfoCard() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('Tony Ligogo');
    const [phone, setPhone] = useState('0790420305');
    const handleUpdateName = (updatedName) => {
        setName(updatedName);
      };
    const handleUpdatePhone = (updatedPhone) => {
        setPhone(updatedPhone);
      };
    const handleUpdate = () =>{
        setOpen(false)
        console.log(name, phone)
    }
  return (
    <div className='bg-white shadow-md border p-5 rounded-xl'>
        <div className='flex justify-between gap-5 items-center'>
        <div className='flex items-center gap-2 '>
          <Image src="/react4.jpg" alt="user" width={80} height={80} className='object-cover rounded-full' />
          <div>
            <h2 className="font-semibold text-xl">John Doe</h2>
            <p className="text-gray-500">Host since 2022</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <button onClick={()=>setOpen((prev)=>!prev)} className='bg-black text-white size-8 grid place-content-center rounded-md'><UserRoundPen size={18}/></button>
          </div>
        </div>
        <hr className='my-5' />
        <p className='font-semibold'>Contact Information</p>
        <div className='flex gap-5 justify-between mt-3'>
          <div className='flex gap-1 items-center'>
          <div className="bg-black size-7 rounded-md grid place-content-center">
            <Phone color='white' size={16} />
            </div>
            <span className='text-sm'>+254 700 123 456</span>
          </div>
          <div className='flex gap-1 items-center'>
          <div className="bg-black size-7 rounded-md grid place-content-center">
            <Mail color='white' size={16} />
            </div>
            <span className='text-sm'>johndoe@example.com</span>
        </div>
        </div>
        <DialogDemo open={open} name={name} phone={phone} onUpdateName={handleUpdateName} onUpdatePhone={handleUpdatePhone} setOpen={()=>setOpen((prev)=>!prev)} onSubmitChanges={handleUpdate}/>
      </div>
  )
}

export default UserInfoCard

function DialogDemo({open, setOpen, name, phone, onUpdateName, onUpdatePhone, onSubmitChanges}) {
    
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitChanges();
  };
    return (
      <Dialog open={open} onOpenChange={()=>setOpen((prev)=>!prev)}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                className="col-span-3"
                onChange={(e) => onUpdateName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone number
              </Label>
              <Input
                id="phone"
                className="col-span-3"
                value={phone}
                onChange={(e) => onUpdatePhone(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }