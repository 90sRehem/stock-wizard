import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import {
  Form,
  LoaderFunctionArgs,
  useLocation,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import {
  Button,
  Dialog,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "ui";
import { z } from "zod";

const taskFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .optional(),
  status: z
    .enum(["backlog", "in-progress", "done", "todo", "canceled"])
    .optional(),
  label: z.enum(["bug", "feature", "documentation"]).optional(),
  priority: z.enum(["high", "medium", "low"]).optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

const defaultValues: Partial<TaskFormValues> = {
  title: "",
  status: undefined,
  label: undefined,
  priority: undefined,
};

export async function addTaskAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const fields = Object.fromEntries(formData.entries());
  console.log("🚀 ~ file: add-task.tsx:47 ~ addTaskAction ~ fields:", fields);
  return fields;
}

export function AddTask() {
  const location = useLocation();
  const navigate = useNavigate();
  const submit = useSubmit();
  const open = location.pathname.includes("add-task");
  const close = () => navigate("../");

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: TaskFormValues) => {
    submit(data, {
      method: "post",
    });
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Close onClick={close} />
        <Dialog.Header>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </Dialog.Description>
        </Dialog.Header>
        <FormProvider {...form}>
          <Form
            id="add-task"
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Label</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bug">Bug</SelectItem>
                          <SelectItem value="feature">Feature</SelectItem>
                          <SelectItem value="documentation">
                            Documentation
                          </SelectItem>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="backlog">Backlog</SelectItem>
                          <SelectItem value="in-progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="done">Done</SelectItem>
                          <SelectItem value="todo">Todo</SelectItem>
                          <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Dialog.Footer>
              <Button type="submit">Save changes</Button>
            </Dialog.Footer>
          </Form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
