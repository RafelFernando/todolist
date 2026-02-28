import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import type { todo } from "@/app/generated/prisma/client";

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
const prisma = new PrismaClient({ adapter });

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const body: todo = await request.json();
  const { id } = await context.params; 

  if (!id) {
    return NextResponse.json(
      { message: "Todo ID is required" },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.update({
    where: {
      id
    },
    data: {
      title: body.title,
    },
  });

  return NextResponse.json(todo, { status: 200 });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { message: "Todo ID is required" },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.delete({
    where: {
      id
    },
  });

  return NextResponse.json(todo, { status: 200 });
}
  