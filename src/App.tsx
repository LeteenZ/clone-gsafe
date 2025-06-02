import './App.css'
import './i18n/i18n'
import Layout from './components/layout'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from './hooks/ScrollToTop';


function App() {
  return (
    <>  
     <ScrollToTop />
      <Layout />
    </>
  )
}

export default App
