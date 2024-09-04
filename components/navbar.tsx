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

    return (
        <div className="flex w-full items-center p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 fixed top-0 right-0 z-10">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                <div className="relative flex w-full justify-end space-x-3 items-center">
                    <UserInfo />
                    {dropdownOpen ? (
                        <ChevronDown
                            onClick={toggleDropdown}
                            className="text-white w-5 h-5 cursor-pointer"
                        />
                    ) : (
                        <ChevronRight
                            onClick={toggleDropdown}
                            className="text-white w-5 h-5 cursor-pointer"
                        />
                    )}
                    {dropdownOpen && (
                        <div ref={dropdownRef} className="absolute top-10 right-0 bg-gray-800 text-white rounded shadow-lg min-w-[195px]">
                            <div>
                                <button
                                    onClick={() => signOut()}
                                    className="flex flex-row w-fit text-left px-4 py-2 "
                                >
                                    <LogOut />
                                    Logout
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
