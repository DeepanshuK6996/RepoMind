"use client"
import React from "react";
import { WavyBackground } from '@/components/ui/wavy-background'
import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return(
    <WavyBackground className="max-w-4xl mx-auto pb-40">
        <div className='flex items-center justify-center h-screen'>
          <SignUp />
        </div>
    </WavyBackground>
  )
}