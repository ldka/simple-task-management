"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({ url }) => {

  const router = useRouter();

  const handleBack = () => router.replace(url);

  return (
    <div className="flex">
      <Button
        variant="outline"
        size="sm"
        className="text-[13px] text-link hover:text-link  border-link"
        onClick={handleBack}
      >
        <ChevronLeft className="h-5 w-5" />
        Back
      </Button>
    </div>
  );
};
export default BackButton;
