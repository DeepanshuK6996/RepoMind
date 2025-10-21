import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function Header() {
  return (
    <nav className="flex w-full items-center justify-between !bg-white !text-black px-6 py-4 rounded-2xl border border-neutral-700">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <Link href={"/"}>
          <Image
            src={"/favicon.ico"}
            width={40}
            height={40}
            alt="icon"
            className="rounded-sm"
          />
        </Link>
        <h1 className=" text-lg font-bold md:text-2xl">
          RepoMind
        </h1>
      </div>

      {/* Get Started Button */}
      <Link href={"/dashboard"}>
        <Button
          variant={"outline"}
          size={"lg"}
          className="flex w-32 items-center justify-center rounded-lg bg-black border border-neutral-700 text-white font-medium transition-all duration-300 hover:bg-neutral-800 hover:-translate-y-0.5"
        >
          Get Started
        </Button>
      </Link>
    </nav>
  );
}

export default Header;
