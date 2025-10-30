"use server";

import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function syncUserToDB() {
  const { userId } = await auth();
  if (!userId) throw new Error("User not found");

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) throw new Error("Email missing");

  await db.user.upsert({
    where: { emailAddress: email },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    create: {
      id: userId,
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      emailAddress: email,
    },
  });

  return true;
}
