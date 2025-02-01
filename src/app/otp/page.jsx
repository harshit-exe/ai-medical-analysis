'use client'
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";




import { useState } from 'react'
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
// import { Button } from "@/components/ui/button"
// import { Toaster } from "@/components/ui/toaster"
// import { toast } from '@/hooks/use-toast'
import { BaseApiUrl } from '@/utils/constants'
import { useRouter } from 'next/navigation'

export default function OtpPage() {


  const router = useRouter()

  const [otp, setOtp] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(otp);

    if (otp.length === 6) {



      const response = await fetch(`${BaseApiUrl}/user/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.getItem('email'), userotp: otp })
      });
      const json = await response.json();

      console.log(json);


      localStorage.setItem('token', json.data.token)
      router.push("/dashboard")



    }
  }









  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Enter OTP
          </CardTitle>
          <CardDescription className="text-center">
            We've sent a one-time password to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)} // Update state on change
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <Button className="w-full" type="submit">
              Verify OTP
            </Button>
            {/* <Button type='submit' className="w-full">Verify OTP</Button> */}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
        </CardFooter>
      </Card>
    </div>
  );
}
