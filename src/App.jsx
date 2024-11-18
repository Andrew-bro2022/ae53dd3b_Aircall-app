import React, { useState, useEffect } from 'react';
import Header from './Header';
import CallItem from './components/CallItem';
import BottomNavigation from './components/BottomNavigation';
import { api } from './services/api';
import './css/app.css';

const App = () => {
  const [activeView, setActiveView] = useState('activity');
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    fetchCalls();
  }, [retryCount]);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getActivities();
      setCalls(data || []);
    } catch (error) {
      setError(
        'The server is starting up. Please wait a moment and try again. ' +
        'This might take up to 30-60 seconds on the first request.'
      );
      console.error('Error fetching calls:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  const handleArchiveCall = async (callId, isArchived) => {
    try {
      setError(null);
      await api.updateCallArchiveStatus(callId, isArchived);
      fetchCalls();
    } catch (error) {
      console.error('Error updating call:', error);
      setError('Failed to update call. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).toUpperCase();
  };

  const groupCallsByDate = (calls) => {
    const grouped = {};
    calls.forEach(call => {
      const date = formatDate(call.created_at);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(call);
    });
    return Object.entries(grouped).sort((a, b) => {
      return new Date(b[1][0].created_at) - new Date(a[1][0].created_at);
    });
  };

  const filterCalls = () => {
    switch (activeView) {
      case 'inbox':
        return calls.filter(call => !call.is_archived);
      case 'all':
        return calls;
      case 'activity':
      default:
        return calls.filter(call => !call.is_archived);
    }
  };

  const filteredCalls = filterCalls();
  const groupedCalls = groupCallsByDate(filteredCalls);

  return (
    <div className="container">
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <div className="calls-container">
        {error && (
          <div className="error-message">
            <div className="error-text">{error}</div>
            <button onClick={handleRetry} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <div>Loading calls...</div>
            <div className="loading-subtext">
              Please wait while we connect to the server...
            </div>
          </div>
        ) : (
          <>
            {groupedCalls.map(([date, calls]) => (
              <div key={date}>
                <div className="date-header">{date}</div>
                {calls.map(call => (
                  <CallItem 
                    key={call.id} 
                    call={call}
                    onArchive={handleArchiveCall}
                  />
                ))}
              </div>
            ))}

            {!loading && !error && filteredCalls.length === 0 && (
              <div className="empty-state">
                {activeView === 'inbox' ? 'No calls in inbox' : 'No calls to show'}
              </div>
            )}
          </>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default App;
