import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function UniversityInfo() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const universityData = {
    name: "MBSC - Prince Mohammed Bin Salman College",
    motto: "Excellence in Business Education, Innovation in Leadership",
    established: "2018",
    type: "Private Business College",
    accreditation: "AACSB Accredited",
    location: "Riyadh, Kingdom of Saudi Arabia",
    website: "www.mbsc.edu.sa",
    phone: "+966 11 520 0000",
    email: "info@mbsc.edu.sa"
  };

  const stats = [
    { label: "Total Students", value: "2,400+", icon: "👨‍🎓" },
    { label: "Faculty Members", value: "180+", icon: "👩‍🏫" },
    { label: "Programs Offered", value: "25+", icon: "📚" },
    { label: "Research Centers", value: "8+", icon: "🔬" },
    { label: "International Partners", value: "50+", icon: "🌍" },
    { label: "Employment Rate", value: "98%", icon: "💼" }
  ];

  const colleges = [
    { name: "College of Business Administration", programs: 12, students: 1200 },
    { name: "College of Finance & Economics", programs: 8, students: 600 },
    { name: "College of Entrepreneurship", programs: 5, students: 400 },
    { name: "College of Digital Business", programs: 6, students: 300 },
    { name: "College of Leadership & Management", programs: 4, students: 200 }
  ];

  const achievements = [
    "Ranked #1 Business College in Saudi Arabia",
    "AACSB International Accreditation",
    "Winner of Best Innovation Award 2024",
    "Partnership with MIT Sloan School of Management",
    "Accredited by 12 International Bodies",
    "Research Excellence Award 2023"
  ];

  const leadership = [
    { name: "Dr. Abdullah Al-Rashid", position: "Dean", image: "👨‍💼" },
    { name: "Dr. Noura Al-Zahra", position: "Associate Dean Academic", image: "👩‍💼" },
    { name: "Dr. Khalid Al-Sayed", position: "Associate Dean Research", image: "👨‍🔬" },
    { name: "Dr. Aisha Al-Hassan", position: "Director of Student Affairs", image: "👩‍🎓" }
  ];

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header with Banner */}
      <div className="relative bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
        {/* Banner Images */}
        <div className="relative h-64 overflow-hidden">
          <img
            src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/college1/camp1.png"
            alt="MBSC Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-emerald-800/70"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{universityData.name}</h1>
              <p className="text-xl md:text-2xl italic">{universityData.motto}</p>
            </div>
          </div>
        </div>
        
        {/* Header Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="p-2 rounded-lg bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex items-center space-x-4">
                <img
                  src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/college1/collage1.png"
                  alt="MBSC Logo"
                  className="w-16 h-16"
                />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Established {universityData.established}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{universityData.accreditation}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">📍 {universityData.location}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">🏛️ Vision 2030 Initiative</p>
            </div>
          </div>
        </div>
      </div>

      {/* Second Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/college1/camp2.png"
          alt="MBSC Campus View"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-lg font-semibold">Excellence in Business Education</p>
          <p className="text-sm">Shaping Future Business Leaders of Saudi Arabia</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
          {['overview', 'colleges', 'achievements', 'leadership', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{stat.icon}</span>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* About Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About MBSC</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Mohammed Bin Salman College (MBSC) is a premier business institution in the heart of Riyadh, 
                      established as part of Saudi Arabia's Vision 2030 initiative. We are committed to developing 
                      world-class business leaders who will drive the Kingdom's economic transformation.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Our college offers cutting-edge business programs designed to meet the evolving needs of the 
                      global business landscape. With state-of-the-art facilities and partnerships with leading 
                      international institutions, MBSC provides an exceptional learning environment.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Rooted in Saudi Arabian values while embracing global business practices, MBSC prepares 
                      students to excel in both local and international markets, contributing to the Kingdom's 
                      ambitious economic goals.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Type:</span>
                      <span className="text-gray-900 dark:text-white">{universityData.type}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Location:</span>
                      <span className="text-gray-900 dark:text-white">{universityData.location}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Accreditation:</span>
                      <span className="text-gray-900 dark:text-white">{universityData.accreditation}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
                      <span className="font-medium text-gray-700 dark:text-gray-300">Website:</span>
                      <a href={`https://${universityData.website}`} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        {universityData.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colleges' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Colleges & Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colleges.map((college, index) => (
                  <motion.div
                    key={college.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{college.name}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Programs:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{college.programs}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">Students:</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{college.students.toLocaleString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">College Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">🏆</span>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{achievement}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">College Leadership</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {leadership.map((leader, index) => (
                  <motion.div
                    key={leader.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
                  >
                    <div className="text-6xl mb-4">{leader.image}</div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{leader.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{leader.position}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">📧</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Email</p>
                        <a href={`mailto:${universityData.email}`} className="text-green-600 hover:underline">
                          {universityData.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                        <a href={`tel:${universityData.phone}`} className="text-green-600 hover:underline">
                          {universityData.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">🌐</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Website</p>
                        <a href={`https://${universityData.website}`} className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          {universityData.website}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Address</p>
                        <p className="text-gray-600 dark:text-gray-300">{universityData.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Office Hours</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Sunday - Thursday</span>
                      <span className="font-medium text-gray-900 dark:text-white">8:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Friday</span>
                      <span className="font-medium text-gray-900 dark:text-white">Closed</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                      <span className="font-medium text-gray-900 dark:text-white">9:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Note:</strong> For urgent matters outside office hours, please contact our emergency hotline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 