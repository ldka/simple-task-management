"use client";

import { useSession } from "next-auth/react";
import { Label } from "../ui/label";

const Greetings = () => {

  const { data: session } = useSession();

  return (
    <>
      <div className="h-full flex items-center">
        <Label className="flex items-center px-4 text-sm">
          {`Hello ${session.user.fullName}`}
        </Label>
      </div>
    </>
  );
};

export default Greetings;
