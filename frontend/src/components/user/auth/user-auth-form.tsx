"use client"

import { type FC, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/user/common/password-input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { AuthService } from "@/services/authServices"
import { useNavigate } from "react-router-dom"
import { loginSchema, registerSchema } from "@/schemas/authSchema"

interface UserAuthFormProps {
    authState: "login" | "register"
    onStateChange: (state: "login" | "register") => void
}


export const UserAuthForm: FC<UserAuthFormProps> = ({ authState, onStateChange }) => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const formSchema = authState === "login" ? loginSchema : registerSchema
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            if (authState === 'login') {
                await AuthService.loginService(data);
                toast.success("Logged in successfully");
                navigate('/home');
            } else {
                await AuthService.registerService(data as { email: string; password: string; name: string; });
                toast.success("OTP shared successfully");
                navigate('/otp-verification', { state: { email: data.email } });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className={cn("grid gap-6")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        {authState === "register" && (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <PasswordInput placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="mt-2" disabled={isLoading} type="submit">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {authState === "login" ? "Log In" : "Create Account"}
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="text-center">
                {authState === "login" ? (
                    <p>
                        Don't have an account?{" "}
                        <Button variant="link" onClick={() => onStateChange("register")}>
                            Register
                        </Button>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <Button variant="link" onClick={() => onStateChange("login")}>
                            Log In
                        </Button>
                    </p>
                )}
            </div>
        </div>
    )
}

