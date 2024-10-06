'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NavBar } from '@/components/navbar'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, Briefcase, DollarSign, Star, Clock, ChevronRight } from 'lucide-react'

const earningsData = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 1800 },
  { name: 'Mar', amount: 2200 },
  { name: 'Apr', amount: 2700 },
  { name: 'May', amount: 3200 },
  { name: 'Jun', amount: 3800 },
]

const projectData = [
  { id: 1, title: 'DeFi Dashboard UI', client: 'CryptoFin', dueDate: '2023-07-15', status: 'In Progress' },
  { id: 2, title: 'NFT Marketplace', client: 'ArtBlock', dueDate: '2023-08-01', status: 'Planning' },
  { id: 3, title: 'Smart Contract Audit', client: 'SecureChain', dueDate: '2023-07-20', status: 'Review' },
]

const StatCard = ({ title, value, icon: Icon, change }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">
        {change > 0 ? '+' : ''}{change}% from last month
      </p>
    </CardContent>
  </Card>
)

const ProjectCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.client}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Due: {project.dueDate}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            project.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
            project.status === 'Planning' ? 'bg-blue-200 text-blue-800' :
            'bg-green-200 text-green-800'
          }`}>
            {project.status}
          </span>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

export default function DashboardComponent() {
  const [selectedTab, setSelectedTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="container mx-auto px-6 py-8 pt-24">
        <motion.h1
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome back, BaseHustler
        </motion.h1>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-8">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard title="Total Earnings" value="$12,345" icon={DollarSign} change={12} />
                  <StatCard title="Active Projects" value="4" icon={Briefcase} change={-1} />
                  <StatCard title="Completed Projects" value="23" icon={Star} change={5} />
                  <StatCard title="Available Balance" value="$5,678" icon={ArrowUpRight} change={3} />
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Active Projects</h2>
                  {projectData.slice(0, 2).map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Projects <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <h2 className="text-2xl font-bold">Your Projects</h2>
                {projectData.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </TabsContent>

              <TabsContent value="earnings">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={earningsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </main>
    </div>
  )
}