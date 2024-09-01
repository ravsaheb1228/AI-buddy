import Image from "next/image";

interface EmptyProps {
    label: string;
}
export const Empty = ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="relative h-72 w-72 animate-bounce">
                <Image alt="Empty" fill src="/file.png"/>
            </div>
            <p className="text-muted-foreground text-sm text-center">
                {label}
            </p>
        </div>
    );
}