import React from "react";
import { FaUser, FaUsers } from "react-icons/fa";

const UserCard = ({ user,handleDeleteUser }) => {
  return (
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden flex flex-col items-center p-2 md:p-4 text-center">
      <div className=" w-20 h-20 md:w-32  md:h-32 rounded-full overflow-hidden bg-gray-200 mb-4 flex items-center justify-center">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUser className=" w-12 h-12 md:w-16 md:h-16 text-gray-400" />
        )}
      </div>
      <h3 className="md:text-lg text-base font-semibold text-gray-800 truncate w-full  md:px-2">
        {user.name}
      </h3>
      <p className=" text-[8px] md:text-sm text-gray-500   w-full px-2">{user.email}</p>
      <button
        onClick={() => handleDeleteUser(user.id)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition-colors duration-200 shadow-md"
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;
