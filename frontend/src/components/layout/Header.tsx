import { HeaderProps } from "../../types";
import { useNavigate } from "react-router";

const Header = ({ userName }: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-black">Financial Portfolio</h1>
            <div className="flex items-center space-x-4">
                <h3 className="text-xl font-bold text-black">Welcome, {userName}!</h3>
                <button
                    onClick={() => navigate("/")}
                    className="px-2 py-1 bg-black text-white text-sm rounded shadow-md hover:bg-gray-800 transition duration-300 cursor-pointer"
                >
                Logout
                </button>
            </div>
        </div>
    )
}

export default Header;