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
import getRegistrationSchema from "@/data/auth/validation/registrationSchema";
import registrationSchema from "@/data/auth/validation/registrationSchema";
import useRegister from "@/hooks/guest/useRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

const RegisterForm = () => {

  const { register, isRegisterLoading, error, isError } = useRegister();

  const validationSchema = getRegistrationSchema();

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values, event) => {
    event.preventDefault();
    if (!error) {
      const value = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
      };
      console.log(value);
      register({ payload: value });
    }
  };

  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const togglePassword = () => setIsPasswordShown(!isPasswordShown);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-xs">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Juan"}
                      className="h-12 text-md"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-xs">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Dela Cruz"}
                      className="h-12 text-md"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

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
                      placeholder={"juan.delacruz@email.com"}
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

            <FormField
              control={form.control}
              name="passwordConfirmation"
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
            <Button type="submit" size="lg" className="w-full uppercase" disabled={isRegisterLoading}>
              Submit
            </Button>
          </div>

        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
