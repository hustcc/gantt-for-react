import React from 'react';

import { Link } from 'react-router'
import GanttComponent from './GanttComponent.jsx';
import AdSense from 'react-adsense';

const MainPageComponent = React.createClass({
  render: function() {
    return (
      <div>
        <h1> gantt-for-react </h1>
        <h3> Frappe Gantt components for React wrapper. <a href='https://github.com/hustcc/gantt-for-react'>hustcc/gantt-for-react</a></h3>
        
        <AdSense.Google client='ca-pub-7292810486004926' slot='7806394673' />

        <GanttComponent />
        
        <h3>Get it on GitHub! <a href='https://github.com/hustcc/gantt-for-react'>hustcc/gantt-for-react</a></h3>
      </div>
    );
  }
});

export default MainPageComponent;