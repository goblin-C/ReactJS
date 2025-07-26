import { useState } from 'react'
import AppRoutes from './routes'
import SideBar from './components/SideBar'
import TopBar from './components/TopBar'
import './index.css'

function App() {
  // Handler to set the search text
  const [searchText, setSearchText] = useState('');
  const updateSearchText = (text) => {
    setSearchText(text);
  }
  return (
    <>
    <div className='flex h-screen'>
      <SideBar />
      <div className='flex-1'>
        <TopBar handleSearchText={updateSearchText}/>
        <AppRoutes searchText={searchText}/>
      </div>
    </div>
    </>
  )
}

export default App
