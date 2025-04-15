"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "../Pagination";
import useListSubTask from "@/hooks/auth/subTasks/useListSubTask";
import SubTaskCard from "./SubTaskCard";

const SubTasks = ({ taskTitle }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const [currentPage, setCurrentPage] = useState(page);
  useEffect(() => {
    setCurrentPage(page);
    const url = `${pathname}?${searchParams}`;
  }, [page]);

  const { subTaskList, isGetSubTaskLoading } = useListSubTask(taskTitle, searchParams);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isGetSubTaskLoading ?
          // ? <Label>You currently don't have any pending tasks.</Label>
          <Skeleton className="h-8 w-full" />
          : subTaskList?.data?.map((task, index) => (
            <SubTaskCard key={index} task={task} parentTitle={taskTitle} />
          ))}
      </div>
      <Pagination
        total={subTaskList?.meta?.total}
        currentPage={parseInt(currentPage)}
        itemsPerPage={subTaskList?.meta?.per_page}
      />
    </div>
  );
};

export default SubTasks;
