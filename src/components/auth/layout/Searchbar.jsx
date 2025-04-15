"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEmptyDataChecker from "@/hooks/useEmptyDataChecker";
import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Searchbar = () => {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");

  const keyword = searchParams.get("keyword");

  useEffect(() => {
    useEmptyDataChecker(keyword) ? setSearchTerm("") : setSearchTerm(keyword);
  }, [searchParams]);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.delete('page');
      !useEmptyDataChecker(value) ? params.set(name, value) : params.delete('search');
      return params.toString();
    },
    [searchParams]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`${pathname}?${createQueryString("search", searchTerm)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="xl:w-1/4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder={"Enter title keywords"}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSubmit}>
          Search
        </Button>
      </div>
    </form>
  );
};

export default Searchbar;
