import { useState } from "react";
import {
  useAddTodo,
  useUpdateTodo,
  useDeleteTodo,
  useTodos
} from "../../hooks/TodoHooks/todoHooks";

import TodoModal from "../Models/TodoModel";
import toast from "react-hot-toast";
import ConfirmModal from "../Models/Confirm";

export default function Todo() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [deleteTodoModel,setDeleteTodoModel] = useState(false);

  const { data, isLoading } = useTodos(page);

  const { mutate: addTodo } = useAddTodo();
  const { mutate: updateTodo } = useUpdateTodo();
  const { mutate: deleteTodo,isPending: isDeleting } = useDeleteTodo();
  const [deleteId,setDeleteId] = useState(null)


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
    setDeleteTodoModel(true)
    setDeleteId(id)
  };

  const handleDeleteTodo = (id)=>{
     deleteTodo(id);
     setDeleteTodoModel(false);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
   <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 w-full max-w-2xl mx-auto">

  {/* Header */}
  <div className="flex justify-between items-center mb-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">My Todos</h2>
      <p className="text-xs text-gray-400 mt-0.5">Manage your tasks</p>
    </div>
    <button
      onClick={() => setIsModalOpen(true)}
      className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-sm font-medium px-4 py-2 rounded-xl shadow-sm"
    >
      <span className="text-lg leading-none">+</span>
      <span>Add Todo</span>
    </button>
  </div>

  {/* Search & Filter */}
  <div className="flex flex-col sm:flex-row gap-2 mb-5">
    <div className="relative flex-1">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
    </div>

    <div className="flex rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800 text-sm">
      {["all", "pending", "completed"].map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`flex-1 sm:flex-none px-3 py-2.5 capitalize transition-all font-medium ${
            filter === f
              ? "bg-blue-600 text-white"
              : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  </div>

  {/* Todo List */}
  <ul className="space-y-2 mb-5">
    {filteredTodos?.map((todo) => (
      <li
        key={todo.id}
        className="group flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-100 dark:hover:border-gray-700 hover:bg-blue-50/40 dark:hover:bg-gray-800/60 transition-all"
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Custom checkbox */}
          <button
            onClick={() => handleToggle(todo)}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              todo.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300 dark:border-gray-600 hover:border-blue-400"
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>

          <span
            onClick={() => handleToggle(todo)}
            className={`cursor-pointer text-sm truncate transition-all ${
              todo.completed
                ? "line-through text-gray-400 dark:text-gray-500"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            {todo.todo}
          </span>
        </div>

        {/* Actions — always visible on mobile, hover on desktop */}
        <div className="flex items-center gap-1 flex-shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleEdit(todo)}
            className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => handleDelete(todo.id)}
            className="p-1.5 rounded-lg text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </li>
    ))}
  </ul>

  {/* Empty State */}
  {filteredTodos?.length === 0 && (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No todos found</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or filter</p>
    </div>
  )}

  {/* Pagination */}
  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
    <button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors disabled:opacity-40"
      disabled={page === 1}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Prev
    </button>

    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-lg">
      Page {page}
    </span>

    <button
      onClick={() => setPage((p) => p + 1)}
      className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
    >
      Next
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
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

    {deleteTodoModel && (
    <ConfirmModal
      onCancel={()=>{setDeleteTodoModel(false)}}
      onConfirm={()=>{handleDeleteTodo(deleteId)}}
      title={"Delete Todo?"}
      message={"Do you want to delete Todo"}
      loading={isDeleting}
    />
  )}
</div>
  );
}