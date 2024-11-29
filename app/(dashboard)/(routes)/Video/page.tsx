"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";

const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});

export default function VideoPage() {
  const router = useRouter();
  const [video, setVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setVideo(null); // Reset video on new generation

      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]); // Assuming the video URL is in the first index

      form.reset();
    } catch (error: any) {
      console.error("Error generating video:", error);
      alert("Failed to generate video. Please try again."); // User-friendly error message
    } finally {
      setIsLoading(false);
      router.refresh(); // Refresh the page to show the latest data
    }
  };

  return (
    <div className="mt-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen">
      <div className="w-full max-w-2xl text-white">
        <Heading
          title="Video Generator"
          description="Generate videos from text prompts using advanced AI."
          icon={VideoIcon}
          iconColor="text-indigo-500"
          bgColor="bg-indigo-500/10"
        />
      </div>
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField 
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10 text-white">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-slate-800 px-2"
                      disabled={isLoading}
                      placeholder="Enter a video prompt"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-8 p-8">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {!video && !isLoading && (
          <Empty label="No video generated" />
        )}
        {video && (
          <div className="p-4 rounded-lg bg-gray-800">
            <video controls className="rounded-lg border shadow-lg w-full max-w-[600px] max-h-[340px]">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}
