import  { useState } from "react";
import { Link } from "react-router-dom";
import { User, LogIn, LogOut } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-700">
          <Link to="/">DailyNotes</Link>
        </h1>

        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              {/* Profile Icon (Without Image) */}
              <Link to="/profile" className="text-gray-700 hover:text-blue-500 transition-all">
                <User size={28} />
              </Link>

              {/* Logout Button */}
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-red-500 hover:text-red-600 transition-all"
              >
                <LogOut size={28} />
              </button>
            </>
          ) : (
            <>
              {/* Login & Register Buttons */}
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
              >
                <User size={20} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
