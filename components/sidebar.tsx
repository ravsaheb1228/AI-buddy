"use client";

import  Image  from "next/image";
import  Link  from "next/link";

import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { 
    Code, 
    ImageIcon, 
    ImagePlay, 
    LayoutDashboard, 
    MessageSquare, 
    Music, 
    ScrollText, 
    Settings, 
    VideoIcon 
} from "lucide-react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500", 
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/Conversation",
        color: "text-violet-500", 
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/Code",
        color: "text-green-700", 
    },
    {
        label: "Text to Image",
        icon: ImageIcon,
        href: "/Image",
        color: "text-pink-700", 
    },
    {
        label: "Video summarizer",
        icon: ScrollText,
        href: "/Summarize",
        color: "text-cyan-700", 
    },
    {
        label: "Image to art",
        icon: VideoIcon,
        href: "/Art",
        color: "text-cyan-700", 
    },
    {
        label: "Text to Video",
        icon: VideoIcon,
        href: "/Video",
        color: "text-orange-700", 
    },
    {
        label: "Image to Video",
        icon: ImagePlay,
        href: "/Image-to-Video",
        color: "text-orange-500", 
    },
    {
        label: "Text to Music",
        icon: Music,
        href: "/Music",
        color: "text-emerald-500", 
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/Settings", 
    }

]
const Sidebar = () => {
    const pathname = usePathname();
    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-2 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill src={"/logo.png"} alt={"Logo"} />
                    </div>
                    <h1 className="text-2xl font-bold font-roboto">
                        AI Buddy
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link 
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-2 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", 
                            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3",route.color)} />
                                 {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Sidebar;