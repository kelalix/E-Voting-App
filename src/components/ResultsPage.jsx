import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, Award, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ResultsPage = ({ candidates }) => {
  const navigate = useNavigate();
  
  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
  const winner = sortedCandidates[0];
  
  const chartData = candidates.map(candidate => ({
    name: candidate.name,
    votes: candidate.votes,
    percentage: totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : 0
  }));

  const COLORS = ['#3B82F6', '#14B8A6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50"
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
            </motion.div>
            
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Live Results</h1>
                <p className="text-sm text-gray-500">Real-time election data</p>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Votes</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{totalVotes}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <Users className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Candidates</p>
                <p className="text-3xl font-bold text-teal-600 mt-2">{candidates.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Leading</p>
                <p className="text-lg font-bold text-green-600 mt-2">
                  {winner?.name || 'No votes yet'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <Award className="w-8 h-8" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bar Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vote Count by Candidate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [value, 'Votes']}
                  labelFormatter={(label) => `Candidate: ${label}`}
                />
                <Bar dataKey="votes" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vote Share Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="votes"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, 'Votes']}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Candidate Results Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Detailed Results</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Party
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Votes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedCandidates.map((candidate, index) => {
                  const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : 0;
                  return (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className={index === 0 ? 'bg-green-50' : ''}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index === 0 && <Award className="w-5 h-5 text-yellow-500 mr-2" />}
                          <span className={`text-sm font-medium ${index === 0 ? 'text-green-800' : 'text-gray-900'}`}>
                            #{index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={candidate.image}
                            alt={candidate.name}
                          />
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${index === 0 ? 'text-green-800' : 'text-gray-900'}`}>
                              {candidate.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${index === 0 ? 'text-green-700' : 'text-gray-600'}`}>
                          {candidate.party}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-lg font-semibold ${index === 0 ? 'text-green-800' : 'text-gray-900'}`}>
                          {candidate.votes}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div
                              className={`h-2 rounded-full ${index === 0 ? 'bg-green-600' : 'bg-blue-600'}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${index === 0 ? 'text-green-800' : 'text-gray-900'}`}>
                            {percentage}%
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {totalVotes === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🗳️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Votes Yet</h3>
            <p className="text-gray-600 mb-6">
              The election is open and ready for votes. Results will appear here in real-time.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/voter/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
            >
              Register to Vote
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultsPage;