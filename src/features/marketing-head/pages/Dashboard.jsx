import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { BarChart, LineChart, PieChart } from '../../../components/ui/charts';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Marketing Dashboard</h1>
        <div className="flex gap-4">
          <select className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-green-500">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.4%</div>
            <p className="text-xs text-green-500">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Campaign ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2x</div>
            <p className="text-xs text-green-500">+0.3x from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">3 campaigns ending soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="leads">Lead Sources</TabsTrigger>
              <TabsTrigger value="conversion">Conversion</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="h-[400px]">
                <LineChart
                  data={[
                    { name: 'Jan', leads: 400, conversions: 240 },
                    { name: 'Feb', leads: 300, conversions: 139 },
                    { name: 'Mar', leads: 200, conversions: 980 },
                    { name: 'Apr', leads: 278, conversions: 390 },
                    { name: 'May', leads: 189, conversions: 480 },
                  ]}
                  categories={['leads', 'conversions']}
                />
              </div>
            </TabsContent>
            <TabsContent value="leads" className="space-y-4">
              <div className="h-[400px]">
                <PieChart
                  data={[
                    { name: 'Social Media', value: 400 },
                    { name: 'Email', value: 300 },
                    { name: 'Direct', value: 300 },
                    { name: 'Referral', value: 200 },
                  ]}
                />
              </div>
            </TabsContent>
            <TabsContent value="conversion" className="space-y-4">
              <div className="h-[400px]">
                <BarChart
                  data={[
                    { name: 'Social Media', conversion: 24 },
                    { name: 'Email', conversion: 18 },
                    { name: 'Direct', conversion: 15 },
                    { name: 'Referral', conversion: 12 },
                  ]}
                  categories={['conversion']}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Doe', leads: 145, conversion: '32%' },
                { name: 'Jane Smith', leads: 132, conversion: '28%' },
                { name: 'Mike Johnson', leads: 128, conversion: '26%' },
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.leads} leads</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-500">{member.conversion}</p>
                    <p className="text-sm text-gray-500">conversion rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manager Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Team A', leads: 450, conversion: '28%', growth: '+12%' },
                { name: 'Team B', leads: 380, conversion: '25%', growth: '+8%' },
                { name: 'Team C', leads: 320, conversion: '22%', growth: '+5%' },
              ].map((team, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <p className="text-sm text-gray-500">{team.leads} total leads</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-500">{team.conversion}</p>
                    <p className="text-sm text-green-500">{team.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 