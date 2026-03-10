'use client';
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Todo = {
  id: string;
  status: string;
};

export default function ToggleStatus({ todo }: { todo: Todo }) {
  const [status, setStatus] = useState(todo.status);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isCompleted = status === "completed";

  const handleUpdate = async () => {
    if (isCompleted) return; // extra protection
    setIsLoading(true);

    const newStatus = "completed";

    await axios.patch(`/api/todo/status/${todo.id}`, {
      status: newStatus,
    });

    setStatus(newStatus);
    router.refresh();
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleUpdate}
      disabled={isCompleted}
      className={`px-3 py-1 text-sm rounded-md transition ${isCompleted
          ? "bg-gray-300 text-black cursor-not-allowed"
          : "bg-yellow-500 text-black hover:bg-yellow-600 cursor-pointer"
        }`}
    >
      {status}
    </button>
  );
}