"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Layers, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditTaskForm from "../../forms/tasks/EditTaskForm";
import Link from "next/link";
import useEditTask from "@/hooks/auth/tasks/useEditTask";
import Image from "next/image";
import useDeleteSubTask from "@/hooks/auth/subTasks/useDeleteSubTask";

const SubTaskCard = ({ task, parentTitle }) => {
  const router = useRouter();
  const { editTask, isEditTaskLoading } = useEditTask();
  const { deleteSubTask, isDeleteSubTaskLoading } = useDeleteSubTask();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleTaskStatus = (status) => {
    editTask({
      title: task.title,
      payload: { status: status },
    });
  };
  const markup = {
    __html: task?.content,
  };
  const checkLongText = (str) => !/\s/.test(task.content) && task.content.length > 30;

  const breakClass = checkLongText(task.content) ? "break-all" : "break-words";
  const handleDelete = () => {
    deleteSubTask({ title: task.title, parentTitle: parentTitle });
  };

  return (
    <Card className="border hover:border-link">
      <CardContent className="p-4">
        <div className="">
          <div className="flex flex-col space-y-2 text-clip">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-start-1 col-end-4">
                <h1 className="font-bold text-2xl">{task?.title}</h1>
              </div>
              <div className="content-center justify-self-center col-start-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => setIsEditDialogOpen(true)}
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {task.attachment ?
                      <>
                        <DropdownMenuItem
                          onClick={() => { setIsPreviewOpen(true) }}
                        >
                          View Attachment
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </> : null}
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => setIsDeleteDialogOpen(true)}
                    >
                      Move to Trash
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                  <AlertDialog
                    open={isDeleteDialogOpen}
                    onOpenChange={setIsDeleteDialogOpen}
                  >
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Move to Trash
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to move this task to trash?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90"
                          onClick={handleDelete}
                        >
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                    </DialogTrigger>
                    <EditTaskForm task={task} />
                  </Dialog>
                  <Dialog
                    open={isPreviewOpen}
                    onOpenChange={setIsPreviewOpen}>
                    <DialogContent>
                      <DialogTitle>
                        Attachment Preview
                      </DialogTitle>
                      <div className="aspect-square border rounded-md overflow-hidden cursor-pointer hover:border-primary p-2">
                        <Image
                          src={task.attachment}
                          alt={task.content}
                          className="h-full w-full object-contain object-center transition duration-300 ease-in-out"
                          width={512}
                          height={512}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Label>{task?.statusText}</Label>
            </div>
            <div className="space-y-4">
              <div>
                <p className={`${breakClass}`}>{task.content}</p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <div className="col-start-1 col-end-4">

              </div>
            </div>
            <div className="flex items-center space-x-3">
              {task.status == 1 ?
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[13px] text-link hover:text-link border-link bg-green-500 text-green-50 shadow hover:bg-green-600"
                    >
                      Set In Progress
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Set In Progress
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Set task {task.title} as in progress
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => { handleTaskStatus("In Progress"); }}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                : null}
              {task.status < 3 ?
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-[13px] text-link hover:text-link border-link bg-blue-500 text-green-50 shadow hover:bg-blue-600"
                    >
                      Set to Done
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Set to Done
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Set task {task.title} to done
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => { handleTaskStatus("Done"); }}>
                        Confirm
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                : null}
            </div>
          </div>
        </div>
      </CardContent>
    </Card >
  );
};

export default SubTaskCard;
