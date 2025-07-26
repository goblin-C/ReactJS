import { useEffect, useState } from 'react'
import { Amplify } from 'aws-amplify'
import { currentAuthenticatedUser, federatedSignIn } from '@aws-amplify/auth'

import aws_config from './aws-exports'

import AppRoutes from './routes'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import './index.css'

// configure Amplify once
Amplify.configure(aws_config)

function App() {
  const [searchText, setSearchText] = useState('')
  const [user, setUser] = useState(null)

  const updateSearchText = (text) => setSearchText(text)

  useEffect(() => {
    currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(() => {
        federatedSignIn()
      })
  }, [])

  if (!user) {
    return <div className="p-4">Redirecting to login...</div>
  }

  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1'>
        <TopBar handleSearchText={updateSearchText}/>
        <AppRoutes searchText={searchText}/>
      </div>
    </div>
  )
}

export default App
