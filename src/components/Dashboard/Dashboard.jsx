// src/components/Dashboard.jsx

const Dashboard = ({ user }) => {

  return (
    <main>
      <h1>
        Welcome, {user}
      </h1>
      <p>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
};

export default Dashboard;

