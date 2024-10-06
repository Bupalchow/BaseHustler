'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from "@/lib/firebaseConfig" 

export default function LoginPageComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('Login successful:', userCredential.user)
      alert("Login successful")
    } catch (error) {
      console.error('Login error:', error)
      alert("Invalid email or password")
    }
  }

  // OAuth Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log('Google sign-in successful:', result.user)
      alert("Google sign-in successful")
    } catch (error) {
      console.error('Google sign-in error:', error)
      alert("Google sign-in failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">
      <motion.div
        className="lg:w-1/2 p-12 flex flex-col justify-between relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="z-10">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            BaseHustler
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Empowering Web3 Freelancers
          </motion.p>
        </div>
        <motion.div
          className="flex space-x-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Github size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
        </motion.div>
        <div className="absolute inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-500 rounded-full opacity-10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        className="lg:w-1/2 p-12 flex items-center justify-center"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-md">
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Welcome Back
          </motion.h2>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              <span>Sign In</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>
          <Button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            Sign In with Google
          </Button>
          <motion.p
            className="mt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Don't have an account?{' '}
            <a href="/SignUp" className="text-blue-400 hover:underline">
              Sign up
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
