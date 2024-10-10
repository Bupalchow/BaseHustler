'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Loader2, DollarSign, Calendar, Type, AlignLeft } from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  budget: number
  deadline: string
}

interface AddTaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void
  onClose: () => void
}

export function AddTaskForm({ onSubmit, onClose }: AddTaskFormProps) {
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({ 
    title: '', 
    description: '', 
    budget: 0, 
    deadline: '' 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTask(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    onSubmit(newTask)
    setIsSubmitting(false)
    setNewTask({ title: '', description: '', budget: 0, deadline: '' })
    onClose()
  }

  const formSteps = [
    { name: 'title', icon: Type, label: 'Title' },
    { name: 'description', icon: AlignLeft, label: 'Description' },
    { name: 'budget', icon: DollarSign, label: 'Budget' },
    { name: 'deadline', icon: Calendar, label: 'Deadline' },
  ]

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <Card className="bg-gray-900 bg-opacity-80 border-gray-700 shadow-2xl overflow-hidden w-full max-w-5xl mx-auto backdrop-blur-md">
        <CardHeader className="bg-gray-800 bg-opacity-50 border-b border-gray-700 p-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-violet-300">Add New Task</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex justify-between mt-6">
            {formSteps.map((step, index) => (
              <div
                key={step.name}
                className={`flex flex-col items-center ${
                  index === currentStep ? 'text-violet-400' : 'text-gray-500'
                }`}
              >
                <div className={`rounded-full p-3 ${
                  index === currentStep ? 'bg-violet-400 bg-opacity-20' : 'bg-gray-700 bg-opacity-50'
                }`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="text-sm mt-2">{step.label}</span>
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="min-h-[250px] flex flex-col justify-center"
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <Label htmlFor="title" className="text-lg font-medium text-gray-300">Task Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newTask.title}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 bg-opacity-50 border-gray-600 text-white text-lg focus:ring-violet-500 focus:border-violet-500"
                      placeholder="Enter a clear and concise task title"
                    />
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <Label htmlFor="description" className="text-lg font-medium text-gray-300">Task Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newTask.description}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 bg-opacity-50 border-gray-600 text-white text-lg focus:ring-violet-500 focus:border-violet-500"
                      placeholder="Provide a detailed description of the task"
                      rows={6}
                    />
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <Label htmlFor="budget" className="text-lg font-medium text-gray-300">Budget (USD)</Label>
                    <Input
                      id="budget"
                      name="budget"
                      type="number"
                      value={newTask.budget}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 bg-opacity-50 border-gray-600 text-white text-lg focus:ring-violet-500 focus:border-violet-500"
                      placeholder="Enter the budget for this task"
                    />
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <Label htmlFor="deadline" className="text-lg font-medium text-gray-300">Deadline</Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={newTask.deadline}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 bg-opacity-50 border-gray-600 text-white text-lg focus:ring-violet-500 focus:border-violet-500"
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-between items-center pt-6">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="bg-gray-700 bg-opacity-50 border-gray-600 text-white hover:bg-gray-600 hover:bg-opacity-50 px-6 py-2 text-lg"
              >
                Previous
              </Button>
              {currentStep < formSteps.length - 1 ? (
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(prev => Math.min(formSteps.length - 1, prev + 1))}
                  className="bg-violet-600 bg-opacity-80 hover:bg-violet-700 hover:bg-opacity-80 text-white transition-colors px-6 py-2 text-lg"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="bg-violet-600 bg-opacity-80 hover:bg-violet-700 hover:bg-opacity-80 text-white transition-colors px-6 py-2 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Task'
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
        <motion.div 
          className="bg-violet-600 h-1" 
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </div>
  )
}