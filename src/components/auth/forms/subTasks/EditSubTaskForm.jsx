"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import taskSchema from "@/data/tasks/validation/taskSchema";
import useEditTask from "@/hooks/auth/tasks/useEditTask";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditSubTaskForm = ({ task }) => {
  const { editTask, isEditTaskLoading } = useEditTask();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const form = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      content: "",
      status: "",
    },
  });

  useEffect(() => {
    let defaultValues = {};
    defaultValues.title = task?.title;
    defaultValues.content = task?.content;
    form.reset({ ...defaultValues });
  }, []);

  function onSubmit(values) {
    setInputValue("");

    editTask({
      title: task.title,
      payload: values,
      form: form,
    });
  }


  const [dialogStatus, setDialogStatus] = useState(false);

  return (
    <DialogContent className="sm:max-w-[425px]" >
      <DialogHeader>
        <DialogTitle>
          Tasks
        </DialogTitle>
        <DialogDescription>
          Update task
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={"Task Title"}
                    value={inputValue}
                    onChange={handleInputChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">
                  Content
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={"Task Content"}
                    value={inputValue}
                    onChange={handleInputChange}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="attachment"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm">
                  Image Attachment
                </FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/jfif"
                    onChange={(event) => {
                      // handlePrimaryImageChange(event, onChange);
                    }}
                  />
                </FormControl>

                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <Button className={"col-span-1 col-start-3"} type="submit" disabled={isEditTaskLoading}>
              Update
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditSubTaskForm;
