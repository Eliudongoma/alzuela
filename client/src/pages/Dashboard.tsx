import { Box} from '@chakra-ui/react'
import { Footer } from '../components'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Profile, Sidebar } from '../components/sidebar/Index'

const Dashboard = () => {

  const location = useLocation()
  const [tab, setTab] = useState<string | null>('')

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');    
    if(tabFromUrl) setTab(tabFromUrl);
  }, [location.search])
  
  return (
    <Box mt={"90px"}>    

      {/* Sidebar */}      
      <Box>
        <Sidebar/>
      </Box>

      {/* Profile */}
      <Box>
        {tab === 'Profile' && <Profile/>}     
      </Box>
      <Footer/>
    </Box>
  )
}

export default Dashboard
