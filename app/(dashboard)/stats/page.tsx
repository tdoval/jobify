import { getStatsAction, getChartsDataAction } from "@/utils/actions";

const StatsPage = async () => {
    const charts = await getChartsDataAction();
    return <h1 className="text-4xl">StatsPage</h1>;
};

export default StatsPage;
