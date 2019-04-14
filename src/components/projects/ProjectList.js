import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const ProjectList = ({projects}) => {
    return(
        <div className="project-list section">
        {/* projects is added to projects.map to check that there are existing projects, since there might not be any projects to display from the map function and && condition prevents the map function from running*/}
            { projects && projects.map(project => {
                return(
                  // key is moved from ProjectSummary to the Link because the key should always be attached to the parent element 
                  <Link to={'/project/' + project.id} key={project.id}>   
                    <ProjectSummary project={project} />
                  </Link>   
                )
            }) }

        </div>
    )
}

export default ProjectList;