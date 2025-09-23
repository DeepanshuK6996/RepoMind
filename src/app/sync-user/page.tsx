import { db } from '@/server/db';
import { auth, clerkClient } from '@clerk/nextjs/server'
import { error } from 'console';
import { notFound, redirect} from 'next/navigation';
import React from 'react'

const SyncUser = async() => {

    const {userId} = await auth();
    if(!userId){
        throw new Error("user not found");
    }

    // const user = await client.users.getUser(userId);

    // if(!user.emailAddresses[0]?.emailAddress){
    //     //if user not exits shows 404
    //     return notFound();
    // }
    const client = await clerkClient();

    let user;
    try {
      user = await client.users.getUser(userId);
    } catch (err) {
      console.error("Failed to fetch Clerk user:", err);
      return notFound();
    }

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return notFound();
    }

    await db.user.upsert({
        where: {
            emailAddress: user.emailAddresses[0]?.emailAddress
        },
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
        }
    })

    redirect("/dashboard");
}

export default SyncUser;
