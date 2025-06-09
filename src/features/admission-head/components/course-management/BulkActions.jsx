import React, { useState } from 'react';

const initialCourses = [
  { id: 1, name: 'B.Tech Computer Science', status: 'Active' },
  { id: 2, name: 'MBA Finance', status: 'Draft' },
  { id: 3, name: 'M.Sc Data Science', status: 'Active' },
];

const bulkActions = ['Archive', 'Publish', 'Assign Counselor', 'Update Fees'];

const BulkActions = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelect = (id) => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };

  const handleSelectAll = () => {
    if (selected.length === courses.length) setSelected([]);
    else setSelected(courses.map(c => c.id));
  };

  const handleBulkAction = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    // For demo, just clear selection and action
    setSelected([]);
    setAction('');
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Bulk Actions</h2>
      <div className="flex gap-4 items-center">
        <select
          value={action}
          onChange={e => setAction(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Select Bulk Action</option>
          {bulkActions.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <button
          onClick={handleBulkAction}
          disabled={!action || selected.length === 0}
          className={`px-4 py-2 rounded text-white ${!action || selected.length === 0 ? 'bg-gray-300' : 'bg-primary hover:bg-primary-dark'}`}
        >
          Apply
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="checkbox"
                  checked={selected.length === courses.length}
                  onChange={handleSelectAll}
                  className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map(course => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selected.includes(course.id)}
                    onChange={() => handleSelect(course.id)}
                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{course.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Confirm Bulk Action</h3>
            <p className="mb-6">Are you sure you want to <span className="font-semibold text-primary">{action}</span> for <span className="font-semibold">{selected.length}</span> selected course(s)?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkActions; 