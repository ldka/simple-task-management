"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import loginSchema from "@/data/auth/validation/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const form = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "daryll.alonte@gmail.com",
      password: "samplePassword1@",
    },
  });
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    const { email, password } = e.target.elements;
    const res = await signIn("credentials", {
      email: email.value,
      password: password.value,
      pathName: window.location.origin,
      redirect: false,
      callbackUrl: "/login",
    });
    if (res?.error) {
      alert(res.error);
      setIsLoginLoading(false);
    } else if (res?.status == 200) {
      router.refresh();
    }
    return;
  };

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const togglePassword = () => setIsPasswordShown(!isPasswordShown);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-xs">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={"example@mail.com"}
                    className="h-12 text-md"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-xs">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={"Password"}
                    className="h-12 text-md"
                    type={isPasswordShown ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="showPassword" onCheckedChange={togglePassword} />
            <Label
              htmlFor="showPassword"
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Password
            </Label>
          </div>

        </div>

        <div className="flex justify-between">
          <Button
            type="submit"
            size="lg"
            className="w-full uppercase"
            disabled={isLoginLoading}
          >
            {isLoginLoading ? (
              <>
                <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                <span className="inline-block">
                  Please wait...
                </span>
              </>
            ) : (
              <span className="inline-block">
                Login
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
