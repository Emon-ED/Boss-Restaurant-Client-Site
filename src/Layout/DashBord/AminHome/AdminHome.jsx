import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaSpoon, FaUser } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { MdBorderColor } from "react-icons/md";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,PieChart, Pie, Sector, ResponsiveContainer, Legend } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const {data:stats={}} = useQuery({
        queryKey:['admin-stats'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/admin-stats');        
            return res.data;
        }
    });
// chart info ----------------
const{data:chartData =[]} = useQuery({
  queryKey:['order-stats'],
  queryFn: async()=>{
    const res = await axiosSecure.get('/order-stats');
    return res.data
    
  }
})
// Chart data showing-------------------
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// Pie chart data showing -----------
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const pieChartData = chartData.map(data=>{
  return{name:data.category,value:data.revenue}
})
    return (
        <div className="dark:text-white lg:h-screen h-full text-black">
            <h1 className="text-3xl font-bold my-5">
                <span className="mr-3">Hi, Welcome</span>  
                 {
                    user. displayName ? user.displayName : 'Back'
                }
                </h1>

              <div className="flex justify-center">
              <div className=" stats w-80 lg:w-full stats-vertical lg:stats-horizontal  dark:shadow-white shadow-lg shadow-black">
  <div className="stat dark:text-white  text-black bg-white dark:bg-black ">
    <div className="stat-title text-center dark:text-white  text-black bg-white dark:bg-black">Total Revenue</div>
    <div className="stat-value flex justify-center gap-5 items-center ">{stats.revenue?.toFixed(2)} <FaDollarSign></FaDollarSign></div>
    
  </div>

  <div className="stat dark:text-white  text-black bg-white dark:bg-black">
    <div className="stat-title text-center dark:text-white  text-black bg-white dark:bg-black">Total Users</div>
    <div className="stat-value flex justify-center gap-5 items-center ">{stats.totalUser} <FaUser className="text-2xl"></FaUser></div>
    
  </div>

  <div className="stat dark:text-white  text-black bg-white dark:bg-black">
    <div className="stat-title text-center dark:text-white  text-black bg-white dark:bg-black">Total Items</div>
    <div className="stat-value flex justify-center gap-5 items-center ">{stats.totalItems} <ImSpoonKnife></ImSpoonKnife></div>
    
  </div>
  <div className="stat dark:text-white  text-black bg-white dark:bg-black">
    <div className="stat-title text-center dark:text-white  text-black bg-white dark:bg-black">Total Orders</div>
    <div className="stat-value flex justify-center gap-5 items-center ">{stats.totalOrders} <MdBorderColor /></div>
   
  </div>
</div>
              </div>
            <div className="my-8 mx-auto flex flex-col gap-5 md:flex-row ">
            <div className="lg:w-1/2 md:w-1/2 w-full ">
            <h1 className="text-xl my-2 font-bold">Order Chart</h1>
              <BarChart
      width={300}
      height={200}
      data={chartData}
      margin={{
        top: 30,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 6]} />
        ))}
      </Bar>
    </BarChart>
              </div>

              {/* Pie Chart --------------------- */}
              <div className="lg:w-1/2 md:w-1/2 w-full ">
              <h1 className="text-xl my-2 font-bold">Revenue Chart</h1>
              <PieChart width={300} height={200}>
              <Legend ></Legend>
          <Pie 
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
        </PieChart>
              </div>
            </div>
        </div>
    );
};

export default AdminHome;