"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full bg-black text-white font-sans px-6 md:px-12">
      <div className="max-w-5xl mx-auto py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
          Track Your Progress Seamlessly
        </h2>
        <p className="text-neutral-400 text-base max-w-md">
          Follow your journey from signup to viewing AI-powered commit summaries.
        </p>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-20 md:pt-32 gap-8">
            {/* Left Section — Title & Dot */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-40 md:w-64">
              <div className="absolute left-0 md:left-2 h-10 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-neutral-700 border border-neutral-600" />
              </div>
              <h3 className="hidden md:block text-3xl font-semibold text-neutral-500 pl-16">
                {item.title}
              </h3>
            </div>

            {/* Right Section — Content */}
            <div className="relative pl-20 md:pl-4 w-full">
              <h3 className="md:hidden text-2xl mb-4 font-semibold text-neutral-400">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Animated Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute left-[1.4rem] md:left-[1.1rem] top-0 w-[2px] bg-neutral-800 overflow-hidden"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
