import AddTaskForm from "@/components/auth/forms/tasks/AddTaskForm";
import Filter from "@/components/auth/layout/Filter";
import PerPage from "@/components/auth/layout/PerPage";
import Searchbar from "@/components/auth/layout/Searchbar";
import SectionTitle from "@/components/auth/layout/SectionTitle";
import Sort from "@/components/auth/layout/Sort";

import Tasks from "@/components/auth/layout/tasks/Tasks";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default function TasksPage() {

  return (
    <div className="flex flex-col gap-y-5">
      <SectionTitle
        title={"Your Tasks"}
        description={"Manage your tasks and subtasks."}
      />
      <div className="flex justify-start w-fit items-center space-x-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className={"text-[13px] text-link hover:text-link border-link bg-blue-500 text-blue-50 shadow hover:bg-blue-600"}> Add Task</Button>
          </DialogTrigger>
          <AddTaskForm />
        </Dialog>
      </div >
      <div className="space-y-8 lg:space-y-0 lg:flex lg:justify-between lg:items-center mb-4">
        <Searchbar />
        <div className="flex">
          <Sort />
          <Filter />
          <PerPage />
        </div>
      </div>
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
        <Tasks />
      </div>
    </div >
  );
}
