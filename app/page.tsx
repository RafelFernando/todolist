import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import AddTodos from './addtodos';
import {
  IoPencilOutline, IoTrashOutline
} from "react-icons/io5"
import UpdateTodo from './updatetodos';
import DeleteTodos from './deletetodos';
import ToggleStatus from '@/components/toggle-status';

// koneksi database
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({ adapter });

// ambil todo dari database
const getTodos = async () => {
  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return todos;
};

export default async function Home() {
  // inisialisasi todos
  const todos = await getTodos();

  return (
    <div className="max-w-4xl p-10 md:pd-0 mx-auto mt-20">
      <div className="flex justify-between">
        <div className="">

        </div>
        <div className="">
          <h1 className="flex justify-center text-3xl font-bold uppercase text-yellow-500">My Todo List</h1>
        </div>
        <div className="">
          <AddTodos />
        </div>
      </div>

      <div className="my-10">
        <ul>
          {todos.map((todo) => {
            const isCompleted = todo.status === "completed";

            return (
              <li
                key={todo.id}
                className={`flex justify-between p-2 transition-all ${isCompleted
                    ? "bg-gray-200 text-gray-500 opacity-60 pointer-events-none"
                    : "text-black"
                  }`}
              >
                <div className={isCompleted ? "line-through" : ""}>
                  {todo.title}
                </div>

                <div className="flex gap-2 ">
                  <UpdateTodo todo={todo} disabled={isCompleted} />
                  <DeleteTodos todo={todo} disabled={isCompleted} />
                  <ToggleStatus todo={todo} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
}
