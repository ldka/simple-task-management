"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ListFilter, ListPlus } from "lucide-react";

const PerPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleClick = (key, value) => {
    router.replace(pathname + "?" + createQueryString(key, value));
  };

  const sort = [
    {
      label: "6 Items",
      value: "6",
    },
    {
      label: "12 Items",
      value: "12",
    },
    {
      label: "18 Items",
      value: "18",
    },
    {
      label: "24 Items",
      value: "24",
    },
  ];

  return (
    <div className="">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="text-xs md:text-sm"
          >
            <ListPlus className="h-3.5 w-3.5 me-2" />{" "}
            Per Page
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="me-5">
          <DropdownMenuLabel>
            Show per page:
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sort.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => handleClick("itemsPerPage", option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PerPage;
