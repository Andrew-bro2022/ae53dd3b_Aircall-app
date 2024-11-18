const BASE_URL = 'https://aircall-backend.onrender.com';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const retryFetch = async (url, options = {}, retries = 3, delayMs = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(delayMs * (i + 1)); // Exponential backoff
    }
  }
};

export const api = {
  // Get all activities/calls with retry mechanism
  getActivities: async () => {
    try {
      // First attempt with longer initial delay since server might be waking up
      await delay(2000);
      return await retryFetch(`${BASE_URL}/activities`, {}, 3, 2000);
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Failed to fetch activities. The server might be starting up, please try again.');
    }
  },

  // Get single activity/call details
  getActivityDetails: async (callId) => {
    try {
      return await retryFetch(`${BASE_URL}/activities/${callId}`);
    } catch (error) {
      console.error('Error fetching activity details:', error);
      throw error;
    }
  },

  // Archive/unarchive a call
  updateCallArchiveStatus: async (callId, isArchived) => {
    try {
      return await retryFetch(
        `${BASE_URL}/activities/${callId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ is_archived: isArchived }),
        }
      );
    } catch (error) {
      console.error('Error updating archive status:', error);
      throw error;
    }
  },

  // Reset all calls to initial state
  resetCalls: async () => {
    try {
      return await retryFetch(
        `${BASE_URL}/reset`,
        {
          method: 'PATCH',
        }
      );
    } catch (error) {
      console.error('Error resetting calls:', error);
      throw error;
    }
  },
};
