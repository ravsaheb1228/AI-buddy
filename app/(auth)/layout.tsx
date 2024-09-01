
const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 h-screen">
            {children}
        </div>
    );
}

export default AuthLayout;
