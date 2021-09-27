import React from 'react';
import ProjectPageIDOs from '../layouts/ProjectPageIDOs';
import { SaleProvider } from '../sale/saleprovider';
import { useState, useEffect } from 'react';
import SalePage from './SalePage';
function ProjectPage(props) {
  const { handleChange } = props;
  const [sales, setSales] = useState(null);
  useEffect(() => {
    if(!sales){
      setParams()
    }
  })
  const setParams = async () => {
    const saleProvider = await SaleProvider.create()
    const sales = await saleProvider.getSales();
    const [current, upcoming, finished] = SaleProvider.splitByStatus(sales);
    setSales({current, upcoming, finished})
  }
  if(sales){
    return (
      <div className="xs-body-projects">
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