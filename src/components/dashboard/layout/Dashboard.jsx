import Sidebar from "./Sidebar";

const Dashboard = ({ children }) => {
  return (
    <main className="grid min-h-screen w-full md:grid-cols-[220px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <div className="flex flex-1 flex-col gap-4 p-5 lg:gap-6 lg:p-8 bg-[#f0f0f1]">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
