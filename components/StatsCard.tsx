import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

type StatsCardsProps = {
    title: string;
    value: number;
};

function StatsCards({ title, value }: StatsCardsProps) {
    return (
        <Card className="bg-muted">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="capitalize">{title}</CardTitle>
                <CardDescription className="text-4xl font-extrabold text-primary mt-[0px!important]">
                    {value}
                </CardDescription>
            </CardHeader>
        </Card>
    );
}

export default StatsCards;
