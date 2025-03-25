"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, Filter } from "lucide-react"
import { motion } from "framer-motion"
import axios from "axios"
import Image from "next/image"

export default function YourDataPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const [dl,setDL] = useState();
  const [ml,setML] = useState();
  

  useEffect(()=>{
    async function fetch() {
      const userId = await localStorage.getItem("userId");
      console.log(userId);
      const response = await axios.post('http://localhost:4000/booked/getBooking',{
        userId      
      });
      const respone2 = await axios.post('http://localhost:4000/booked/getdl',{
        userId
        });
        console.log(respone2.data)
        setDL(respone2.data);
      console.log(response.data);
      setML(response.data)
    }
    fetch()
  },[])
  // Mock data for demonstration
  // const cropData = [
  //   { name: "Tomatoes", area: 2500, yield: 450, revenue: 9000 },
  //   { name: "Cucumbers", area: 1800, yield: 380, revenue: 7600 },
  //   { name: "Peppers", area: 1200, yield: 250, revenue: 6250 },
  //   { name: "Lettuce", area: 900, yield: 200, revenue: 4000 },
  //   { name: "Carrots", area: 1500, yield: 320, revenue: 6400 },
  // ]

  // const serviceHistory = [
  //   { id: "SRV001", date: "2023-10-15", type: "Drone Service", status: "Completed" },
  //   { id: "SRV002", date: "2023-11-02", type: "Rover Service", status: "Completed" },
  //   { id: "SRV003", date: "2023-12-10", type: "Rover & Drone", status: "Completed" },
  //   { id: "SRV004", date: "2024-01-05", type: "Drone Service", status: "Scheduled" },
  // ]

  // const soilData = [
  //   { name: "Nitrogen", value: 45 },
  //   { name: "Phosphorus", value: 30 },
  //   { name: "Potassium", value: 25 },
  // ]

  // const COLORS = ["#4ade80", "#22c55e", "#16a34a"]

  // const container = {
  //   hidden: { opacity: 0 },
  //   show: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //     },
  //   },
  // }

  // const item = {
  //   hidden: { opacity: 0, y: 20 },
  //   show: { opacity: 1, y: 0 },
  // }

  // return (
  //   <div className="space-y-6 mt-10 mx-10">
  //     <div className="flex justify-between items-center">
  //       <div className="space-y-2">
  //         <h1 className="text-3xl font-bold tracking-tight text-green-700 dark:text-green-300">{t("nav.data")}</h1>
  //         <p className="text-muted-foreground">View and analyze your agricultural data</p>
  //       </div>
  //       <div className="flex gap-2">
  //         <Button variant="outline" size="sm">
  //           <Filter className="h-4 w-4 mr-2" />
  //           Filter
  //         </Button>
  //         <Button variant="outline" size="sm">
  //           <Download className="h-4 w-4 mr-2" />
  //           Export
  //         </Button>
  //       </div>
  //     </div>

  //     <Tabs defaultValue="overview" onValueChange={setActiveTab}>
  //       <TabsList>
  //         <TabsTrigger value="overview">Overview</TabsTrigger>
  //         <TabsTrigger value="crops">Crops</TabsTrigger>
  //         <TabsTrigger value="services">Services</TabsTrigger>
  //         <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
  //       </TabsList>

  //       <TabsContent value="overview" className="space-y-4">
  //         <motion.div className="grid gap-4 md:grid-cols-3" variants={container} initial="hidden" animate="show">
  //           <motion.div variants={item}>
  //             <Card>
  //               <CardHeader className="pb-2">
  //                 <CardTitle className="text-sm font-medium">Total Land Area</CardTitle>
  //               </CardHeader>
  //               <CardContent>
  //                 <div className="text-2xl font-bold">7,900 sq ft</div>
  //                 <p className="text-xs text-muted-foreground">+5% from last month</p>
  //               </CardContent>
  //             </Card>
  //           </motion.div>
  //           <motion.div variants={item}>
  //             <Card>
  //               <CardHeader className="pb-2">
  //                 <CardTitle className="text-sm font-medium">Total Yield</CardTitle>
  //               </CardHeader>
  //               <CardContent>
  //                 <div className="text-2xl font-bold">1,600 kg</div>
  //                 <p className="text-xs text-muted-foreground">+12% from last season</p>
  //               </CardContent>
  //             </Card>
  //           </motion.div>
  //           <motion.div variants={item}>
  //             <Card>
  //               <CardHeader className="pb-2">
  //                 <CardTitle className="text-sm font-medium">Revenue</CardTitle>
  //               </CardHeader>
  //               <CardContent>
  //                 <div className="text-2xl font-bold">$33,250</div>
  //                 <p className="text-xs text-muted-foreground">+8% from last season</p>
  //               </CardContent>
  //             </Card>
  //           </motion.div>
  //         </motion.div>

  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Yield Trends</CardTitle>
  //             <CardDescription>Monthly yield data for the current year</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <ResponsiveContainer width="100%" height={300}>
  //               <BarChart
  //                 data={[
  //                   { month: "Jan", yield: 120 },
  //                   { month: "Feb", yield: 150 },
  //                   { month: "Mar", yield: 180 },
  //                   { month: "Apr", yield: 220 },
  //                   { month: "May", yield: 280 },
  //                   { month: "Jun", yield: 310 },
  //                   { month: "Jul", yield: 340 },
  //                 ]}
  //                 margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
  //               >
  //                 <CartesianGrid strokeDasharray="3 3" />
  //                 <XAxis dataKey="month" />
  //                 <YAxis />
  //                 <Tooltip />
  //                 <Bar dataKey="yield" fill="#16a34a" />
  //               </BarChart>
  //             </ResponsiveContainer>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>

  //       <TabsContent value="crops" className="space-y-4">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Crop Data</CardTitle>
  //             <CardDescription>Details of your current crops</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <Table>
  //               <TableHeader>
  //                 <TableRow>
  //                   <TableHead>Crop</TableHead>
  //                   <TableHead className="text-right">Area (sq ft)</TableHead>
  //                   <TableHead className="text-right">Yield (kg)</TableHead>
  //                   <TableHead className="text-right">Revenue ($)</TableHead>
  //                 </TableRow>
  //               </TableHeader>
  //               <TableBody>
  //                 {cropData.map((crop) => (
  //                   <TableRow key={crop.name}>
  //                     <TableCell className="font-medium">{crop.name}</TableCell>
  //                     <TableCell className="text-right">{crop.area}</TableCell>
  //                     <TableCell className="text-right">{crop.yield}</TableCell>
  //                     <TableCell className="text-right">${crop.revenue}</TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </CardContent>
  //         </Card>

  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Crop Distribution</CardTitle>
  //             <CardDescription>Land area allocation by crop</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <ResponsiveContainer width="100%" height={300}>
  //               <PieChart>
  //                 <Pie
  //                   data={cropData}
  //                   cx="50%"
  //                   cy="50%"
  //                   labelLine={false}
  //                   outerRadius={100}
  //                   fill="#8884d8"
  //                   dataKey="area"
  //                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
  //                 >
  //                   {cropData.map((entry, index) => (
  //                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //                   ))}
  //                 </Pie>
  //                 <Tooltip />
  //               </PieChart>
  //             </ResponsiveContainer>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>

  //       <TabsContent value="services" className="space-y-4">
  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Service History</CardTitle>
  //             <CardDescription>Record of your booked services</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <Table>
  //               <TableHeader>
  //                 <TableRow>
  //                   <TableHead>ID</TableHead>
  //                   <TableHead>Date</TableHead>
  //                   <TableHead>Type</TableHead>
  //                   <TableHead>Status</TableHead>
  //                 </TableRow>
  //               </TableHeader>
  //               <TableBody>
  //                 {serviceHistory.map((service) => (
  //                   <TableRow key={service.id}>
  //                     <TableCell className="font-medium">{service.id}</TableCell>
  //                     <TableCell>{service.date}</TableCell>
  //                     <TableCell>{service.type}</TableCell>
  //                     <TableCell>
  //                       <span
  //                         className={`px-2 py-1 rounded-full text-xs ${
  //                           service.status === "Completed"
  //                             ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  //                             : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  //                         }`}
  //                       >
  //                         {service.status}
  //                       </span>
  //                     </TableCell>
  //                   </TableRow>
  //                 ))}
  //               </TableBody>
  //             </Table>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>

  //       <TabsContent value="soil" className="space-y-4">
  //         <div className="grid gap-4 md:grid-cols-2">
  //           <Card>
  //             <CardHeader>
  //               <CardTitle>Soil Composition</CardTitle>
  //               <CardDescription>Nutrient levels in your soil</CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <ResponsiveContainer width="100%" height={300}>
  //                 <PieChart>
  //                   <Pie
  //                     data={soilData}
  //                     cx="50%"
  //                     cy="50%"
  //                     labelLine={false}
  //                     outerRadius={100}
  //                     fill="#8884d8"
  //                     dataKey="value"
  //                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
  //                   >
  //                     {soilData.map((entry, index) => (
  //                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //                     ))}
  //                   </Pie>
  //                   <Tooltip />
  //                 </PieChart>
  //               </ResponsiveContainer>
  //             </CardContent>
  //           </Card>

  //           <Card>
  //             <CardHeader>
  //               <CardTitle>Soil Health</CardTitle>
  //               <CardDescription>Overall soil quality assessment</CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="space-y-4">
  //                 <div className="space-y-2">
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-sm font-medium">pH Level</span>
  //                     <span className="text-sm text-muted-foreground">6.8 (Good)</span>
  //                   </div>
  //                   <div className="h-2 w-full rounded-full bg-muted">
  //                     <div className="h-2 rounded-full bg-green-500" style={{ width: "75%" }}></div>
  //                   </div>
  //                 </div>

  //                 <div className="space-y-2">
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-sm font-medium">Organic Matter</span>
  //                     <span className="text-sm text-muted-foreground">4.2% (Good)</span>
  //                   </div>
  //                   <div className="h-2 w-full rounded-full bg-muted">
  //                     <div className="h-2 rounded-full bg-green-500" style={{ width: "65%" }}></div>
  //                   </div>
  //                 </div>

  //                 <div className="space-y-2">
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-sm font-medium">Moisture</span>
  //                     <span className="text-sm text-muted-foreground">38% (Optimal)</span>
  //                   </div>
  //                   <div className="h-2 w-full rounded-full bg-muted">
  //                     <div className="h-2 rounded-full bg-green-500" style={{ width: "80%" }}></div>
  //                   </div>
  //                 </div>

  //                 <div className="space-y-2">
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-sm font-medium">Microbial Activity</span>
  //                     <span className="text-sm text-muted-foreground">Medium-High</span>
  //                   </div>
  //                   <div className="h-2 w-full rounded-full bg-muted">
  //                     <div className="h-2 rounded-full bg-green-500" style={{ width: "70%" }}></div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         </div>

  //         <Card>
  //           <CardHeader>
  //             <CardTitle>Recommendations</CardTitle>
  //             <CardDescription>Based on your soil analysis</CardDescription>
  //           </CardHeader>
  //           <CardContent>
  //             <ul className="space-y-2 list-disc pl-5">
  //               <li>Add compost to increase organic matter content</li>
  //               <li>Apply nitrogen-rich fertilizer for the upcoming growing season</li>
  //               <li>Consider crop rotation to improve soil structure</li>
  //               <li>Implement cover crops during off-season to prevent erosion</li>
  //               <li>Monitor soil moisture levels during dry periods</li>
  //             </ul>
  //           </CardContent>
  //         </Card>
  //       </TabsContent>
  //     </Tabs>
  //   </div>
  // )
  return (
    <div className="flex flex-col h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">Your Data</h1>

      <Tabs defaultValue="ml" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="ml">ML Model</TabsTrigger>
          <TabsTrigger value="dl">DL Model</TabsTrigger>
        </TabsList>

        <TabsContent value="ml">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Machine Learning Model</h2>
            <p>AI ML Soil Testing Analysis.</p>
<br/>
            <h2 className="text-xl font-bold">Summary</h2>
            <div className="space-y-2 flex ">
           {ml?.message?.mldata || ""}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="dl">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Deep Learning Model</h2>
            <p>Details about your DL model go here for Plant health.</p>
            <br/>
            <h2 className="text-xl font-bold">Summary</h2>
            <div>
              <Image
              src={`https://omzbh3ymi3.ufs.sh/f/${dl?.message?.imageKey}`}
              alt="Image"
              width={400}
              height={400}
              />
            </div>
            <div className="space-y-2 flex ">
              {dl?.message?.answer || ""}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

}


