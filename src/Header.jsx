import React from 'react';
import './css/header.css';

const Header = ({ activeView, onViewChange }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <button 
            className={`activity-button ${activeView === 'activity' ? 'active' : ''}`}
            onClick={() => onViewChange('activity')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79h1.51m9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75l1.2-1.19M7.5 3H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1-1.24 0-2.45-.2-3.57-.57-.1-.04-.21-.05-.31-.05-.26 0-.51.1-.71.29l-2.2 2.2c-2.83-1.45-5.15-3.76-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1z" fill={activeView === 'activity' ? '#2AC420' : '#666'}/>
            </svg>
            <span>Activity</span>
          </button>
        </div>
        <div className="right-section">
          <div className="nav-items">
            <button 
              className={`nav-button ${activeView === 'inbox' ? 'active' : ''}`}
              onClick={() => onViewChange('inbox')}
            >
              Inbox
            </button>
            <button 
              className={`nav-button ${activeView === 'all' ? 'active' : ''}`}
              onClick={() => onViewChange('all')}
            >
              All calls
            </button>
          </div>
          <button className="settings-button">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15.95 10.78c.02-.25.05-.51.05-.78s-.03-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.03.25-.05.52-.05.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" fill="#666"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
