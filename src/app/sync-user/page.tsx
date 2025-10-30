// import { db } from '@/server/db';
// import { auth, clerkClient } from '@clerk/nextjs/server'
// import { notFound, redirect} from 'next/navigation';

// const SyncUser = async() => {

//     const {userId} = await auth();
//     if(!userId){
//         throw new Error("user not found");
//     }

//     // const user = await client.users.getUser(userId);

//     // if(!user.emailAddresses[0]?.emailAddress){
//     //     //if user not exits shows 404
//     //     return notFound();
//     // }
//     const client = await clerkClient();

//     let user;
//     try {
//       user = await client.users.getUser(userId);
//     } catch (err) {
//       console.error("Failed to fetch Clerk user:", err);
//       return notFound();
//     }

//     const email = user.emailAddresses[0]?.emailAddress;
//     if (!email) {
//       return notFound();
//     }

//     await db.user.upsert({
//         where: {
//             emailAddress: user.emailAddresses[0]?.emailAddress
//         },
//         update: {
//             imageUrl: user.imageUrl,
//             firstName: user.firstName,
//             lastName: user.lastName,
//         },
//         create: {
//             id: userId,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             imageUrl: user.imageUrl,
//             emailAddress: email,
//         }
//     })
    
//     if()
//     redirect('/dashboard');
// } 

// export default SyncUser;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { syncUserToDB } from "./sync";

export default function SyncUserPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Syncing your account...");

  useEffect(() => {
    const sync = async () => {
      try {
        await syncUserToDB(); // wait for server-side sync
        setStatus("Redirecting to dashboard...");
        router.push("/dashboard"); // client-side redirect
      } catch (err) {
        console.error(err);
        setStatus("Failed to sync user. Please try again.");
      }
    };
    sync();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p className="text-lg font-medium text-gray-600 animate-pulse">{status}</p>
      </div>
    </div>
  );
}
