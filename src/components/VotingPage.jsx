import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Vote, Check, LogOut, BarChart3, User, ChevronRight } from 'lucide-react';

const VotingPage = ({ candidates, onVote, hasVoted, currentVoter }) => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(hasVoted);

  const handleVoteClick = (candidate) => {
    if (!voteSubmitted) {
      setSelectedCandidate(candidate);
      setShowConfirmModal(true);
    }
  };

  const confirmVote = () => {
    const success = onVote(selectedCandidate.id);
    if (success) {
      setVoteSubmitted(true);
      setShowConfirmModal(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

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
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Vote className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Voting Portal</h1>
                <p className="text-sm text-gray-500">Welcome, {currentVoter?.fullName}</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/results')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Results</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {voteSubmitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 text-green-600 rounded-full mb-6">
              <Check className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Voting!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Your vote has been successfully recorded and counted.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/results')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
            >
              View Live Results
            </motion.button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Choose Your Candidate
              </h2>
              <p className="text-xl text-gray-600">
                Select the candidate you want to vote for. Your choice is final and secure.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {candidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    className="w-full h-64 object-cover"
                  />
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {candidate.name}
                        </h3>
                        <p className="text-blue-600 font-medium">
                          {candidate.party}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {candidate.description}
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleVoteClick(candidate)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Vote className="w-5 h-5" />
                      <span>Vote for {candidate.name.split(' ')[0]}</span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedCandidate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 w-full max-w-md text-center"
          >
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Vote className="w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Confirm Your Vote
            </h3>
            <p className="text-gray-600 mb-6">
              You are about to vote for:
            </p>
            
            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <h4 className="text-lg font-semibold text-blue-900">
                {selectedCandidate.name}
              </h4>
              <p className="text-blue-700">
                {selectedCandidate.party}
              </p>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone. Are you sure you want to proceed?
            </p>
            
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirmVote}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Confirm Vote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VotingPage;