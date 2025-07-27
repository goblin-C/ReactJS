import { useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify'
import { getCurrentUser, signInWithRedirect } from 'aws-amplify/auth'

import awsconfig from './aws-exports'
import AppRoutes from './routes'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import './index.css'

// Configure Amplify

// Configure Amplify
console.log('Environment check:', {
  poolId: import.meta.env.VITE_APP_POOL_ID,
  clientId: import.meta.env.VITE_APP_CLIENT_ID
});
Amplify.configure(awsconfig)

function App() {
  const [searchText, setSearchText] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const updateSearchText = (text) => setSearchText(text)

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    
    if (code) {
      // Clear the URL params to clean up the address bar
      window.history.replaceState({}, document.title, window.location.pathname)
    }
    
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser()
      console.log('Current user:', currentUser)
      setUser(currentUser)
    } catch (error) {
      console.log('User not authenticated:', error)
      // Only redirect if we're not already processing an OAuth callback
      const urlParams = new URLSearchParams(window.location.search)
      if (!urlParams.get('code')) {
        await signInWithRedirect()
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Redirecting to login...</div>
      </div>
    )
  }

  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1'>
        <TopBar handleSearchText={updateSearchText} user={user} />
        <AppRoutes searchText={searchText} />
      </div>
    </div>
  )
}

export default App