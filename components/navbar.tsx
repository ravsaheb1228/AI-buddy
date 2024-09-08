'use client';
import { useState, useEffect, useRef } from "react";
import MobileSidebar from "@/components/mobile-sidebar";
import { signOut } from "next-auth/react";
import UserInfo from "./userButton";
import { ChevronRight, ChevronDown, LogOut } from "lucide-react";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close the dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/' }); // Redirect to the landing page after logout
    };

    return (
        <div className="flex w-full items-center p-4 bg-black fixed top-0 right-0 z-10 border-b border-slate-600">
            {/* Left section with logo and title */}
            <div className="flex flex-row items-center">
                <img src={"/logo.png"} alt={"Logo"} className="rounded-full w-8 h-8" />
                <h1 className="text-xl font-bold font-sans text-white ml-4 tracking-wider whitespace-nowrap">
                    AI Buddy
                </h1>
            </div>

            {/* Mobile sidebar */}
            <MobileSidebar />

            {/* Right section with dropdown and user info */}
            <div className="flex w-full justify-end">
                <div className="relative flex w-full justify-end space-x-3 items-center">
                    <UserInfo />
                    <div onClick={toggleDropdown}>
                        {dropdownOpen ? (
                            <ChevronDown
                                className="text-white w-5 h-5 cursor-pointer"
                                aria-label="Collapse menu"
                            />
                        ) : (
                            <ChevronRight
                                className="text-white w-5 h-5 cursor-pointer"
                                aria-label="Expand menu"
                            />
                        )}
                    </div>
                    {dropdownOpen && (
                        <div ref={dropdownRef} className="absolute top-10 right-0 bg-gray-800 text-white rounded shadow-lg min-w-[195px] max-w-[250px]">
                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="flex flex-row w-fit text-left px-4 py-2 items-center space-x-2"
                                    aria-label="Logout"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
