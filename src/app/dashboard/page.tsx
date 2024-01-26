import Logout from '@/components/auth/logout';
import NavigationBar from '@/components/navigation-bar';

function Dashboard() {
  return (
    <>
      <NavigationBar>
        <Logout />
      </NavigationBar>
      <div>Dashboard</div>
    </>
  );
}

export default Dashboard;
