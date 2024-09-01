
import { UserButton } from '@clerk/nextjs';
import MobileSidebar from "@/components/mobile-sidebar";

const Navbar = () => {
    return(
        <div className="flex w-full items-center p-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 fixed top-0 right-0">
            <MobileSidebar />
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    );
}
export default Navbar;