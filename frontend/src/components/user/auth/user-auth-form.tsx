"use client";

import {type FC, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {PasswordInput} from "@/components/user/common/password-input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/cn";
import {Loader2} from "lucide-react";
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";
import {loginSchema, registerSchema} from "@/schemas/authSchema";
import {Credenza, CredenzaTrigger} from "@/components/ui/credenza";
import ForgetPassword from "./ForgetPassword";
import useAuthStore from "@/store/authStore.ts";
import GoogleAuth from "./GoogleAuth";
import {Label} from "@/components/ui/label";

// interface for Props
interface PropsType {
    delayedAuthState: "login" | "register";
}

export const UserAuthForm: FC<PropsType> = ({delayedAuthState}) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formSchema =
        delayedAuthState === "login" ? loginSchema : registerSchema;

    const {login, register} = useAuthStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            if (delayedAuthState === "login") {
                const status = await login(data.email, data.password);
                if (status) {
                    navigate("/feed");
                }
            } else {
                if ("name" in data) {
                    const status = await register(data.name, data.email, data.password);
                    if (status) {
                        navigate("/otp-verification", {state: {email: data.email}});
                    }
                } else {
                    toast.error("Name is required for registration.");
                }
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
        <div className={cn("relative h-full")}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-3">
                        {/* Name field */}
                        {delayedAuthState === "register" && (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className="space-y-1">
                                        <FormControl>
                                            <div className="flex flex-col gap-2">
                                                <Label className="text-sm" htmlFor="name">
                                                    Name
                                                </Label>
                                                <Input
                                                    required
                                                    id="name"
                                                    placeholder="Name"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* Email field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <div className="flex flex-col gap-2">
                                            <Label className="text-sm" htmlFor="email">
                                                Email
                                            </Label>
                                            <Input
                                                required
                                                id="email"
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Password field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className="space-y-1">
                                    <FormControl>
                                        <div className="flex flex-col gap-2">
                                            <Label className="text-sm" htmlFor="password">
                                                Password
                                            </Label>
                                            <PasswordInput placeholder="Password" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Forgot password */}
                        {delayedAuthState === "login" && (
                            <div className="relative flex items-start justify-end">
                                <Credenza>
                                    <CredenzaTrigger asChild>
                                        <button className="text-sm font-medium">
                                            Forgot Password?
                                        </button>
                                    </CredenzaTrigger>
                                    <ForgetPassword/>
                                </Credenza>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-col gap-2">
                            <Button className="mt-2" disabled={isLoading} type="submit">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                {delayedAuthState === "login" ? "Sign In" : "Sign Up"}
                            </Button>

                            {/* Google auth */}
                            <div className="flex gap-2 flex-col">
                                <GoogleAuth/>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};
