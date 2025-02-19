import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";

export default function DashboardLayout({ children }) {
return (
    <div className="flex">
      {/* Sidebar Navigation */}
    <div className="fixed md:w-64 hidden md:block">
        <SideNav />
    </div>

      {/* Main Content Area */}
    <div className="flex-1 md:ml-64">
        <DashboardHeader />
        
        <main className="p-5">{children}</main>
    </div>
    </div>
);
}
