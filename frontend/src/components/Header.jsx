import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));

    const logout = () => {
        sessionStorage.clear();
        navigate("/login");
    };

    return (
        <div className="bg-blue-600 text-white p-4 flex justify-between">
            <h2 className="text-lg font-semibold">MERN Dashboard</h2>

            {user ? (
                <div className="flex items-center gap-4">
                    <span>Welcome {user.name}</span>
                    <button
                        onClick={logout}
                        className="bg-red-500 px-3 py-1 rounded"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => navigate("/login")}
                    className="bg-white text-blue-600 px-3 py-1 rounded"
                >
                    Login
                </button>
            )}
        </div>
    );
};

export default Header;
