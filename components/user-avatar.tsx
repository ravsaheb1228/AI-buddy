import { UserButton, useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = () => {
    const { user } = useUser();
    // console.log(user);
    return (
        <Avatar className="h-8 w-8">
            {user?.imageUrl ? (
                <AvatarImage src={user.imageUrl} alt="User Profile Image" />
            ) : (
                <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                </AvatarFallback>
            )}
        </Avatar>
    );
};