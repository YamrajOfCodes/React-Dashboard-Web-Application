import { useState } from "react";
import {
  useUsers,
  useDeleteUser,
  useAddUser,
  useUpdateUser,
} from "../../hooks/Users/usersHooks";
import UserModal from "../Models/UserModel";
import ConfirmModal from "../Models/Confirm";

export default function Users() {
  const { data, isLoading } = useUsers();

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: addUser } = useAddUser();
  const { mutate: updateUser } = useUpdateUser();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [deleteUserId, setDeleteUserId] = useState(null);

  const limit = 5;

  if (isLoading) {
    return <p className="text-center mt-10">Loading users...</p>;
  }

  const users = data?.users || [];

  const filteredUsers = users
    .filter((u) => {
      const name = `${u.firstName} ${u.lastName}`.toLowerCase();
      return (
        name.includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .filter((u) => {
      if (genderFilter === "male") return u.gender === "male";
      if (genderFilter === "female") return u.gender === "female";
      return true;
    });

  const start = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(start, start + limit);

  const handleSubmit = (formData) => {
    if (editingUser) {
      updateUser({ id: editingUser.id, data: formData });
    } else {
      addUser(formData);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = () => {
    deleteUser(deleteUserId);
    setDeleteUserId(null);
  };

  const avatarColors = [
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-amber-100", text: "text-amber-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
  ];

  const getInitials = (u) =>
    `${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.toUpperCase();

  const getGenderBadge = (gender) =>
    gender === "female"
      ? "bg-pink-100 text-pink-700"
      : "bg-blue-100 text-blue-700";

  return (
    <div className="bg-white p-5 rounded-xl shadow">
     
<div className="flex flex-wrap justify-between items-center gap-3 mb-4">
  <h2 className="text-lg font-semibold">User Management</h2>
  <button
    onClick={() => {
      setEditingUser(null);
      setIsModalOpen(true);
    }}
    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
  >
    + Add User
  </button>
</div>


<div className="flex flex-col sm:flex-row gap-2 mb-4">
  <div className="relative flex-1">
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
    <input
      type="text"
      placeholder="Search by name or email..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setPage(1);
      }}
      className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
    />
  </div>

  <select
    value={genderFilter}
    onChange={(e) => {
      setGenderFilter(e.target.value);
      setPage(1);
    }}
    className="w-full sm:w-36 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors bg-white text-gray-700"
  >
    <option value="all">All Genders</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
</div>

     
      <div className="flex flex-col gap-3 md:hidden">
        {paginatedUsers.map((u, index) => {
          const color = avatarColors[index % avatarColors.length];
          return (
            <div
              key={u.id}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${color.bg} ${color.text}`}
                >
                  {getInitials(u)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {u.firstName} {u.lastName}
                  </p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium mt-0.5 ${getGenderBadge(u.gender)}`}
                  >
                    {u.gender.charAt(0).toUpperCase() + u.gender.slice(1)}
                  </span>
                </div>
              </div>

           
              <div className="border-t border-gray-100 pt-3 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 w-12 shrink-0 pt-0.5">
                    Email
                  </span>
                  <span className="text-xs text-gray-600 break-all">{u.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 w-12 shrink-0">
                    Phone
                  </span>
                  <span className="text-xs text-gray-600">{u.phone}</span>
                </div>
              </div>

      
              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    setEditingUser(u);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 py-2 rounded-lg transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeleteUserId(u.id)}
                  className="flex-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:block border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full table-fixed border-collapse text-sm">
          <colgroup>
            <col className="w-[24%]" />
            <col className="w-[26%]" />
            <col className="w-[18%]" />
            <col className="w-[12%]" />
            <col className="w-[20%]" />
          </colgroup>
          <thead>
            <tr className="bg-gray-50">
              {["Name", "Email", "Phone", "Gender", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((u, index) => {
              const color = avatarColors[index % avatarColors.length];
              const isLast = index === paginatedUsers.length - 1;
              return (
                <tr
                  key={u.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    !isLast ? "border-b border-gray-100" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 ${color.bg} ${color.text}`}
                      >
                        {getInitials(u)}
                      </div>
                      <span className="text-gray-800 font-medium truncate">
                        {u.firstName} {u.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 truncate">{u.email}</td>
                  <td className="px-4 py-3 text-gray-500">{u.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${getGenderBadge(u.gender)}`}
                    >
                      {u.gender.charAt(0).toUpperCase() + u.gender.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setEditingUser(u);
                        setIsModalOpen(true);
                      }}
                      className="text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md mr-2 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteUserId(u.id)}
                      className="text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      {paginatedUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No users found</p>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>
        <span className="text-sm">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <UserModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingUser(null);
          }}
          onSubmit={handleSubmit}
          initialData={editingUser}
        />
      )}

      {deleteUserId && (
        <ConfirmModal
          title="Delete User"
          message="This action cannot be undone. Are you sure?"
          onConfirm={handleDelete}
          onCancel={() => setDeleteUserId(null)}
          loading={isDeleting}
        />
      )}
    </div>
  );
}