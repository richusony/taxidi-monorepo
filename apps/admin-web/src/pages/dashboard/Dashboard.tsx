import DashboardCard from "@/components/helpers/DashboardCard";

const Dashboard = () => {
    return (
        <section className="bg-black rounded-b-xl min-h-screen text-white">
            <div className="px-2 md:px-0 pt-5 flex flex-wrap items-center justify-center gap-5">
                <DashboardCard heading="Total Revenue" percentage="12.9" count="$1,250.00" message="Trending up this month" footer="Visitors for the last 6 months" isGrowing />
                <DashboardCard heading="New Customers" percentage="20" count="1,234" message="Down 20% this period" footer="Acquisition needs attention" isGrowing={false} />
                <DashboardCard heading="Active Accounts" percentage="12.5" count="45,678" message="Strong user retention" footer="Engagement exceed targets" isGrowing />
                <DashboardCard heading="Growth Rate" percentage="4.5" count="4.5%" message="Steady performance increase" footer="Meets growth projections" />
            </div>
        </section>
    );
};

export default Dashboard;