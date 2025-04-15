import AddSubTaskForm from "@/components/auth/forms/subTasks/AddSubTaskForm";
import BackButton from "@/components/auth/layout/BackButton";
import Filter from "@/components/auth/layout/Filter";
import PerPage from "@/components/auth/layout/PerPage";
import Searchbar from "@/components/auth/layout/Searchbar";
import SectionTitle from "@/components/auth/layout/SectionTitle";
import Sort from "@/components/auth/layout/Sort";
import SubTasks from "@/components/auth/layout/subTasks/SubTasks";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

export default async function SubTaskPage({ params }) {
  const { taskTitle } = await params;
  return (
    <div className="flex flex-col gap-y-5">
      <BackButton url={'/tasks'} />
      <SectionTitle
        title={taskTitle}
        description={"Sub Tasks Overview"}
      />
      <div className="flex justify-start w-fit items-center space-x-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className={"text-[13px] text-link hover:text-link border-link bg-blue-500 text-blue-50 shadow hover:bg-blue-600"}> Add Sub Task</Button>
          </DialogTrigger>
          <AddSubTaskForm taskTitle={taskTitle} />
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
        <SubTasks taskTitle={taskTitle} />
      </div>
    </div >
  );
}
