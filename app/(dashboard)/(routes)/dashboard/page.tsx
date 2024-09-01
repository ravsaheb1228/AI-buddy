"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  ArrowRight,
  Code, 
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
    color: "text-cyan-200",
    bgColor: "bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-400", 
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/Code",
    color: "text-purple-200",
    bgColor: "bg-gradient-to-r from-purple-700 via-violet-500 to-purple-300" 
  },
  {
    label: "Text to Image",
    icon: ImageIcon,
    href: "/Image",
    color: "text-cyan-200",
    bgColor: "bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500" 
  },
  {
    label: "Video summarize",
    icon: ScrollText,
    href: "/Summarize",
    color: "text-cyan-200",
    bgColor: "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500",
  },  
  {
    label: "Text to Video",
    icon: VideoIcon,
    href: "/Video",
    color: "text-pink-100",
    bgColor: "bg-gradient-to-r from-pink-300 via-blue-300 to-green-300", 
  },
  {
    label: "Text to Music",
    icon: Music,
    href: "/Music",
    color: "text-blue-200",
    bgColor:  "bg-gradient-to-r from-blue-300 via-blue-400 to-teal-500", 
  }
]

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen py-10">
      <div className="text-center mb-8 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white font-roboto">
          AI Tools for the Next Generation
        </h2>
        <p className="text-gray-300 font-light text-base md:text-lg font-montserrat mt-2">
          Empowering the innovators of tomorrow with cutting-edge AI tools today.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-20 lg:px-32">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="font-roboto p-6 border border-gray-700 flex flex-col items-center justify-center hover:shadow-lg transition-all cursor-pointer bg-gray-800 hover:bg-gray-700 hover:shadow-indigo-500 text-white transform hover:scale-100"
          >
            <div className={cn("p-4 w-fit rounded-full", tool.bgColor)}>
              <tool.icon className={cn("w-12 h-12", tool.color)} />
            </div>
            <div className=" font-semibold text-lg text-center">
              {tool.label}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
