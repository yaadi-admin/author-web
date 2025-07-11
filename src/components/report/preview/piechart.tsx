import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
interface LabelProps {
    cx: any;
    cy: any;
    midAngle: any;
    innerRadius: any;
    outerRadius: any;
    percent: any;
    index: any;
}

interface Owner {
    ownerName: string;
    percentage: string;
}

interface IntakeProps {
    currentOwner: string;
    otherOwners: Owner[];
}

const mydata = {
    otherOwners: [
        { "ownerName": 'Sabre Corporate', "percentage": "20" },
    ]
}

// const COLORS = ['#236C95', '#1C4862', '#A8DADC', '#F1FAEE', '#457B9D', '#E63946', '#1D3557'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className='text-sm font-semibold'>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const OwnershipPieChart = ({ intake, primaryColor, secondaryColor }: { intake: IntakeProps, primaryColor: string, secondaryColor: string }) => {
    const COLORS = [primaryColor, secondaryColor];
    const data = [
        {
            name: intake?.currentOwner || 'Unknown Owner',
            value: 100 - (intake?.otherOwners?.reduce((acc, owner) => acc + parseInt(owner.percentage), 0) || 0),
        },
        ...(intake?.otherOwners
            ?.filter((owner: Owner) => owner.percentage && owner.ownerName.trim().length)
            ?.map((owner: Owner) => ({
                name: owner.ownerName,
                value: parseInt(owner.percentage),
            })) || [])
    ];

    return (
        <div>

            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Legend layout="vertical" />
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OwnershipPieChart;
