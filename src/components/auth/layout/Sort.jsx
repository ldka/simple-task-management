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
import { ListFilter, ListOrdered } from "lucide-react";

const Sort = () => {
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

  const handleClick = (sortBy, direction) => {
    router.replace(pathname + "?" + createQueryString(sortBy, direction));
  };

  const sort = [
    {
      label: "Alphabetical - Asc",
      direction: "title-asc",
      column: "sort",
    },
    {
      label: "Alphabetical - Desc",
      direction: "title-desc",
      column: "sort",
    },
    {
      label: "Date Created - Asc",
      direction: "date-asc",
      column: "sort",
    },
    {
      label: "Date Created - Desc",
      direction: "date-desc",
      column: "sort",
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
            <ListOrdered className="h-3.5 w-3.5 me-2" />{" "}
            Sort by
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="me-5">
          <DropdownMenuLabel>
            Sort by
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sort.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => handleClick(option.column, option.direction)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
