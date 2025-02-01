import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function BookAppointment() {
  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="date">Preferred Date</Label>
          <Input id="date" type="date" />
        </div>
        <div>
          <Label htmlFor="time">Preferred Time</Label>
          <Input id="time" type="time" />
        </div>
        <Button type="submit" className="w-full">
          Schedule Appointment
        </Button>
      </form>
    </div>
  )
}

