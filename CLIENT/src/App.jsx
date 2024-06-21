import { Outlet } from 'react-router-dom';
import Navigation from '../src/Layouts/Navigation/Navigation'
import './App.css'

function App() {

return (
  <>
    <Navigation></Navigation>
    
    <main className='flex-grow'>
      <Outlet></Outlet>
    </main>

  </>
)
}

export default App
