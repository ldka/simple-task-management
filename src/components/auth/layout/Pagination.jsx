import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPages,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

const Pagination = ({
  total,
  data,
  itemsPerPage = 8,
  maxDisplayedPages = 10,
  onClick,
  currentPage,
}) => {
  const [pageCount, setPageCount] = useState(1);
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

  useEffect(() => {
    if (total != 0) {
      setPageCount(Math.ceil(total / itemsPerPage));
    }
  }, [total]);

  const displayedPageStart = Math.max(
    Math.min(
      currentPage - Math.floor(maxDisplayedPages / 2),
      pageCount - maxDisplayedPages + 1
    ),
    1
  );
  const displayedPageEnd = Math.min(
    displayedPageStart + maxDisplayedPages - 1,
    pageCount
  );

  const pageNumbers = [];
  if (pageCount > maxDisplayedPages) {
    // Show "..." for hidden pages at the beginning
    if (displayedPageStart > 1) {
      pageNumbers.push(
        <PaginationItem key={"first"}>
          <PaginationLink href={pathname + "?" + createQueryString("page", 1)}>
            {"..."}
          </PaginationLink>
        </PaginationItem>
      );
    }
    // Show displayed pages
    for (let i = displayedPageStart; i <= displayedPageEnd; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={pathname + "?" + createQueryString("page", i)}
            isActive={currentPage === i ? true : false}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    // Show "..." for hidden pages at the end
    if (displayedPageEnd < pageCount) {
      pageNumbers.push(
        // <PaginationItem key={"last"}>
        //   <PaginationPages href="#" handleClick={()=>handlePageChange(pageCount)} label={'...'}/>
        // </PaginationItem>
        <PaginationItem key={"last"}>
          <PaginationLink
            href={pathname + "?" + createQueryString("page", pageCount)}
          >
            {"..."}
          </PaginationLink>
        </PaginationItem>
      );
    }
  } else {
    // Show all page numbers if total pages are less than maxDisplayedPages
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={pathname + "?" + createQueryString("page", i)}
            isActive={currentPage === i ? true : false}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
  }
  if (pageCount == 0) {
    return null;
  }
  return (
    <div className="pt-6 pb-10">
      <BasePagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage != 1 ?
              <PaginationPrevious
                href={`${pathname}?${createQueryString(
                  "page",
                  currentPage > 1 ? currentPage - 1 : currentPage
                )}`}
              /> : null}
          </PaginationItem>
          {pageNumbers}
          <PaginationItem>
            {currentPage != pageCount ?
              <PaginationNext
                href={`${pathname}?${createQueryString(
                  "page",
                  currentPage < pageCount ? currentPage + 1 : currentPage
                )}`}
              /> : null}
          </PaginationItem>
        </PaginationContent>
      </BasePagination>
    </div>
  );
};

export default Pagination;
