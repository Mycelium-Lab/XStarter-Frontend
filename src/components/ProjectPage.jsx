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
    console.log(sales.finished[0]);
    return (
      <div className="xs-body-projects">
          <ProjectPageIDOs sales={sales.current} title="Current"/>
          <ProjectPageIDOs sales={sales.upcoming} title="Upcoming"/>
          <ProjectPageIDOs sales={sales.finished} title="Finished"/>
          <SalePage sale={sales.finished[0]} />
      </div>
      );
  }else{
    return (<div className="xs-body-projects"></div>)
  }

}

export default ProjectPage;