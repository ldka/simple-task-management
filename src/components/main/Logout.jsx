"use client";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Label } from "../ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Logout = () => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const router = useRouter();

  const handleLogout = (e) => {
    signOut();
    router.push("/login");
  };
  return (
    <>
      <div className="hover:bg-[#2C3338] h-full flex items-center">
        <AlertDialog
          open={isLogoutDialogOpen}
          onOpenChange={setIsLogoutDialogOpen}
        >
          <AlertDialogTrigger>

            <Label className="flex items-center px-4 text-sm" onClick={() => { setIsLogoutDialogOpen(true) }}>
              Logout
            </Label>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Logout
              </AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive hover:bg-destructive/90"
                onClick={handleLogout}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default Logout;
