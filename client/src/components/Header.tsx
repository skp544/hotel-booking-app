import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { success } = useAppContext();

  return (
    <div className=" bg-blue-800 py-6 ">
      <div className=" container mx-auto ">
        <div className=" flex justify-between border-b border-blue-300 pb-4">
          <span className=" text-3xl text-white font-bold tracking-tight">
            <Link to={"/"}>Holidays</Link>
          </span>
          <span className=" flex space-x-2">
            {success ? (
              <div className=" flex items-center gap-4">
                <Link
                  to={"/my-bookings"}
                  className=" flex items-center justify-center text-blue-600 px-3 py-1 font-bold rounded-md bg-white hover:bg-gray-100 transition-all duration-200 text-nowrap"
                >
                  My Bookings
                </Link>
                <Link
                  to={"/my-hotels"}
                  className=" flex items-center justify-center text-blue-600 px-3 py-1 font-bold rounded-md bg-white hover:bg-gray-100 transition-all duration-200 text-nowrap"
                >
                  My Hotels
                </Link>
                <button className=" flex items-center justify-center text-blue-600 px-3 py-1 font-bold rounded-md bg-white hover:bg-gray-100 transition-all duration-200 text-nowrap">
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to={"/sign-in"}
                className=" flex items-center justify-center text-blue-600 px-3 py-1 font-bold rounded-md bg-white hover:bg-gray-100 transition-all duration-200"
              >
                Sign In
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
