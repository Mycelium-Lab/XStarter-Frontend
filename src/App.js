import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage.jsx';
import StakingPage from './components/StakingPage.jsx';
import TradePage from './components/TradePage.jsx';
import './App.css';
import './style.css';

function App() {
  const [page, setPage] = React.useState('projects');

  function handleChange(page){
    setPage(page);
  }
  return (
    <div className="App">
      <Header handleChange={handleChange} />
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

      <Footer/>
    </div>
  );
}

export default App;
