import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './components/HomePage';
import VoterRegister from './components/VoterRegister';
import VoterLogin from './components/VoterLogin';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';

function App() {
  const [voters, setVoters] = useState([]);
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Smith',
      party: 'Progressive Party',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      votes: 0,
      description: 'Experienced leader focused on education and healthcare reform.'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      party: 'Unity Coalition',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      votes: 0,
      description: 'Advocate for environmental protection and sustainable development.'
    },
    {
      id: 3,
      name: 'Michael Chen',
      party: 'Innovation Alliance',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      votes: 0,
      description: 'Technology entrepreneur promoting digital transformation and job creation.'
    }
  ]);
  const [currentVoter, setCurrentVoter] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasVoted, setHasVoted] = useState(new Set());

  const addVoter = (voter) => {
    setVoters([...voters, { ...voter, id: Date.now() }]);
  };

  const addCandidate = (candidate) => {
    setCandidates([...candidates, { 
      ...candidate, 
      id: Date.now(),
      votes: 0,
      image: candidate.image || 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }]);
  };

  const removeCandidate = (candidateId) => {
    setCandidates(candidates.filter(c => c.id !== candidateId));
  };

  const vote = (candidateId) => {
    if (currentVoter && !hasVoted.has(currentVoter.id)) {
      setCandidates(candidates.map(c => 
        c.id === candidateId ? { ...c, votes: c.votes + 1 } : c
      ));
      setHasVoted(new Set([...hasVoted, currentVoter.id]));
      return true;
    }
    return false;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/voter/register" 
              element={<VoterRegister onRegister={addVoter} />} 
            />
            <Route 
              path="/voter/login" 
              element={
                <VoterLogin 
                  voters={voters} 
                  onLogin={setCurrentVoter}
                  currentVoter={currentVoter}
                />
              } 
            />
            <Route 
              path="/admin/login" 
              element={<AdminLogin onLogin={setIsAdmin} isAdmin={isAdmin} />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                isAdmin ? (
                  <AdminDashboard 
                    candidates={candidates}
                    onAddCandidate={addCandidate}
                    onRemoveCandidate={removeCandidate}
                    voters={voters}
                  />
                ) : (
                  <Navigate to="/admin/login" />
                )
              } 
            />
            <Route 
              path="/vote" 
              element={
                currentVoter ? (
                  <VotingPage 
                    candidates={candidates}
                    onVote={vote}
                    hasVoted={hasVoted.has(currentVoter?.id)}
                    currentVoter={currentVoter}
                  />
                ) : (
                  <Navigate to="/voter/login" />
                )
              } 
            />
            <Route 
              path="/results" 
              element={<ResultsPage candidates={candidates} />} 
            />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;