
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function GuestLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/tasks");
  }
  return (
    <>
      <main>{children}</main>
    </>
  );
}
