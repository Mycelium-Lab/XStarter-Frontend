import React from 'react';
import ProjectPageIDOs from '../layouts/ProjectPageIDOs';
import { SaleProvider } from '../sale/saleprovider';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import PulseLoader from "react-spinners/PulseLoader";
function ProjectPage(props) {
  const { handleChange } = props;
  const [sales, setSales] = useState(null);
  const currentChainId = useSelector(state => state.wallet.chainId);
  const wallet = useSelector(state => state.wallet.address);
  const isLoaded = useSelector(state => state.wallet.isLoaded)
  const isAdmin = useSelector(state => state.wallet.isAdmin)
  const provider = useSelector(state => state.wallet.provider)
  const rightChainId = useSelector(state => state.wallet.correntChainId);
  useEffect(() => {
    if(!sales && provider && isLoaded && rightChainId === currentChainId){
      setParams()
    } else if(rightChainId !== currentChainId && isLoaded){
      setSales(null)
    }
  }, [currentChainId, rightChainId, provider, isLoaded])
  useEffect( () => {
    if(sales && wallet){
        Object.keys(sales).forEach((saleType) => {
          sales[saleType].forEach((sale) => {
            sale.setAccountAddress(wallet)
          })
        })
    }
  }, [wallet])
  const setParams = async () => {
    const saleProvider = await SaleProvider.create(provider, wallet)
    const sales = await saleProvider.getSales();
    const [unapproved, current, upcoming, finished] = await saleProvider.splitByStatus(sales);
    setSales({unapproved, current, upcoming, finished})
  }
  const unapprovedSales = () => {
    if(sales.unapproved.length > 0 && isAdmin){
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
    return (
        <PulseLoader size={15} color={"#FFFFFF"} speedMultiplier={1} />
      );
  }

}
export default ProjectPage;