import React from 'react';
import ProjectPageIDOs from '../layouts/ProjectPageIDOs';
import { SaleProvider } from '../sale/saleprovider';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import saleFactoryAbi from '../sale/Abi/SaleFactory.json'
import Web3 from "web3";
import SalePage from './SalePage';
function ProjectPage(props) {
  const { handleChange } = props;
  const [sales, setSales] = useState(null);
  const [admin, setAdmin] = useState('');
  const dispatch = useDispatch();
  const currentChainId = useSelector(state => state.wallet.chainId);
  const wallet = useSelector(state => state.wallet.address);
  const isLoaded = useSelector(state => state.wallet.isLoaded)
  const provider = useSelector(state => state.wallet.provider)
  useEffect(() => {
    if(!sales && provider){
      setParams()
    }
  }, [wallet, currentChainId,isLoaded, provider])
  const setParams = async () => {
    await getAdminFromContract();
    const saleProvider = await SaleProvider.create(provider)
    const sales = await saleProvider.getSales();
    const [unapproved, current, upcoming, finished] = await saleProvider.splitByStatus(sales);
    setSales({unapproved, current, upcoming, finished})
  }
  const getAdminFromContract = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
      web3.eth.defaultAccount = accounts[0]
      const saleFactoryContract = new web3.eth.Contract(saleFactoryAbi, process.env.REACT_APP_SALE_FACTORY_ADDRESS)
      const admin = await saleFactoryContract.methods.admin().call()
      setAdmin(admin)
    }
  }
  const unapprovedSales = () => {
    if(sales.unapproved.length > 0 && wallet && admin && admin.toLowerCase() === wallet.toLowerCase()){
      return <ProjectPageIDOs handleChange={handleChange} sales={sales.unapproved} title="Unapproved"/>
    }
  }
  if(sales){
    return (
      <div className="xs-body-projects">
          {unapprovedSales()}
          <ProjectPageIDOs handleChange={handleChange} sales={sales.current} title="Current"/>
          <ProjectPageIDOs handleChange={handleChange} sales={sales.upcoming} title="Upcoming"/>
          <ProjectPageIDOs handleChange={handleChange} sales={sales.finished} title="Finished"/>
      </div>
      );
  }else{
    return (<div className="xs-body-projects"></div>)
  }

}

export default ProjectPage;