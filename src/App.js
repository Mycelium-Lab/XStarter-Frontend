import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage.jsx';
import StakingPage from './components/StakingPage.jsx';
import TradePage from './components/TradePage.jsx';
import './App.css';
import './style.css';

import SalePage from "./components/SalePage";
import CreateSalePage from "./components/CreateSalePage";
import AdminPage from './components/AdminPage';

function App() {
  const [page, setPage] = useState('projects');
  const [pageProps, setPageProps] = useState({});
  function handleChange(page, pageProps = {}){
    setPage(page);
    if(pageProps){
      setPageProps(pageProps);
    }
  }
  
  return (
    <div className="App">
      <Header handleChange={handleChange}/>
      <div className="mtop135"></div>
      { page == 'projects' &&
        <ProjectPage handleChange={handleChange} />
      }
      { page == 'staking' && 
        <StakingPage handleChange={handleChange}/>
      }
      { page == 'trade' &&
        <TradePage handleChange={handleChange}/>
      }
      { page == 'sale' && pageProps &&
          <SalePage handleChange={handleChange} sale={pageProps}/>
      }
      { page == 'createsale' &&
          <CreateSalePage handleChange={handleChange}/>
      }
      { page == 'admin' &&
          <AdminPage handleChange={handleChange}/>
      }
      <Footer/>
    </div>
  );
}

export default App;
