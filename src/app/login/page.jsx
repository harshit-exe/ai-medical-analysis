"use client";
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
import Link from "next/link";




import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { BaseApiUrl } from "@/utils/constants";


export default function LoginPage() {


  const router = useRouter();

  const clientId = "976004726633-qd21qspr0t0hep43vup331of8aq1u8je.apps.googleusercontent.com";
  // 768974449019-60pn6e18b4grspfbhr7bs388k5g97sm2.apps.googleusercontent.com


  const onSignupSuccess = async (res) => {
    console.log(res);
    
    console.log(res.email);
    console.log(res.name);

    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: res.name, email: res.email }),
    });
    const json = await response.json();

    if (json) {
      localStorage.setItem("token", json.authToken);
      // router.push("/dashboard");
    }
  };

  const onSignupFailure = () => {
    console.log("Some error are occuring please try again.");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link href={"/otp"} className="bg-black w-full text-white py-2 text-center rounded-md">Login with OTP</Link>

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          {/* <Button variant="outline" className="w-full"> */}
          <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                buttonText="Signup With Google"
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  onSignupSuccess(decoded);
                  console.log(decoded);
                }}
                onError={onSignupFailure}
              />
            </GoogleOAuthProvider>
          {/* </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
