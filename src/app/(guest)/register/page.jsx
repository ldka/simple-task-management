import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import RegisterForm from "@/components/guest/forms/RegisterForm";
export default function RegisterPage() {
  return (
    <section className="flex flex-col sm:items-center justify-center m-3 md:m-8">
      <div className="space-y-4">
        <Card className=" sm:w-[600px] border-none shadow-none">
          <CardContent className="flex flex-col space-y-4 p-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-center text-4xl font-bold tracking-tight">
                  Simple Task Management
                </h1>
                <h1 className="text-center text-sm mt-1">
                  Registration
                </h1>
              </div>
              <RegisterForm />

              <div className="flex flex-col space-y-4 text-center">
                <Label className="text-xs">
                  Already Registered?
                  <Link
                    href="/login"
                    className="border-b border-gray-300 transition-[border-color] hover:border-gray-600 font-semibold"
                  >
                    Login
                  </Link>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
