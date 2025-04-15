"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import useListTask from "@/hooks/auth/tasks/useListTask";
import TaskCard from "./TaskCard";
import { Skeleton } from "@/components/ui/skeleton";

const Tasks = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    setCurrentPage(page);
    const url = `${pathname}?${searchParams}`;
  }, [page]);

  const { taskList, isGetTaskLoading } = useListTask(searchParams);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isGetTaskLoading ?
          // ? <Label>You currently don't have any pending tasks.</Label>
          <Skeleton className="h-8 w-full" />
          : taskList?.data?.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
      </div>
      <Pagination
        total={taskList?.meta?.total}
        currentPage={parseInt(currentPage)}
        itemsPerPage={taskList?.meta?.per_page}
      />
    </div>
  );
};

export default Tasks;
