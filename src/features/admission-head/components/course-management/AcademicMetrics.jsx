import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const metrics = [
  { label: 'Avg. Grade', value: 'B+', icon: '🎓', color: 'bg-blue-100 text-blue-800' },
  { label: 'Pass Rate', value: '92%', icon: '✅', color: 'bg-green-100 text-green-800' },
  { label: 'Dropout Rate', value: '4%', icon: 'bg-red-100 text-red-800' },
  { label: 'Placement Rate', value: '78%', icon: '💼', color: 'bg-yellow-100 text-yellow-800' },
];

const courseData = {
  labels: ['B.Tech CS', 'MBA Finance', 'M.Sc Data Science'],
  datasets: [
    {
      label: 'Pass Rate (%)',
      data: [95, 90, 91],
      backgroundColor: '#4f46e5',
    },
    {
      label: 'Dropout Rate (%)',
      data: [3, 5, 4],
      backgroundColor: '#f87171',
    },
    {
      label: 'Placement Rate (%)',
      data: [80, 75, 78],
      backgroundColor: '#fbbf24',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Academic Metrics by Course' },
  },
};

const AcademicMetrics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Academic Metrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <div key={idx} className={`rounded-lg p-6 flex flex-col items-center shadow ${m.color}`}>
            <span className="text-3xl mb-2">{m.icon}</span>
            <div className="text-lg font-semibold">{m.value}</div>
            <div className="text-gray-600 text-sm">{m.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <Bar data={courseData} options={options} />
      </div>
    </div>
  );
};

export default AcademicMetrics; 