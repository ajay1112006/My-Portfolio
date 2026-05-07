"use client";

import { useMemo } from "react";
import Image from "next/image";
import {
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import BorderGlow from "@/components/ui/border-glow";
import GradientText from "@/components/ui/gradient-text";
import FluidGlass from "@/components/ui/fluid-glass";
import LiquidEther from "@/components/ui/LiquidEther";

const profile = {
  name: "Ajay Subramoni A",
  role: "AI Engineer | Vibe Coder | UI/UX Designer",
  phone: "7904693749",
  email: "ajay1112006@gmail.com",
  linkedin: "https://www.linkedin.com",
  github: "https://github.com",
  summary:
    "AI Engineer with strong Python foundations and a passion for building intelligent, practical products. Experienced with fast-paced hackathons, modern vibe-coding workflows, and human-centered UI/UX design.",
};

const skills = [
  "Python & AI Product Building",
  "Vibe Coding (Antigravity, Claude Code, Windsurf, Manus AI)",
  "UI/UX Design with Figma",
  "Wireframing, Prototyping, and User Flows",
  "Responsive & Interaction Design",
  "Blender 3D Modeling and Animation",
  "Interpersonal Communication",
  "Adaptability and Smart Execution",
];

const experience = [
  "Built a law-focused chatbot at hackathon scale to answer legal doubts and provide relevant resources.",
  "Designed complete UI/UX systems for a bus tracking app, a Spotify-like music app, and portfolio websites.",
  "Participated in SIH 2023, 2024, 2025, Cyber Hackathon (Thoothukudi Police), and MSME Hackathon.",
  "Created 3D models and animation assets in Blender for digital product experiences.",
];

const projects = [
  {
    title: "Plantiva",
    impact:
      "Developed an AI/ML-powered plant and crop disease detection app using image scanning.",
  },
  {
    title: "DeepFake Detector",
    impact:
      "Built a deepfake and morphed image detection pipeline leveraging CNN-based operations.",
  },
  {
    title: "Law Chatbot",
    impact:
      "Trained and deployed a legal assistant chatbot focused on law-and-order information access.",
  },
  {
    title: "College Website",
    impact:
      "Developed an official college website using modern vibe-coding practices for rapid delivery.",
  },
  {
    title: "Book Emulator",
    impact:
      "Built a student-first notes platform with built-in AI summarization for faster study workflows.",
  },
];

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function TiltCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ scale: 1.02 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="[transform-style:preserve-3d] h-full flex flex-col cursor-pointer"
    >
      <BorderGlow
        className={`h-full flex-grow ${className ?? ""}`}
        edgeSensitivity={30}
        glowColor="82 39 255"
        backgroundColor="#0b0b0b"
        borderRadius={18}
        glowRadius={30}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
      >
        <div className="p-6 h-full flex flex-col justify-center [transform:translateZ(20px)]">
          {children}
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function TiltImage({ src, alt }: { src: string; alt: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative lg:flex-1 shrink-0 flex justify-center items-center [perspective:1000px]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative h-72 w-72 md:h-96 md:w-96 cursor-pointer"
      >
        {/* Decorative Glow */}
        <div className="absolute -inset-4 bg-[var(--accent)] opacity-20 blur-3xl rounded-full animate-pulse [transform:translateZ(-50px)]" />

        {/* Image Border/Frame */}
        <div className="relative h-full w-full overflow-hidden rounded-3xl border-2 border-white/20 bg-neutral-900 shadow-2xl transition hover:border-white/40 [transform-style:preserve-3d]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top transition duration-500 hover:scale-105 [transform:translateZ(30px)]"
            priority
          />
          {/* Overlay Gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent [transform:translateZ(40px)]" />
        </div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 180, damping: 20, mass: 0.2 });
  const ySpring = useSpring(y, { stiffness: 180, damping: 20, mass: 0.2 });
  const { scrollYProgress } = useScroll();

  const bgY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const cursorTransform = useMotionTemplate`translate3d(${xSpring}px, ${ySpring}px, 0)`;

  const sectionClasses = useMemo(
    () =>
      "section-anchor mx-auto w-full max-w-6xl px-5 py-16 md:px-8 lg:py-24",
    [],
  );

  return (
    <div
      onMouseMove={(event) => {
        x.set(event.clientX - 22);
        y.set(event.clientY - 22);
      }}
      className="relative overflow-hidden"
    >
      {!shouldReduceMotion && (
        <motion.div
          style={{ transform: cursorTransform }}
          className="pointer-events-none fixed left-0 top-0 z-50"
        >
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border border-[#B497CF]/70 bg-[#5227FF]/10 shadow-[0_0_24px_rgba(82,39,255,0.45),0_0_48px_rgba(180,151,207,0.35)]" />
            <div className="absolute inset-[10px] rounded-full bg-[#FF9FFC]/90 shadow-[0_0_18px_rgba(255,159,252,0.65)]" />
            <div className="absolute -inset-2 rounded-full border border-[#5227FF]/30" />
          </div>
        </motion.div>
      )}

      <motion.div
        style={{ y: shouldReduceMotion ? 0 : bgY }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(82,39,255,.14),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(255,159,252,.1),transparent_20%)]"
      />
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : orbY, scale: shouldReduceMotion ? 1 : orbScale }}
        className="pointer-events-none absolute -right-28 top-80 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(82,39,255,.22),rgba(0,0,0,0))]"
      />

      <header className="sticky top-0 z-40 border-b border-white/15 bg-black/95 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <span className="font-display text-lg font-semibold tracking-wide">
            Ajay<span className="text-[var(--accent)]">.dev</span>
          </span>
          <div className="hidden gap-4 text-sm text-[var(--muted)] md:flex">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="about" className="section-anchor relative">
          {/* Full-screen LiquidEther Background */}
          <div className="fixed inset-0 -z-50 h-full w-full bg-black">
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B497CF']}
              mouseForce={20}
              cursorSize={100}
              autoDemo={true}
            />
          </div>

          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-5 py-16 md:px-8 lg:min-h-[85vh] lg:flex-row lg:py-24">
            <div className="text-left lg:flex-[1.5]">
              <h1 className="max-w-4xl">
                <GradientText
                  className="w-fit font-display text-4xl font-semibold leading-tight md:text-6xl"
                  colors={["#5227FF", "#FF9FFC", "#B497CF"]}
                  animationSpeed={7}
                  direction="horizontal"
                >
                  {profile.name}
                </GradientText>
              </h1>
              <GradientText
                className="mt-4 w-fit text-lg md:text-xl"
                colors={["#FF9FFC", "#B497CF", "#5227FF"]}
                animationSpeed={9}
                direction="horizontal"
              >
                {profile.role}
              </GradientText>
              <div className="mt-6 max-w-3xl">
                <GradientText
                  className="w-full text-lg leading-relaxed"
                  colors={["#B497CF", "#5227FF", "#FF9FFC"]}
                  animationSpeed={11}
                  direction="diagonal"
                >
                  {profile.summary}
                </GradientText>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#projects" className="glow-btn rounded-full bg-[#FF9FFC] px-6 py-3 font-medium text-black transition hover:brightness-110">
                  View Projects
                </a>
                <a href="#contact" className="glow-btn rounded-full border border-white/25 px-6 py-3 font-medium transition hover:bg-white/10">
                  Contact Me
                </a>
              </div>
            </div>

            <TiltImage src="/profile.jpg" alt={profile.name} />
          </div>
        </section>

        <section id="experience" className={sectionClasses}>
          <h2 className="mb-8 flex items-center gap-2 font-display text-3xl font-semibold">
            <BriefcaseBusiness className="text-[var(--accent)]" />
            <GradientText colors={["#5227FF", "#FF9FFC"]} animationSpeed={8}>Experience Highlights</GradientText>
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {experience.map((item, index) => (
              <TiltCard key={item} delay={index * 0.08}>
                <p className="leading-relaxed text-[var(--muted)]">{item}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="skills" className={sectionClasses}>
          <h2 className="mb-8 flex items-center gap-2 font-display text-3xl font-semibold">
            <Code2 className="text-[var(--accent)]" />
            <GradientText colors={["#FF9FFC", "#B497CF"]} animationSpeed={8}>Skills & Tools</GradientText>
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <TiltCard key={skill} delay={index * 0.05} className="p-5">
                <p className="text-[var(--foreground)]">{skill}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="projects" className={sectionClasses}>
          <h2 className="mb-8 flex items-center gap-2 font-display text-3xl font-semibold">
            <GraduationCap className="text-[var(--accent)]" />
            <GradientText colors={["#B497CF", "#5227FF"]} animationSpeed={8}>Projects & Achievements</GradientText>
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <TiltCard key={project.title} delay={index * 0.07} className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                <p className="max-w-3xl text-[var(--muted)]">{project.impact}</p>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="contact" className={sectionClasses}>
          <TiltCard className="relative overflow-hidden">
            <h2 className="font-display text-3xl font-semibold">
              <GradientText colors={["#5227FF", "#FF9FFC", "#B497CF"]}>Let&apos;s build something meaningful.</GradientText>
            </h2>
            <p className="mt-3 max-w-2xl text-[var(--muted)]">
              I collaborate on AI-driven products, UX-led experiences, and fast execution teams that want to ship impactful solutions.
            </p>
            <div className="mt-8 flex flex-col gap-4 text-[var(--foreground)]">
              <a href={`tel:${profile.phone}`} className="inline-flex items-center gap-2 transition hover:text-[var(--accent-2)]">
                <Phone size={18} className="text-[var(--accent)]" /> {profile.phone}
              </a>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition hover:text-[var(--accent-2)]">
                <Mail size={18} className="text-[var(--accent)]" /> {profile.email}
              </a>
              <div className="flex gap-6 pt-2">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[var(--muted)] transition hover:text-white">
                  LinkedIn <ExternalLink size={16} className="text-[var(--accent)]" />
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[var(--muted)] transition hover:text-white">
                  GitHub <ExternalLink size={16} className="text-[var(--accent)]" />
                </a>
              </div>
            </div>
          </TiltCard>
        </section>
      </main>
    </div>
  );
}
