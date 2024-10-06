'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useAnimation,useMotionValue,useVelocity,useAnimationFrame,wrap} from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Code, Cpu, Menu, X, ChevronRight, Github, Twitter, Linkedin, ArrowDown } from 'lucide-react'
import { useInView } from 'react-intersection-observer';
import LandingMarquee from './landing-marquee'
import Link from  'next/link'

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.li
    whileHover={{ scale: 1.1, color: "#8b5cf6" }}
    whileTap={{ scale: 0.95 }}
  >
    <a href={href} className="text-gray-300  transition-colors">
      {children}
    </a>
  </motion.li>
)

const FunctionCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0, rotateX: 0 },
        hidden: { opacity: 0, y: 50, rotateX: -15 }
      }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
    >
      <Card className="bg-gray-900/50 border-violet-700 text-white backdrop-blur-lg hover:bg-gray-800/50 transition-all duration-300 transform hover:-translate-y-2">
        <CardHeader>
          <Icon className="w-10 h-10 mb-2 text-violet-400" />
          <CardTitle className="text-violet-300">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [1, 0])

const { ref: titleRef, inView: titleInView } = useInView({
  triggerOnce: false
});


  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-violet-900 to-gray-900 opacity-50 z-0"></div>
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a href="#" className="text-2xl font-bold">BaseHustler</a>
            </motion.div>
            <div className="hidden md:flex space-x-8 list-none">
              <NavItem href="#home">Home</NavItem>
              <NavItem href="#functions">Functions</NavItem>
              <NavItem href="#about">About</NavItem>
              <NavItem href="#contact">Contact</NavItem>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="text-violet-400" /> : <Menu className="text-violet-400" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-40 bg-black/95 flex items-center justify-center"
        >
          <nav className="text-center">
            <ul className="space-y-6">
              <NavItem href="#home">Home</NavItem>
              <NavItem href="#functions">Functions</NavItem>
              <NavItem href="#about">About</NavItem>
              <NavItem href="#contact">Contact</NavItem>
            </ul>
          </nav>
        </motion.div>
      )}
      <main className="relative z-10">
        <section id="home" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
          <motion.div
            className="container mx-auto px-6 text-center relative z-10"
            style={{ scale: scaleProgress, opacity: opacityProgress }}
          >
            <motion.h1
              ref={titleRef}
              className="text-5xl md:text-7xl font-bold mb-6 text-violet-300"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Revolutionize Your Freelance Career with Web3
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Unlock new opportunities in the decentralized world
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/SignUp">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white ">
                  Get Started
                  <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="text-violet-400 w-8 h-8" />
          </motion.div>
        </section>

        <LandingMarquee/>

        <section id="functions" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6">
            <motion.h2
              className="text-4xl font-bold mb-12 text-center text-violet-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Empower Your Freelance Journey
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FunctionCard
                icon={Briefcase}
                title="Decentralized Contracts"
                description="Secure and transparent agreements."
              />
              <FunctionCard
                icon={Code}
                title="Smart Payments"
                description="Instant and low-fee transactions using cryptocurrencies."
              />
              <FunctionCard
                icon={Cpu}
                title="AI-Powered Matching"
                description="Find the perfect projects with our advanced AI algorithms."
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <motion.div
                className="md:w-1/2 mb-8 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-violet-300">About BaseHustler</h2>
                <p className="text-xl mb-6 text-gray-300">
                  We're revolutionizing the freelance industry by leveraging the power of blockchain and Web3 technologies. Our platform connects talented professionals with exciting projects in the decentralized space.
                </p>
                <Button variant="outline" className="bg-violet-600 hover:bg-violet-700 text-white">Learn More</Button>
              </motion.div>
              <motion.div
                className="md:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                    animate={{
                      background: [
                        "linear-gradient(to right, #8b5cf6, #6366f1)",
                        "linear-gradient(to right, #6366f1, #8b5cf6)",
                        "linear-gradient(to right, #8b5cf6, #6366f1)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  />
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <h3 className="text-3xl font-bold text-white">The Future of Work</h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section id="contact" className="py-20 bg-gray-900">
          <div className="container mx-auto px-6 text-center">
            <motion.h2
              className="text-4xl font-bold mb-8 text-violet-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Join the Web3 Revolution
            </motion.h2>
            <motion.p
              className="text-xl mb-12 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Be part of the future of work. Sign up now and start your Web3 freelance journey!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 text-white">
                Sign Up Now
              </Button>
            </motion.div>
            <motion.div 
              className="mt-12"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <motion.span 
                className="text-6xl font-bold text-violet-300 inline-block"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                100%
              </motion.span>
              <span className="text-2xl ml-2 text-gray-300">Satisfaction</span>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 text-violet-400">BaseHustler</h3>
              <p className="text-gray-400">Empowering freelancers in the decentralized world</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Github />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Twitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Linkedin />
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} BaseHulster. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}