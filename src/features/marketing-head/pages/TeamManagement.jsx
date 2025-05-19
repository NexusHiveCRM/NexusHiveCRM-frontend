import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select } from '../../../components/ui/select';

export default function TeamManagement() {
  const [selectedTab, setSelectedTab] = useState('geographical');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Management</h1>
        <Button>Add New Team Member</Button>
      </div>

      <Tabs defaultValue="geographical" className="space-y-6">
        <TabsList>
          <TabsTrigger value="geographical">Geographical Assignment</TabsTrigger>
          <TabsTrigger value="lead-source">Lead Source Assignment</TabsTrigger>
          <TabsTrigger value="team-structure">Team Structure</TabsTrigger>
        </TabsList>

        {/* Geographical Assignment */}
        <TabsContent value="geographical">
          <Card>
            <CardHeader>
              <CardTitle>Geographical Lead Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Region</label>
                    <Select>
                      <option>North Region</option>
                      <option>South Region</option>
                      <option>East Region</option>
                      <option>West Region</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Member</label>
                    <Select>
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                      <option>Mike Johnson</option>
                    </Select>
                  </div>
                  <Button className="w-full">Assign Region</Button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Current Assignments</h3>
                  <div className="space-y-2">
                    {[
                      { region: 'North Region', member: 'John Doe', leads: 45 },
                      { region: 'South Region', member: 'Jane Smith', leads: 38 },
                      { region: 'East Region', member: 'Mike Johnson', leads: 32 },
                    ].map((assignment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{assignment.region}</p>
                          <p className="text-sm text-gray-500">{assignment.member}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{assignment.leads}</p>
                          <p className="text-sm text-gray-500">leads</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lead Source Assignment */}
        <TabsContent value="lead-source">
          <Card>
            <CardHeader>
              <CardTitle>Lead Source Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Lead Source</label>
                    <Select>
                      <option>Social Media</option>
                      <option>Email Marketing</option>
                      <option>Direct Referrals</option>
                      <option>Website</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Team Member</label>
                    <Select>
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                      <option>Mike Johnson</option>
                    </Select>
                  </div>
                  <Button className="w-full">Assign Lead Source</Button>
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium">Current Assignments</h3>
                  <div className="space-y-2">
                    {[
                      { source: 'Social Media', member: 'John Doe', leads: 120 },
                      { source: 'Email Marketing', member: 'Jane Smith', leads: 85 },
                      { source: 'Direct Referrals', member: 'Mike Johnson', leads: 65 },
                    ].map((assignment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{assignment.source}</p>
                          <p className="text-sm text-gray-500">{assignment.member}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{assignment.leads}</p>
                          <p className="text-sm text-gray-500">leads</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Structure */}
        <TabsContent value="team-structure">
          <Card>
            <CardHeader>
              <CardTitle>Team Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    team: 'Team A',
                    manager: 'John Doe',
                    members: ['Alice Smith', 'Bob Johnson', 'Carol White'],
                    totalLeads: 450,
                  },
                  {
                    team: 'Team B',
                    manager: 'Jane Smith',
                    members: ['David Brown', 'Eve Davis', 'Frank Miller'],
                    totalLeads: 380,
                  },
                  {
                    team: 'Team C',
                    manager: 'Mike Johnson',
                    members: ['Grace Lee', 'Henry Wilson', 'Ivy Taylor'],
                    totalLeads: 320,
                  },
                ].map((team, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{team.team}</h3>
                        <p className="text-sm text-gray-500">Manager: {team.manager}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{team.totalLeads}</p>
                        <p className="text-sm text-gray-500">total leads</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {team.members.map((member, memberIndex) => (
                        <div key={memberIndex} className="p-3 bg-white dark:bg-gray-700 rounded-lg">
                          <p className="font-medium">{member}</p>
                          <p className="text-sm text-gray-500">Team Member</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 