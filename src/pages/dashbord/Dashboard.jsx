import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { Outlet } from "react-router-dom";
import ProjectList from "../../component/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";
const Dashboard = () => {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const { user } = useAuthContext();
const changeFilter =(newFilter)=>{
  setCurrentFilter(newFilter)
}
 const projects =(documents)?documents.filter((document)=>{
  switch(currentFilter){
  case 'all':
  return true;
  case 'mine':
  let assignToMe = false;
  document.assignedUsersList.forEach((u)=>{
    if(u.id===user.uid){
    assignToMe=true
    }
  })
  return assignToMe
  case 'development':
  case 'design':
  case 'sales':
  case 'marketing':
  return(currentFilter===document.category)
  default:
  return true
  }
 }):null
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents&& <ProjectFilter
       currentFilter={currentFilter}
       changeFilter={changeFilter}
       />}
      {projects && <ProjectList projects={projects}  />}
      <Outlet />
    </div>
  );
};

export default Dashboard;
