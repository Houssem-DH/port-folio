"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa"; // Importing icons from React Icons
import { motion } from "framer-motion";

import TypingEffect from "react-typing-effect";
import mainImage from "@/assets/img/main.svg";
import devAnimation from "@/animations/dev.json";

export default function HeroSection() {
  const staticText = "Welcome to My Portfolio";
  const animatedTexts = [
    " Modern Web Developer",
    " Tech Enthusiast",
    " Lifelong Learner",
  ];
  const lottieRef = useRef();

  return (
    <section className="flex items-center justify-center  bg-background px-6 py-40">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center md:text-left mb-8 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {staticText}
            <TypingEffect
              text={animatedTexts}
              speed={50}
              eraseSpeed={30}
              cursorRenderer={(cursor) => <span>{cursor}</span>}
              displayTextRenderer={(text, i) => (
                <span key={i} className="text-[#e11d48] ">
                  {text}
                </span>
              )}
            />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Im a passionate developer specializing in building modern web
            applications.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mb-6">
            <Button className="mb-6" variant="default">
              Download CV
            </Button>
            <div className="mt-1">
              {/* Social Media Icons */}
              <a
                href="https://www.linkedin.com/in/xdhoussem"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="w-6 h-6 text-muted-foreground hover:text-[#e11d48] transition  " />
              </a>
            </div>
            <div className="mt-1">
              <a
                href="https://github.com/Houssem-DH"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="w-6 h-6 text-muted-foreground hover:text-[#e11d48] transition" />
              </a>
            </div>

            <div className="mt-1">
              <a
                href="https://x.com/HoussemDh19"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-6 h-6 text-muted-foreground hover:text-[#e11d48] transition" />
              </a>
            </div>
            <div className="mt-1">
              <a
                href="https://x.com/HoussemDh19"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6 text-muted-foreground hover:text-[#e11d48] transition" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Artwork Image */}
        <div className="flex-1 flex justify-center mb-8 md:mb-0">
          <motion.div
            className="relative overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Lottie
              lottieRef={lottieRef}
              className="relative w-[612px] h-[383px] overflow-hidden rounded-3xl"
              onLoadedImages={() => {
                // @ts-ignore
                // https://lottiereact.com/
                lottieRef.current.setSpeed(0.5);
              }}
              animationData={devAnimation}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
