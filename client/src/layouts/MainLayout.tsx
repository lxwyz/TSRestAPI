
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <section className='max-w-lg  mx-auto'>
        <Header/>
        <Outlet/>
    </section>
  )
}

export default MainLayout