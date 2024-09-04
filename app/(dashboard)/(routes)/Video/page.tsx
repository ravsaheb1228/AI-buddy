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
  const [video, setVideo] = useState<string>();
  const [generationId, setGenerationId] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      setGenerationId(undefined);

      const response = await axios.post("/api/video", values);
      setGenerationId(response.data.generationId);

      // Start polling for video generation status
      pollGenerationStatus(response.data.generationId);

      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  const pollGenerationStatus = async (id: string) => {
    try {
      const response = await axios.get(`/api/video?generationId=${id}`);
      if (response.status === 202) {
        // Generation still in progress, poll again after a delay
        setTimeout(() => pollGenerationStatus(id), 5000);
      } else if (response.status === 200) {
        // Generation complete, set the video URL
        setVideo(response.data.videoUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Heading
        title="Video Generator"
        description="Generate videos from text prompts using advanced AI."
        icon={VideoIcon}
        iconColor="text-indigo-500"
        bgColor="bg-indigo-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
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
      <div className="space-y-4 mt-8">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {!video && !isLoading && !generationId && (
          <Empty label="No video generated" />
        )}
        {generationId && !video && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <p>Video generation in progress...</p>
          </div>
        )}
        {video && (
          <video controls className="w-full mt-8">
            <source src={video} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}