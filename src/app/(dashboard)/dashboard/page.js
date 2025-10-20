// PROJECT IMPORTS
import DashboardDefault from "@/views/dashboard/DashboardDefault";

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export const metadata = {
    title: "Dashboard",
    description: "Dashboard",
    icons: {
        icon: '/assets/logosingle.svg',
    },
};

const Dashboard = () => {
    return <DashboardDefault />;
};

export default Dashboard;
