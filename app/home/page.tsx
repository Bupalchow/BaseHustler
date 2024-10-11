'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, DollarSign, Calendar, Briefcase } from 'lucide-react'
import { AddTaskForm } from '@/components/add-task-form'

interface Task {
  id: number
  title: string
  description: string
  budget: number
  deadline: string
}

const initialTasks: Task[] = [
  { id: 1, title: 'Create Smart Contract', description: 'Develop a smart contract for token distribution', budget: 500, deadline: '2023-07-30' },
  { id: 2, title: 'Design DApp Interface', description: 'Create a user-friendly interface for the decentralized application', budget: 800, deadline: '2023-08-15' },
  { id: 3, title: 'Implement Wallet Integration', description: 'Integrate multiple wallet providers into the platform', budget: 600, deadline: '2023-08-05' },
]

const TaskCard = ({ task }: { task: Task }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="mb-4 bg-gray-800 border-gray-700 hover:border-violet-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-violet-300">{task.title}</CardTitle>
          <Badge variant="secondary" className="bg-violet-600 text-white">
            ${task.budget}
          </Badge>
        </div>
        <CardDescription className="text-gray-400">{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-green-400">
            <DollarSign className="h-4 w-4 mr-1" />
            <span className="font-medium">${task.budget}</span>
          </div>
          <div className="flex items-center text-blue-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{task.deadline}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isFormVisible, setIsFormVisible] = useState(false)

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const taskToAdd = {
      id: tasks.length + 1,
      ...newTask,
    }
    setTasks(prev => [...prev, taskToAdd])
    setIsFormVisible(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-violet-300">Web3 Tasks</h1>
          <Button
            onClick={() => setIsFormVisible(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white transition-colors"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Task
          </Button>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {tasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <Briefcase className="mx-auto h-16 w-16 text-gray-600 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">No tasks available</h2>
            <p className="text-gray-400">Create a new task to get started</p>
          </motion.div>
        )}
      </main>

      {/* Overlay Add Task Form */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddTaskForm onSubmit={handleAddTask} onClose={() => setIsFormVisible(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
