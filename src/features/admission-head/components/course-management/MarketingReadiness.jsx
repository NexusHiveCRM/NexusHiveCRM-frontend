import React, { useState } from 'react';

const initialCourses = [
  {
    id: 1,
    name: 'B.Tech Computer Science',
    checklist: {
      brochure: true,
      website: true,
      campaign: false,
    },
  },
  {
    id: 2,
    name: 'MBA Finance',
    checklist: {
      brochure: false,
      website: true,
      campaign: true,
    },
  },
  {
    id: 3,
    name: 'M.Sc Data Science',
    checklist: {
      brochure: true,
      website: false,
      campaign: false,
    },
  },
];

const MarketingReadiness = () => {
  const [courses, setCourses] = useState(initialCourses);

  const handleToggle = (id, key) => {
    setCourses(courses.map(course =>
      course.id === id
        ? { ...course, checklist: { ...course.checklist, [key]: !course.checklist[key] } }
        : course
    ));
  };

  const getScore = (checklist) => {
    const total = Object.keys(checklist).length;
    const done = Object.values(checklist).filter(Boolean).length;
    return Math.round((done / total) * 100);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Marketing Readiness</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="font-semibold text-lg">{course.name}</div>
              <div className="text-sm text-gray-500">Readiness: <span className="font-bold text-primary">{getScore(course.checklist)}%</span></div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={course.checklist.brochure} onChange={() => handleToggle(course.id, 'brochure')} />
                Brochure Ready
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={course.checklist.website} onChange={() => handleToggle(course.id, 'website')} />
                Website Updated
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={course.checklist.campaign} onChange={() => handleToggle(course.id, 'campaign')} />
                Campaign Launched
              </label>
            </div>
            <div className="mt-2">
              {getScore(course.checklist) === 100 ? (
                <span className="text-green-600 font-semibold">Ready for Marketing!</span>
              ) : (
                <span className="text-yellow-600">Needs Attention: {Object.entries(course.checklist).filter(([k, v]) => !v).map(([k]) => k.charAt(0).toUpperCase() + k.slice(1)).join(', ')}</span>
              )}
            </div>
            <button
              className={`mt-2 px-4 py-2 rounded text-white ${getScore(course.checklist) === 100 ? 'bg-green-500' : 'bg-primary hover:bg-primary-dark'}`}
              disabled={getScore(course.checklist) === 100}
            >
              {getScore(course.checklist) === 100 ? 'Ready' : 'Mark as Ready'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketingReadiness; 