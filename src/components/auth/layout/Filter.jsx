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
import { ListFilter, ListTodo } from "lucide-react";

const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name, value) => {


      const params = new URLSearchParams(searchParams);
      if ([1, 2, 3].includes(value)) {
        params.delete("page");
        params.set(name, value);
      }
      else {
        params.delete("status")
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleClick = (key, value) => {
    router.replace(pathname + "?" + createQueryString(key, value));
  };

  const sort = [
    {
      label: "All",
      value: 0,
      column: "status",
    },
    {
      label: "To-do",
      value: 1,
      column: "status",
    },
    {
      label: "In progress",
      value: 2,
      column: "status",
    },
    {
      label: "Done",
      value: 3,
      column: "status",
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
            <ListTodo className="h-3.5 w-3.5 me-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="me-5">
          <DropdownMenuLabel>
            Filter
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sort.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onSelect={() => handleClick(option.column, option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Filter;
