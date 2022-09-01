
import { useCollection } from '../../hooks/useCollection'
import { Outlet } from "react-router-dom";
import ProjectList from '../../component/ProjectList';
const Dashboard = () => {
const { documents,error } =useCollection('projects')
console.log(documents)
    return (
      <div>
        <h2 className="page-title">Dashboard</h2>
        {error && <p className="error">{error}</p>}
        {documents && <ProjectList projects={documents} />}
        <Outlet />
      </div>
    );
};

export default Dashboard;