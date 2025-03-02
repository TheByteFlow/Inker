import { Separator } from "@/components/ui/separator"
import { UserAuthForm } from "@/components/user/auth/user-auth-form"
import Button from "@/components/ui/button"
import { Github } from "lucide-react"
import { useState } from "react"
import GoogleAuth from "./GoogleAuth"


export const FormLayout = () => {

    const [authState, setAuthState] = useState<'login' | 'register'>('login');

    return (
        <div className='lg:p-8'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
                <div className='flex flex-col space-y-2 text-left'>
                    <h1 className='text-2xl font-semibold tracking-tight'>{authState === 'login' ? "Welcome Back!" : "Create an Account"}</h1>
                    <p className='text-sm text-muted-foreground'>
                        {authState === 'login' ? "Please enter your email and password to log in." : "Please fill in the details to create your account."}
                    </p>
                </div>
                <UserAuthForm
                    authState={authState}
                    onStateChange={setAuthState}
                />
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="flex gap-2 ">
                    <GoogleAuth />
                    <Button variant="outline" className="w-full">
                        <Github className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                </div>
            </div>
        </div>
    )
}
