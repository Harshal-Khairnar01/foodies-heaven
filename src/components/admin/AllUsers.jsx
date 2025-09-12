"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Pagination from "@/utils/Pagination";
import Search from "@/utils/Search";
import UserCard from "./UserCard";

const AllUsers = ({ handleDeleteUser }) => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("userPage")) || 1;
  const searchTerm = searchParams.get("user") || "";
  const ITEM_PER_PAGE = 4;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const url = `/api/user?page=${page}&user=${searchTerm}&limit=${ITEM_PER_PAGE}`;
      const res = await axios.get(url);

      console.log(res.data.users);
      if (res.data) {
        setUsers(res.data.users);
        setCount(res.data.count);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, searchTerm]);

  return (
    <div className="w-full lg:mt-10 md:px-20">
      <div className="w-11/12 mx-auto flex lg:justify-end">
        <Search
          className="bg-[#2e374a] text-white"
          placeholder="Search User..."
          paramKey="user"
        />
      </div>

      <div className=" mt-4 lg:mt-10 w-full lg:px-2 800px:px-10 800px:pl-8 h-[440px] flex justify-center items-center ">
        {loading ? (
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full animate-bounce-150 bg-pink-600"></div>
            <div className="w-2 h-2 rounded-full animate-bounce bg-red-600"></div>
            <div className="w-2 h-2 rounded-full animate-bounce-150 bg-pink-600"></div>
            <div className="w-2 h-2 rounded-full animate-bounce-200 bg-red-600"></div>
            <div className="w-2 h-2 rounded-full animate-bounce-150 bg-pink-600"></div>
          </div>
        ) : (
          <>
            {users.length > 0 ? (
              <div className=" w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 ">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} handleDeleteUser={handleDeleteUser} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                No users found.
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-9/12 mx-auto lg:mb-7 mt-4">
        <Pagination
          count={count}
          ITEM_PER_PAGE={ITEM_PER_PAGE}
          paramKey="userPage"
        />
      </div>
    </div>
  );
};

export default AllUsers;
