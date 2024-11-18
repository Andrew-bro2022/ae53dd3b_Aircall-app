import React from 'react';

const CallItem = ({ call }) => {
  const getCallIcon = () => {
    const color = call.call_type === 'missed' ? '#FF0000' : '#FF6B6B';
    
    if (call.call_type === 'voicemail') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1C4.1 1 1 4.1 1 8C1 11.9 4.1 15 8 15C11.9 15 15 11.9 15 8C15 4.1 11.9 1 8 1Z" stroke={color} strokeWidth="1.5"/>
          <path d="M8 5v6M5 8h6" stroke={color} strokeWidth="1.5"/>
        </svg>
      );
    }

    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M15.5 11V14a1 1 0 01-1 1A13.5 13.5 0 011 1.5a1 1 0 011-1h3a1 1 0 011 1c0 1.1.2 2.2.5 3.2a1 1 0 01-.6 1.3L4.2 7.3a11 11 0 006.5 6.5l1.3-1.7a1 1 0 011.3-.6c1 .3 2.1.5 3.2.5a1 1 0 011 1z" 
          stroke={color} 
          strokeWidth="1.5"
          transform={call.direction === 'outbound' ? 'scale(-1,1) translate(-16,0)' : ''}
        />
      </svg>
    );
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCallTypeLabel = () => {
    switch (call.call_type) {
      case 'missed':
        return 'Missed call';
      case 'answered':
        return 'Answered call';
      case 'voicemail':
        return 'Voicemail';
      default:
        return '';
    }
  };

  const getCallDescription = () => {
    const directionText = call.direction === 'inbound' ? 'from' : 'to';
    const numberText = call.direction === 'inbound' ? call.from : call.to;
    const durationText = call.duration ? ` (${formatDuration(call.duration)})` : '';
    const viaText = call.via ? ` via ${call.via}` : '';
    
    return (
      <>
        <div className="call-type-label">{getCallTypeLabel()}</div>
        <div className="call-details-text">
          {`${directionText} ${numberText}${viaText}${durationText}`}
        </div>
      </>
    );
  };

  return (
    <div className={`call-item ${call.call_type} ${call.direction}`}>
      <div className={`call-icon ${call.call_type}`}>
        {getCallIcon()}
      </div>
      <div className="call-details">
        <div className="call-number">
          {call.direction === 'inbound' ? call.from : call.to}
          {call.call_type === 'missed' && <span className="missed-badge">2</span>}
        </div>
        <div className="call-description">
          {getCallDescription()}
        </div>
      </div>
      <div className="call-time">
        {formatTime(call.created_at)}
      </div>
      <div className="call-id">ID: {call.id}</div>
    </div>
  );
};

export default CallItem;
