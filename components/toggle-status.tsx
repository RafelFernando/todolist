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
  const router = useRouter();

  const isCompleted = status === "completed";

  const handleUpdate = async () => {
    if (isCompleted) return; // extra protection

    const newStatus = "completed";

    await axios.patch(`/api/todo/status/${todo.id}`, {
      status: newStatus,
    });

    setStatus(newStatus);
    router.refresh();
  };

  return (
    <button
      onClick={handleUpdate}
      disabled={isCompleted}
      className={`btn btn-sm ${
        isCompleted ? "opacity-100 text-black cursor-not-allowed" : "btn-warning"
      }`}
    >
      {status}
    </button>
  );
}