// Notifications.jsx
import React from 'react';

const Notifications = () => {
  const notifications = [
    'New assignment posted',
    'Profile updated successfully',
    'New message from admin',
    'Upcoming syllabus updates',
    'New feedback received',
    'New assignment posted',
    'Profile updated successfully',
    'New message from admin',
    'Upcoming syllabus updates',
    'New feedback received',
    'New assignment posted',
    'Profile updated successfully',
    'New message from admin',
    'Upcoming syllabus updates',
    'New feedback received',
    'New assignment posted',
    'Profile updated successfully',
    'New message from admin',
    'Upcoming syllabus updates',
    'New feedback received',
    'New assignment posted',
    'Profile updated successfully',
    'New message from admin',
    'Upcoming syllabus updates',
    'New feedback received',
  ];

  return (
    <div className="notifications-list">
      <h4>Notifications</h4>
      <ul className="list-unstyled">
        {notifications.map((notification, index) => (
          <li key={index} className="notification-item">
            {notification}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
