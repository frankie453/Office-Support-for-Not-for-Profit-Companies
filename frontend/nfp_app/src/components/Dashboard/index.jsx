import { icons } from '../../assets/icons';

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <TopAppBar />
      <MainContent>
        <RecentReports />
        <RecentEmails />
      </MainContent>
      <NavigationBar />
    </div>
  );
}; 