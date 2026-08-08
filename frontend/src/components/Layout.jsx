import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import axios from "axios"
import { Circle, Clock, TrendingUp, Zap } from 'lucide-react'

const Layout = ({ onLogout, user }) => {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 🔐 Safe logout handler
  const safeLogout = useCallback(() => {
    if (typeof onLogout === "function") {
      onLogout()
    } else {
      localStorage.clear()
      window.location.href = "/login"
    }
  }, [onLogout])

  // 📦 Fetch tasks
  const fetchTasks = useCallback(async () => {
    setLoading(true)
    setError(null)

    const token = localStorage.getItem('token')
    if (!token) {
      safeLogout()
      setLoading(false)
      return
    }

    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/tasks/gp",
        { headers: { Authorization: `Bearer ${token}` } }
      )

      const arr = Array.isArray(data)
        ? data
        : Array.isArray(data?.tasks)
        ? data.tasks
        : Array.isArray(data?.data)
        ? data.data
        : []

      setTasks(arr)
    } catch (err) {
      console.error(err)
      setError(err.message || "Could not load tasks")
      if (err.response?.status === 401) safeLogout()
    } finally {
      setLoading(false)
    }
  }, [safeLogout])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // 📊 Stats calculation
  const stats = useMemo(() => {
    const completedTasks = tasks.filter(t =>
      t.completed === true ||
      t.completed === 1 ||
      (typeof t.completed === "string" && t.completed.toLowerCase() === 'yes')
    ).length

    const totalCount = tasks.length
    const pendingCount = totalCount - completedTasks
    const completionPercentage = totalCount
      ? Math.round((completedTasks / totalCount) * 100)
      : 0

    return {
      totalCount,
      completedTasks,
      pendingCount,
      completionPercentage
    }
  }, [tasks])

  // ✅ FIXED: StatCard MUST return JSX
  const StatCard = ({ title, value, icon }) => {
    return (
      <div className='p-3 rounded-xl bg-white shadow-sm border border-purple-100 hover:shadow-md transition-all'>
        <div className='flex items-center gap-2'>
          <div className='p-2 rounded-lg bg-purple-100'>
            {icon}
          </div>
          <div>
            <p className='text-xl font-bold text-purple-600'>{value}</p>
            <p className='text-xs text-gray-500'>{title}</p>
          </div>
        </div>
      </div>
    )
  }

  // ⏳ Loading
  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin h-12 w-12 border-2 border-purple-500 border-t-transparent rounded-full' />
      </div>
    )
  }

  // ❌ Error
  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-red-50 text-red-600 p-4 rounded-xl'>
          <p className='font-medium mb-2'>Error loading tasks</p>
          <p className='text-sm'>{error}</p>
          <button
            onClick={fetchTasks}
            className='mt-3 px-4 py-2 bg-red-100 rounded-lg'
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar user={user} onLogout={safeLogout} />
      <Sidebar user={user} tasks={tasks} />

      <div className='ml-0 lg:ml-64 p-4'>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
          <div className='xl:col-span-2'>
            <Outlet context={{ tasks, refreshTasks: fetchTasks }} />
          </div>

          <div className='space-y-6'>
            <div className='bg-white p-5 rounded-xl border'>
              <h3 className='font-semibold flex items-center gap-2 mb-4'>
                <TrendingUp className='text-purple-500' />
                Task Statistics
              </h3>

              <div className='grid grid-cols-2 gap-4'>
                <StatCard title="Total Tasks" value={stats.totalCount} icon={<Circle />} />
                <StatCard title="Completed" value={stats.completedTasks} icon={<Circle className='text-green-500' />} />
                <StatCard title="Pending" value={stats.pendingCount} icon={<Circle className='text-fuchsia-500' />} />
                <StatCard title="Completion" value={`${stats.completionPercentage}%`} icon={<Zap />} />
              </div>
            </div>

            <div className='bg-white p-5 rounded-xl border'>
              <h3 className='font-semibold flex items-center gap-2 mb-4'>
                <Clock className='text-purple-500' />
                Recent Activity
              </h3>

              {tasks.slice(0, 3).map(task => (
                <div key={task._id || task.id} className='text-sm border-b py-2'>
                  <p className='font-medium'>{task.title}</p>
                  <p className='text-xs text-gray-500'>
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleDateString()
                      : "No date"}
                  </p>
                </div>
              ))}

              {tasks.length === 0 && (
                <p className='text-center text-sm text-gray-400'>
                  No recent activity
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout