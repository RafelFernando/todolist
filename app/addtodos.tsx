"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function AddTodos() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const router = useRouter();

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("/api/todo", { title });
            router.refresh();
            setIsOpen(false);
            setTitle("");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={handleModal}>Add Todo</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="text-black font-bold text-lg">Tambah Todo</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full flex flex-col">
                            <label className="label text-gray-500 font-bold mt-3">Todo Name</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                placeholder="Todo Name"
                                className="input bg-slate-200 text-black input-bordered w-full"
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
    )
}