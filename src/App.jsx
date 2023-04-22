import './App.css'
import FormAge from './components/FormAge'
import { createPortal } from 'react-dom'
import Footer from './components/Footer';

const footer = document.getElementById("footer");

function App() {
  return (
    <>
      <div className="App">
        <FormAge />
      </div>
      {createPortal(
        <Footer />,
        footer
      )}
    </>
    
  )
}

export default App
