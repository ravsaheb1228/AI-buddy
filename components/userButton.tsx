import { useSession } from "next-auth/react";
import Image from 'next/image'; // Ensure correct import
import { UserAvatar } from "./user-avatar";

export default function UserInfo() {
    const { status, data: session } = useSession();

    return (
        <div className="flex flex-row items-center justify-between space-x-3">
            {session?.user?.image ? (
                <Image
                    className="rounded-full"
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"} // Alt text
                    width={25}
                    height={25}
                />
            ) : (
                <div
                    className="flex items-center justify-center bg-emerald-600 text-white rounded-full w-8 h-8"
                >
                    {session?.user?.name ? session.user.name[0].toUpperCase() : "?"}
                </div>
            )}
            <div>
                <span className='text-white'> {session?.user?.name}</span>
            </div>
        </div>
    )
}
