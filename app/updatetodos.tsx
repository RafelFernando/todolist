'use client';
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Todo = {
    id: string,
    title: string;
};

export default function UpdateTodo({ todo, disabled }: { todo: Todo; disabled?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.patch(`/api/todo/${todo.id}`, {
            title: title,
        });
        router.refresh();
        setIsOpen(false);
    }

    return (
        <div>
            <button className="btn btn-info btn-sm" onClick={handleModal}>Edit Todo</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Update {todo.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full flex flex-col">
                            <label className="label font-bold mt-3">Todo Name</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Product Name"
                                className="input bg-slate-200 input-bordered w-full"
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}