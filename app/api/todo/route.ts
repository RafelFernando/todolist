import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import type { todo } from "@/app/generated/prisma/client";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});
const prisma = new PrismaClient({ adapter });

export const POST = async (req: Request) => {
    const body = await req.json();
    const { title } = body;

    try {
        const todo = await prisma.todo.create({
            data: { title },
        });
        return NextResponse.json(todo);
    } catch (error) {
        console.error("Error adding todo:", error);
        return NextResponse.json({ error: "Failed to add todo" }, { status: 500 });
    }
};