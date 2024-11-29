"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  BookOpenText,
  Code,
  FileText,
  ImageIcon,
  ImagePlay,
  MessageSquare,
  Music,
  Paintbrush,
  ScrollText,
  VideoIcon
} from "lucide-react";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/Conversation",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/Code",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-purple-700 via-violet-500 to-purple-300"
  },
  {
    label: "Text to Image",
    icon: ImageIcon,
    href: "/Image",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500"
  },
  {
    label: "Video Summarize",
    icon: ScrollText,
    href: "/VideoSummarize",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500",
  },
  {
    label: "Chat with PDF",
    icon: BookOpenText,
    href: "/pdfChat",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500",
  },
  {
    label: "Resume Builder",
    icon: FileText,
    href: "/Resume",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500",
  },
  {
    label: "Text to Video",
    icon: VideoIcon,
    href: "/Video",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-pink-300 via-blue-300 to-green-300",
  },
  {
    label: "Text to Music",
    icon: Music,
    href: "/Music",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-blue-300 via-blue-400 to-teal-500",
  }
]

const DashboardPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen py-10">
      <div className="text-center mb-8 mt-14 mx-4 md:mx-20">
        {session && (
          <div className="text-start">
            <p className="mb-2 text-2xl md:text-4xl font-bold text-white mx-auto text-start inline-block font-lora">
              Hey {session.user?.name}, welcome to AI Buddy!
            </p>
            <p className="text-lg md:text-xl text-gray-300 font-light mt-2">
              Your all-in-one AI platform for seamless conversation, creative content, and efficient tools.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 px-4 md:px-20 lg:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="font-roboto p-4 md:p-6 border border-gray-700 flex flex-col items-center justify-center hover:shadow-lg transition-all cursor-pointer bg-gray-800 hover:bg-gray-700 text-white transform hover:scale-105"
          >
            <div className={cn("p-4 w-fit rounded-full border border-gray-500", tool.bgColor)}>
              <tool.icon className={cn("w-12 h-12", tool.color)} />
            </div>
            <div className="font-semibold text-lg text-center mt-4">
              {tool.label}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
