// components/UserSearchList.tsx
"use client";

import { useState, useTransition } from "react";
import { updateUserRole, searchUsers } from "@/actions/adminActions";

export default function UserSearchList({
  initialUsers,
}: {
  initialUsers: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  const handleCancelSearch = () => {
    setSearchTerm("");
    setUsers(initialUsers);
  };

  const handleSearch = async (query: string) => {
    if (query.length < 2) {
      setUsers(initialUsers);
      return;
    }
    const results = await searchUsers(query);
    setUsers(results);
  };

  const toggleRole = (userId: string, currentRole: string) => {
    const newRole = currentRole === "ADMIN" ? "MEMBER" : "ADMIN";
    startTransition(async () => {
      await updateUserRole(userId, newRole);
      // Update local state to show change immediately
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)),
      );
    });
  };

  return (
    <div className="space-y-6 bg-white pb-2 rounded ">
      <div className=" w-full  flex items-center">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className=" w-[90%] p-3 border rounded-lg shadow-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleSearch(e.target.value);
          }}
        />
        <button
          onClick={handleCancelSearch}
          className=" w-[10%] px-4 py-4 text-sm font-medium text-gray-100 bg-gray-500 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          Clear
        </button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">User</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="font-medium">{user.name || "No Name"}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-bold ${
                      user.role === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleRole(user.id, user.role)}
                    disabled={isPending}
                    className="text-blue-600 hover:underline text-sm font-medium disabled:opacity-50"
                  >
                    {user.role === "ADMIN"
                      ? "Demote to Member"
                      : "Promote to Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
