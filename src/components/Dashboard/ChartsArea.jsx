import { AreaChart,Area,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from "recharts";
function ChartsArea({DataUser}) {
    return (
        <AreaChart
            style={{maxWidth:'50vw',maxHeight:'70vh',aspectRatio:1.618}}
            responsive
            width={400}
            height={300}
            barSize={25}
            data={DataUser}
            margin={{
                top:20,
                right:0,
                left:0,
                bottom:5
            }}
        >
            <CartesianGrid strokeDasharray={"3 3"}/>
            <XAxis dataKey={"id"}/>
            <YAxis width={"auto"}/>
            <Tooltip/>
            <Legend/>
            <Area dataKey={"id"} type={"monotone"} stackId={"a"} fill="#8884d8"/>
            {/* <Bar dataKey={"amt"} stackId={"a"} fill="#82ca9d"/> */}
            {/* <Bar dataKey={"uv"}  fill="#ffc658"/> */}
        </AreaChart>
    )
}

export default ChartsArea;