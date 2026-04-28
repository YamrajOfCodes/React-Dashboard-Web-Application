import { useState } from "react";
import { useLogout } from "../../hooks/authHooks/authHooks";

import Todo from "../../components/Todo/Todos";
import Users from "../../components/Users/Users";

export default function Dashboard() {
  const { logout } = useLogout();
  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("todos");

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Dashboard</h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user?.firstName}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-6 pt-4 flex gap-4">
        <button
          onClick={() => setActiveTab("todos")}
          className={`px-4 py-2 rounded ${
            activeTab === "todos"
              ? "bg-blue-500 text-white"
              : "bg-white border"
          }`}
        >
          Todos
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded ${
            activeTab === "users"
              ? "bg-blue-500 text-white"
              : "bg-white border"
          }`}
        >
          Users
        </button>
      </div>

      {/* Content */}
      <main className="p-6">
        {activeTab === "todos" ? <Todo /> : <Users />}
      </main>
    </div>
  );
}