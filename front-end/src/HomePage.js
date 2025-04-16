import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage=()=>{
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:9999/projects")
          .then((res) => setProjects(res.data))
          .catch((error) => console.error("Error fetching projects:", error));
      }, []);

    return (
        <div className="container mt-5">
           <h1 className="mb-4">List of Projects</h1>
           <h3>
            <Link  className="btn btn-primary mb-3">
               Add new project
           </Link>
           </h3>
           <table className="table table-bordered table-striped">
             <thead>
             <tr>
            <th>Id</th>
            <th>Project Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Type</th>
            <th>Department Name</th>
            </tr>
             </thead>
             <tbody>
             {projects.map((project) => (
            <tr key={project.id || project._id}>
              <td>{project.id || project._id}</td>
              <td>
                <Link
                //   to={`/employees/${project.departmentId}`}
                //   state={{ departmentName: project.departmentName }} // Pass departmentName
                >
                  {project.name}
                </Link>
              </td>
              <td>{project.description}</td>
              <td>{project.startDate}</td>
              <td>{project.type}</td>
              <td>{project.departmentName}</td>
            </tr>
          ))}
             </tbody>
           </table>
        </div>
    )
}
export default HomePage;