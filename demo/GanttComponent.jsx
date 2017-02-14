import React from 'react';
import ReactGantt from '..';

const GanttComponent = React.createClass({
  getTasks: function() {
    let names = [
      ["Redesign website", [0, 7]],
      ["Write new content", [1, 4]],
      ["Apply new styles", [3, 6]],
      ["Review", [7, 7]],
      ["Deploy", [8, 9]],
      ["Go Live!", [10, 10]]
    ];

    let tasks = names.map(function(name, i) {
      let today = new Date();
      let start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      let end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      start.setDate(today.getDate() + name[1][0]);
      end.setDate(today.getDate() + name[1][1]);
      return {
        start: start,
        end: end,
        name: name[0],
        id: "Task " + i,
        progress: parseInt(Math.random() * 100, 10)
      }
    });
    tasks[1].dependencies = "Task 0"
    tasks[2].dependencies = "Task 1, Task 0"
    tasks[3].dependencies = "Task 2"
    tasks[5].dependencies = "Task 4"
    return tasks;
  },
  getInitialState: function() {
    return {
      viewMode: 'Month'
    };
  },
  componentDidMount: function() {
    setTimeout(function() {
      this.setState({viewMode: 'Week'});
    }.bind(this), 2000)
  },
  render: function() {
    return (
      <div className='examples'>
        <div className='parent'>
          <label> render ReactGantt Component </label>
          <div style={{overflow: 'scroll'}}>
            <ReactGantt tasks={this.getTasks()} viewMode={this.state.viewMode} />
          </div>
        </div>
      </div>
    );
  }
});

export default GanttComponent;