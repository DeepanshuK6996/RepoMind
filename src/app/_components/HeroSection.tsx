"use client"
import { HeroParallax } from "@/components/ui/hero-parallax";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import createGlobe from "cobe";
import { motion } from "motion/react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react"; 
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";


export function HeroSection() {
  const features = [
    {
      title: "Track issues effectively",
      description:
        "Track and manage your project issues with ease using our intuitive interface.",
      skeleton: <SkeletonOne />,
      className: "col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-700",
    },
    {
      title: "Capture pictures with AI",
      description:
        "Capture stunning photos effortlessly using our advanced AI technology.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 border-neutral-700",
    },
    {
      title: "Watch our AI on YouTube",
      description:
        "Whether it's you or Tyler Durden, you can get to know about our product on YouTube",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-neutral-700",
    },
    {
      title: "Deploy in seconds",
      description:
        "With our blazing fast, state-of-the-art cloud services (read AWS) - you can deploy your model in seconds.",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none border-neutral-700",
    },
  ];

  return (
    <div className="bg-black text-white">
      <HeroParallax products={products} />
      <div className="relative z-20 mx-auto max-w-7xl rounded-2xl px-8 py-10 lg:py-40">
        <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight lg:text-5xl lg:leading-tight">
          Packed with thousands of features
        </h4>

        <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-300 lg:text-base">
          From Image generation to video generation, Everything AI has APIs for
          literally everything. It can even create this website copy for you.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-4 rounded-md border border-neutral-700 lg:grid-cols-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-full w-full">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>

    </div>
  );
}
export const products = [

  {

    title: "Moonbeam",

    link: "https://gomoonbeam.com",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",

  },

  {

    title: "Cursor",

    link: "https://cursor.so",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/cursor.png",

  },

  {

    title: "Rogue",

    link: "https://userogue.com",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/rogue.png",

  },



  {

    title: "Editorially",

    link: "https://editorially.org",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/editorially.png",

  },

  {

    title: "Editrix AI",

    link: "https://editrix.ai",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/editrix.png",

  },

  {

    title: "Pixel Perfect",

    link: "https://app.pixelperfect.quest",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",

  },



  {

    title: "Algochurn",

    link: "https://algochurn.com",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",

  },

  {

    title: "Aceternity UI",

    link: "https://ui.aceternity.com",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",

  },

  {

    title: "Tailwind Master Kit",

    link: "https://tailwindmasterkit.com",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",

  },

  {

    title: "SmartBridge",

    link: "https://smartbridgetech.com",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",

  },

  {

    title: "Renderwork Studio",

    link: "https://renderwork.studio",

    thumbnail:

      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",

  },
];

// export const products = [

//   {

//     title: "AI Q&A for GitHub",

//     link: "#",

//     thumbnail: "/images/thumbnails/github-qa.png",

//   },

//   {

//     title: "Commit Summaries",

//     link: "#",

//     thumbnail: "/images/thumbnails/commit-summary.png",

//   },

//   {

//     title: "Meeting Insights",

//     link: "#",

//     thumbnail: "/images/thumbnails/meeting-insights.png",

//   },

//   {

//     title: "Codebase Search",

//     link: "#",

//     thumbnail: "/images/thumbnails/code-search.png",

//   },

//   {

//     title: "Team Knowledge Hub",

//     link: "#",

//     thumbnail: "/images/thumbnails/knowledge-hub.png",

//   },

//   {

//     title: "Automated Documentation",

//     link: "#",

//     thumbnail: "/images/thumbnails/auto-docs.png",

//   },

// ];


const FeatureCard = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("p-4 sm:p-8 relative overflow-hidden bg-black border border-neutral-700", className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-xl md:text-2xl md:leading-snug font-semibold text-white max-w-5xl mx-auto">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className="text-sm md:text-base text-neutral-300 max-w-4xl mx-auto mt-2">
      {children}
    </p>
  );
};

// Skeletons
export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full p-5 mx-auto bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-col space-y-2 h-full w-full">
          <img
            src="/linear.webp"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full object-cover object-left-top rounded-sm"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-black via-black to-transparent pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-black via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export const SkeletonTwo = () => {
  const images = [
    "https://images.unsplash.com/photo-1517322048670-4fba75cbbb62?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=3425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1546484475-7f7bd55792da?q=80&w=2581&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const imageVariants = {
    whileHover: { scale: 1.1, rotate: 0, zIndex: 100 },
    whileTap: { scale: 1.1, rotate: 0, zIndex: 100 },
  };

  return (
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            style={{ rotate: Math.random() * 20 - 10 }}
            variants={imageVariants}
            whileHover="whileHover"
            whileTap="whileTap"
            className="rounded-xl -mr-4 mt-4 p-1 bg-neutral-900 border border-neutral-700 overflow-hidden"
          >
            <img src={image} alt="bali images" width={500} height={500} className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <a
      href="https://www.youtube.com/watch?v=RPa3_AD1_Vs"
      target="__blank"
      className="relative flex gap-10 h-full"
    >
      <div className="w-full mx-auto bg-neutral-900 h-full relative">
        <div className="relative flex flex-col h-full">
          <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
          <img
            src="https://assets.aceternity.com/fireship.jpg"
            alt="header"
            width={800}
            height={800}
            className="h-full w-full object-cover rounded-sm blur-none hover:blur-md transition-all duration-200"
          />
        </div>
      </div>
    </a>
  );
};

export const SkeletonFour = () => (
  <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent mt-10">
    <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
  </div>
);

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 1200,
      height: 1200,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => globe.destroy();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}
 
const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};