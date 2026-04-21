/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

// Marquee component using motion
const Marquee = ({ text, speed = 20, reverse = false, className = "" }: { text: string; speed?: number; reverse?: boolean; className?: string }) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap py-4 select-none ${className}`}>
      <motion.div
        initial={{ x: reverse ? "-50%" : 0 }}
        animate={{ x: reverse ? 0 : "-50%" }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex w-fit text-5xl md:text-6xl font-display uppercase tracking-tight"
      >
        {[...Array(10)].map((_, i) => (
          <span key={i} className="mx-8 flex items-center text-inherit">
            {text}
            <span className="ml-16 opacity-40 inline-block">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number; key?: React.Key }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-[#D4AF37]/30 p-6 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-6 text-left"
      >
        <span className="text-2xl font-display text-[#D4AF37] opacity-40 group-hover:opacity-100 transition-opacity">
          {index < 10 ? `0${index}` : index}
        </span>
        <span className="text-lg font-bold uppercase tracking-tight text-[#D4AF37] transition-colors flex-1">{question}</span>
        <div className="w-8 h-8 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] transition-colors group-hover:bg-[#D4AF37] group-hover:text-black">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-6 pl-14 text-sm text-white/70 leading-relaxed font-sans max-w-2xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NavItem = ({ item }: { item: string; key?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a 
      href={`#${item.toLowerCase()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors relative py-2 underline decoration-[#D4AF37]/40 underline-offset-8 decoration-1"
    >
      {item}
      <motion.span 
        initial={{ width: 0, right: 0 }}
        animate={{ width: isHovered ? "100%" : 0, right: isHovered ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute top-0 h-0.5 bg-[#D4AF37]"
      />
    </a>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["Home", "About", "Service", "FAQ"];

  return (
    <div className="min-h-screen bg-black font-sans text-[#D4AF37] selection:bg-[#D4AF37]/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between font-bold">
          <a href="/" className="text-xl font-black tracking-tighter flex items-center group text-[#D4AF37] underline decoration-2 underline-offset-4">
            ASIF SHAHZAD
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavItem key={item} item={item} />
            ))}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-[#D4AF37]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className="fixed top-20 left-0 w-full bg-black z-40 overflow-hidden flex flex-col items-start px-10 pt-20 space-y-8 pb-20 border-t-2 border-[#D4AF37]"
            >
              {navItems.map((item, i) => (
                <motion.a 
                  key={item} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl font-display uppercase tracking-tight text-[#D4AF37] hover:pl-4 transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 px-10 max-w-7xl mx-auto min-h-screen flex flex-col justify-center bg-black border-x-2 border-[#D4AF37] group/hero">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text on Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 order-1"
          >
            <div className="flex flex-col gap-6">
              <h1 className="text-6xl md:text-8xl font-display uppercase leading-none tracking-tighter text-[#D4AF37]">
                Asif <br /> Shahzad
              </h1>
            </div>
            
            <div className="max-w-xl space-y-6">
              <p className="text-lg md:text-xl leading-relaxed font-medium text-[#D4AF37]/90">
                Savor the artisan touch of Asif Shahzad's signature pizzas. Hand-tossed dough, vine-ripened tomatoes, and locally sourced mozzarella, baked to perfection.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <p className="text-base md:text-lg leading-relaxed text-[#D4AF37]/70 italic flex-1 border-l-2 border-[#D4AF37] pl-4">
                  Every slice tells a story of passion, tradition, and the perfect crunch that defines the true pizza experience.
                </p>
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)] shrink-0 group-hover/hero:scale-110 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1593504049359-7b7d92c7385f?q=80&w=800&auto=format&fit=crop" 
                    alt="Mini Pizza" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 items-center">
                <button className="bg-[#D4AF37] text-black px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors border-2 border-[#D4AF37]">
                  Order Now
                </button>
                <button className="border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
                  Our Story
                </button>
              </div>
            </div>
          </motion.div>

          {/* Image on Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex justify-center items-center order-2"
          >
            <div className="w-full aspect-square max-w-[400px] lg:max-w-[500px] rounded-[3rem] overflow-hidden group border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.15)] relative">
              <img 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1500&auto=format&fit=crop" 
                alt="Signature Pizza"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#D4AF37] text-black p-6 font-display text-3xl rotate-6 shadow-2xl border-2 border-black z-10 hidden sm:block">
              FRESH & HOT
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section (Gold Bg, Green Text) */}
      <section className="bg-[#D4AF37] border-y-2 border-black overflow-hidden flex flex-col">
        <Marquee text="ASIF SHAHZAD" speed={15} className="text-green-800" />
        <Marquee text="PREMIUM PIZZA EXPERIENCES" speed={25} reverse={true} className="text-green-900 border-t border-black/20" />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-black border-x-2 border-[#D4AF37]">
        <div className="order-2 md:order-1">
          <div className="aspect-video bg-[#D4AF37]/10 rounded-none border-2 border-[#D4AF37] overflow-hidden shadow-2xl">
             <img 
              src="https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?q=80&w=2000&auto=format&fit=crop" 
              alt="Asif Shahzad Work"
              className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="order-1 md:order-2 space-y-8">
           <h2 className="text-6xl md:text-7xl font-display uppercase tracking-tight text-[#D4AF37]">About Asif</h2>
           <p className="text-lg md:text-xl leading-relaxed font-medium text-[#D4AF37]/80">
              Asif Shahzad is a visionary designer and culinary enthusiast who blends the precision of modern design with the soul of traditional pizza making. With over a decade of experience in crafting digital and physical experiences, he brings a unique flavor to every project.
           </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="service" className="py-24 bg-black text-[#D4AF37] px-10 border-y-2 border-[#D4AF37]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <h2 className="text-6xl md:text-9xl font-display uppercase tracking-tight">Services</h2>
            <p className="text-white font-bold uppercase text-xs tracking-widest">Elevating standards, one slice at a time.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#D4AF37]/30">
            {[
              { title: "Gourmet Catering", desc: "Premium pizza service for events, corporate meetings, and private parties." },
              { title: "Brand Consulting", desc: "Strategic advice for food industry startups looking to make a massive impact." },
              { title: "Artisan Workshops", desc: "Learn the secrets of the perfect dough and sauce from the master himself." }
            ].map((svc, i) => (
              <div key={i} className="p-12 border border-[#D4AF37]/10 hover:bg-[#D4AF37]/5 transition-colors group">
                <span className="text-white font-display text-2xl">0{i+1}</span>
                <h3 className="text-2xl font-display uppercase mt-8 mb-4 group-hover:translate-x-2 transition-transform">{svc.title}</h3>
                <p className="text-[#D4AF37]/60 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-10 max-w-7xl mx-auto bg-black border-x-2 border-[#D4AF37] flex flex-col items-center">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display text-7xl uppercase text-[#D4AF37]">FAQ</h2>
          <p className="font-bold uppercase text-xs tracking-widest text-white">Common Questions</p>
        </div>
        
        <div className="w-full max-w-4xl space-y-4">
          {[
            { q: "What defines Asif's style?", a: "A blend of brutalist efficiency and organic warmth. Whether it's a website or a pepperoni pizza, the focus is on raw quality materials and bold execution." },
            { q: "Where is the service available?", a: "We currently serve the metropolitan area with a guaranteed delivery time of under 45 minutes from our central oven." },
            { q: "How do I book a session?", a: "Asif Shahzad offers bespoke mobile wood-fired catering services for weddings, corporate gatherings, and private parties." },
            { q: "What's the secret sauce?", a: "It's a family recipe passed down to Asif, featuring sun-dried herbs and tomatoes grown specifically for our kitchen." }
          ].map((item, i) => (
            <FAQItem 
              key={i}
              index={i + 1}
              question={item.q}
              answer={item.a}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-[#D4AF37]/20 px-6 bg-black text-[#D4AF37]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-3xl font-display uppercase tracking-tighter">
            Asif Shahzad
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-40">
            &copy; {new Date().getFullYear()} Asif Shahzad • Crafting Excellence
          </p>
          <div className="flex space-x-8">
            {["Twitter", "Instagram", "LinkedIn"].map(social => (
              <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
