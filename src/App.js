import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectPage from './components/ProjectPage.jsx';
import StakingPage from './components/StakingPage.jsx';
import TradePage from './components/TradePage.jsx';
import './App.css';
import './style.css';

import { useDispatch, useSelector } from 'react-redux';
import { selectWallet } from './wallets/actions';

function App() {
  const [page, setPage] = useState('projects');
  const dispatch = useDispatch();
  const currentChainId = useSelector(state => state.wallet.chainId);
  const wallet = useSelector(state => state.wallet.address);
  const isLoaded = useSelector(state => state.wallet.isLoaded)

  useEffect(() => {
    selectWallet('metaMask', dispatch);
  }, [wallet, currentChainId, isLoaded])

  function handleChange(page){
    setPage(page);
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

      <Footer/>
    </div>
  );
}

export default App;
