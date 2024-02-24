import { getStatsAction } from "@/utils/actions";

const StatsPage = () => {
    getStatsAction();
    return <h1 className="text-4xl">StatsPage</h1>;
};

export default StatsPage;
