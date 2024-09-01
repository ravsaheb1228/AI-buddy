import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/empty";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/heading";
import { CameraIcon } from "lucide-react";

export default function ImageToVideoPage() {
  const [file, setFile] = useState<File | null>(null);
  const [generationID, setGenerationID] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(undefined); // Clear any previous errors

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("/api/image-to-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setGenerationID(response.data.generationID);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("An error occurred while generating the video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVideo = async () => {
    if (!generationID) return;

    setLoading(true);
    setError(undefined); // Clear any previous errors

    try {
      const response = await axios.get(`/api/image-to-video?generationID=${generationID}`, {
        responseType: "blob",
      });

      const videoBlob = new Blob([response.data], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error("Error fetching video:", error);
      setError("An error occurred while fetching the video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch video once generationID is available
  useEffect(() => {
    if (generationID) {
      fetchVideo();
    }
  }, [generationID]);

  return (
    <div>
      <Heading
        title="Image to Video Generator"
        description="Upload an image to generate a video."
        icon={CameraIcon}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />
      <div className="px-4 lg:px-8">
        <form onSubmit={handleSubmit} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-10">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            />
          </div>
          <Button
            type="submit"
            className="col-span-12 lg:col-span-2 w-full"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Video"}
          </Button>
        </form>
      </div>
      <div className="space-y-4 mt-8">
        {loading && !videoUrl && !error && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {error && (
          <div className="p-4 rounded-lg w-full text-red-600 bg-red-100">
            {error}
          </div>
        )}
        {!videoUrl && !loading && !error && (
          <Empty label="No video generated yet. Please upload an image and click 'Generate Video'." />
        )}
        {videoUrl && (
          <div>
            <video controls className="w-full mt-8">
              <source src={videoUrl} type="video/mp4" />
            </video>
            <a
              href={videoUrl}
              download="video.mp4"
              className="block mt-4 text-blue-600"
            >
              Download Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
