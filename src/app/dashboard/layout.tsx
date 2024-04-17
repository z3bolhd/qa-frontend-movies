import SideBar from "./_components/SideBar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-full flex overflow-hidden">
      <SideBar />
      <main className="w-full h-[calc(100vh-82px)] overflow-auto pl-5 py-5">{children}</main>
    </div>
  );
};

export default DashboardLayout;
