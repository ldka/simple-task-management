import Dashboard from "@/components/dashboard/layout/Dashboard";
import Header from "@/components/dashboard/layout/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AuthLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <>
      <Header />
      <Dashboard>{children}</Dashboard>
    </>
  );
}
