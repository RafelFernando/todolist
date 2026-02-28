'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Todo = {
    id: string;
    title: string;
}

export default function DeleteTodos({ todo, disabled }: { todo: Todo; disabled?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleDelete = async (id: string) => {
        await axios.delete(`/api/todo/${id}`);
        router.refresh();
        setIsOpen(false);
    }

    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleModal}>Delete</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Are you sure to delete this {todo.title} ?</h3>
                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>No</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleDelete(todo.id)}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}