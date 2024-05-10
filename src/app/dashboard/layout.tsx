"use client";

import { QueryClient, QueryClientProvider } from "react-query";

import SideBar from "./_components/SideBar";

const queryClient = new QueryClient();

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-full flex overflow-hidden">
      <SideBar />
      <main className="w-full h-[calc(100vh-82px)] overflow-auto pl-5 py-5">
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </main>
    </div>
  );
};

export default DashboardLayout;
