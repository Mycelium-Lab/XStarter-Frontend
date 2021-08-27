import React from 'react';
import PPCurrentIDO from '../layouts/PPCurrentIDO';
import PPUpcomingIDO from '../layouts/PPUpcomingIDO';
import PPFinishedIDO from '../layouts/PPFinishedIDO';

function ProjectPage(props) {
  const { handleChange } = props;
    return (
    <div className="xs-body-projects">

        <PPCurrentIDO />
        <PPUpcomingIDO />
        <PPFinishedIDO />
        
    </div>
    );
}

export default ProjectPage;