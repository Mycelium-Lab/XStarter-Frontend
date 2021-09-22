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
  const [isRightChain, setIsRightChain] = useState(true);
  const [chainName, setChainName] = useState('');
  const [isModal, setIsModal] = useState(true);
  const [isNetworkConnectionError, setIsNetworkConnectionError] = useState(false);
  const dispatch = useDispatch();
  const currentChainId = useSelector(state => state.wallet.chainId);
  const rightChainId = useSelector(state => state.wallet.correntChainId);
  const wallet = useSelector(state => state.wallet.address);
  const provider = useSelector(state => state.wallet.provider)
  const isLoaded = useSelector(state => state.wallet.isLoaded)
  const closeModal = () =>
  {
    console.log(123)
    setIsModal(false);
  }

  useEffect(() => {
    selectWallet('metaMask', dispatch);
    currentChainId === rightChainId ? setIsRightChain(true) : setIsRightChain(false);
    rightChainId === '1' ? setChainName('Mainnet') : setChainName('Rinkeby');
    console.log(wallet)
  }, [wallet, currentChainId, isLoaded])

  const switchNetwork = async() =>
  {
    try{
      const res = await window.ethereum.request({ 
          method: 'wallet_switchEthereumChain',
          params: [
              {chainId: '0x' + rightChainId}
            ]
      });
      setIsNetworkConnectionError(false);
    }catch(err){
      setIsNetworkConnectionError(true);
    }
  }

  function handleChange(page){
    setPage(page);
  }
  function ErrorModal(props)
  {
    let modal
    if(currentChainId === rightChainId && !!wallet)
    {
      modal = <div></div>
    }
    else if(currentChainId !== rightChainId && !!wallet && isLoaded && isModal)
    {
      modal = <div className="modal">
        <div className="modal-error">
          Please switch your network to {chainName}
          <button className="btn btn-modal" onClick={switchNetwork}>Switch</button>
        </div>
      </div>
    }
    else if((!wallet || !provider) && isLoaded && isModal)
    {
      modal = <div className="modal">
      <div className="modal-error">
        Please connect to MetaMask
      </div>
    </div>
    }
    else{
      modal = <div></div>
    }
    return modal
  }
  return (
    <div className="App">
      <Header handleChange={handleChange}/>
      <div className="mtop135"></div>
      <ErrorModal></ErrorModal>
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
