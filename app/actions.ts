"use server"
import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"

const prisma = new PrismaClient()

export async function addItem(formData: FormData) {
  const val = formData.get("value") as string;
  if (!val) return;

  await prisma.item.create({
    data: { value: val }
  });

  revalidatePath("/"); // Aktualizuje seznam na stránce
}

export async function getItems() {
  return await prisma.item.findMany();
}