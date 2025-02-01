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
            router.push("/landing");
        }
    };

    const onSignupFailure = () => {
        console.log("Some error are occuring please try again.");
    };






    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Create a new FormData object
        const formData = new FormData(e.target);


        const email = formData.get("email");
        const username = formData.get("username");
        const role = formData.get("role");
        const password = formData.get("password");
        const firstname = formData.get("firstname");
        const lastname = formData.get("lastname");




        // let { email, password, userName, userType, firstname, lastname } = formData
        const response = await fetch(`${BaseApiUrl}/user/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, username: username, })
        });
        const json = await response.json();

        if (json) {
            console.log(json);

            localStorage.setItem('email', email)
            // toast.success("Otp send successfully");
            router.push("/otp")
        } else {
            toast.error("Error to Create");
        }

        // router.push("/otp")


        console.log({ email, username, role, password });
    };

























    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">
                        Register
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your email to sign in to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>

                    <form onSubmit={handleSubmit} className="my-4">
                        <div className="flex flex-col space-y-2 my-2">
                            <Label>Email</Label>
                            <Input name="email" type="email" required />
                        </div>
                        <div className="flex flex-col space-y-2 my-4">
                            <Label>User Name</Label>
                            <Input name="username" required />
                        </div>




                        <Button type="submit" className="bg-black w-full text-white py-2 text-center rounded-md">
                            Send OTP
                        </Button>
                        {/* <Link href={"/otp"} className="bg-black w-full text-white py-2 text-center rounded-md">Login with OTP</Link> */}
                    </form>

                </CardContent>
                <CardFooter className="flex flex-col space-y-4">

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

                    <div className="pt-3">
                        <hr />
                        if you have account click <Link href={'/login'} className="text-blue-900 hover:text-red-500"> here </Link>
                    </div>
                    {/* </Button> */}
                </CardFooter>
            </Card>
        </div>
    );
}
