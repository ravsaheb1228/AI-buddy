import { useSession } from "next-auth/react";
import Image from 'next/image'; // Ensure correct import

export const UserAvatar = () => {
    const { status, data: session } = useSession();

    // Fallback image if user's avatar is not available
    const fallbackImage = '/default-avatar.png'; // Path to a default avatar image

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
                    className="flex items-center justify-center bg-gray-200 text-gray-700 rounded-full w-8 h-8"
                >
                    {session?.user?.name ? session.user.name[0].toUpperCase() : "?"}
                </div>
            )}
        </div>
    );
}
