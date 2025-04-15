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
import useAddTask from "@/hooks/auth/tasks/useAddTask";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddTaskForm = () => {
  const { addTask, isAddTaskLoading } = useAddTask();
  const [inputValue, setInputValue] = useState("");
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const form = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      title: "",
      content: ""
    },
  });

  const handleImageUpload = async (event, onChange) => {
    const imageFile = event.target.files[0];
    setImage(imageFile);
  };

  function onSubmit(values) {

    setInputValue("");
    if (image != null) {
      values = { ...values, attachment: image }
    }
    addTask({
      payload: values,
      form: form,
    });
  }

  return (
    <DialogContent className="sm:max-w-[425px]" >
      <DialogHeader>
        <DialogTitle>
          Tasks
        </DialogTitle>
        <DialogDescription>
          Add task
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
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(event) => {
                      handleImageUpload(event, onChange);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <Button className={"col-span-1 col-start-3"} type="submit" disabled={isAddTaskLoading}>
              Add Task
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default AddTaskForm;
