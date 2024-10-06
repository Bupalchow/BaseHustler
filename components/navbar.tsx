'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: "/", label: "Home" },
  { href: "/functions", label: "Functions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

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

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
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
  </div>
  )
}