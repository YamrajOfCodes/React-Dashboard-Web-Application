import { useState } from "react";
import {
  useAddTodo,
  useUpdateTodo,
  useDeleteTodo,
  useTodos
} from "../../hooks/TodoHooks/todoHooks";

import TodoModal from "../Models/TodoModel";
import toast from "react-hot-toast";

export default function Todo() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const { data, isLoading } = useTodos(page);

  const { mutate: addTodo } = useAddTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const filteredTodos = data?.todos
    ?.filter((todo) =>
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });


  const handleSubmit = (value) => {
    if (editingTodo) {
      updateTodo({
        id: editingTodo.id,
        data: { todo: value },
      });
    } else {
      if(value.trim() === ""){
        toast.error("please add input");
        return;
      }
      addTodo({
        todo: value,
        completed: false,
        userId: 1,
      });
    }

    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleToggle = (todo) => {
    updateTodo({
      id: todo.id,
      data: { completed: !todo.completed },
    });
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this todo?")) {
      deleteTodo(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-5 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Todo Management</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded"
        >
          + Add Todo
        </button>
      </div>


      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-40"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

     
      <ul className="space-y-2">
        {filteredTodos?.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center border p-3 rounded-lg"
          >
            <span
              onClick={() => handleToggle(todo)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.todo}
            </span>

            <div className="flex gap-3 text-sm">
              <button
                onClick={() => handleEdit(todo)}
                className="text-blue-500"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {filteredTodos?.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No todos found
        </p>
      )}

      <div className="flex justify-between mt-5">
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

      {/* Modal */}
      {isModalOpen && (
        <TodoModal
          onClose={() => {
            setIsModalOpen(false);
            setEditingTodo(null);
          }}
          onSubmit={handleSubmit}
          initialValue={editingTodo?.todo}
        />
      )}
    </div>
  );
}