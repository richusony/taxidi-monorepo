import { IoMdTrendingUp, IoMdTrendingDown } from "react-icons/io";

interface DashboardCardProps {
    heading: string;
    percentage: string; // Fixed typo from 'percentange'
    count: string;
    message: string;
    footer: string;
    isGrowing?: boolean; // Made optional since you have a default value
}

const DashboardCard = ({
    heading,
    percentage,
    count,
    message,
    footer,
    isGrowing = true
}: DashboardCardProps) => {

    // Helper to determine visual state
    // const trendColor = isGrowing ? "text-emerald-400" : "text-rose-400";
    const TrendIcon = isGrowing ? IoMdTrendingUp : IoMdTrendingDown;

    return (
        // Card Container
        <div className="bg-[#171717] text-white rounded-xl border border-zinc-800 p-6 w-full max-w-md shadow-sm font-sans">

            {/* Header: Title and Badge */}
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-zinc-400">{heading}</span>

                {/* Badge: Dynamic color and icon */}
                <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium`}>
                    <TrendIcon className="w-3.5 h-3.5" />
                    <span>
                        {isGrowing ? "+" : "-"}{percentage}%
                    </span>
                </div>
            </div>

            {/* Main Content: Value */}
            <div className="mb-6">
                <h2 className="text-4xl font-bold tracking-tight">{count}</h2>
            </div>

            {/* Footer: Trending info */}
            <div className="flex flex-col gap-1.5">
                <div className={`flex items-center gap-2 text-sm font-medium`}>
                    <span>{message}</span>
                    <TrendIcon className="w-4 h-4" />
                </div>
                <span className="text-sm text-zinc-500">{footer}</span>
            </div>

        </div>
    );
};

export default DashboardCard;