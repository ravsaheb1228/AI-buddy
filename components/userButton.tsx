import { useSession } from "next-auth/react";
import Image from 'next/image'; // Ensure correct import

export default function UserInfo() {
    const { status, data: session } = useSession();

    return (
        <div className="flex flex-row items-center justify-between space-x-3">
            <Image
                className="rounded-full"
                src={session?.user?.image || '/default-image.png'} // Ensure a fallback if image is null
                alt="User Image" // Required prop for next/image
                width={25}
                height={25}
            />
            <div>
                <span className='text-white'> {session?.user?.name}</span>
            </div>
        </div>
    )
}
