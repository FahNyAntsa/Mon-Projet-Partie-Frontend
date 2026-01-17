import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from "recharts";
function Charts({DataCommand}) {
    return (
        <BarChart
            style={{maxWidth:'50vw',maxHeight:'70vh',aspectRatio:1.618}}
            responsive
            width={400}
            height={300}
            barSize={25}
            data={DataCommand}
            margin={{
                top:20,
                right:0,
                left:0,
                bottom:5
            }}
        >
            <CartesianGrid strokeDasharray={"3 3"}/>
            <XAxis dataKey={"Price"}/>
            <YAxis width={"auto"}/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey={"Price"} stackId={"a"} fill="#8884d8"/>
            {/* <Bar dataKey={"amt"} stackId={"a"} fill="#82ca9d"/> */}
            {/* <Bar dataKey={"uv"}  fill="#ffc658"/> */}
        </BarChart>
    )
}

export default Charts;