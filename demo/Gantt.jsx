import React, { Component } from 'react';
import ReactGantt from '..';

export default class Gantt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: 'Day',
      tasks: this.getTasks(),
    };
  }

  componentDidMount() {
    window.setInterval(function() {
      this.setState({
        viewMode: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'][parseInt(Math.random() * 5 + 1) - 1],
        tasks: this.getTasks().slice(0, parseInt(Math.random() * 4 + 1))
      });
    }.bind(this), 5000)
  };

  getTasks = () => {
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
    tasks[1].dependencies = "Task 0";
    tasks[2].dependencies = "Task 1, Task 0";
    tasks[3].dependencies = "Task 2";
    tasks[5].dependencies = "Task 4";

    tasks[0].custom_class = "bar-milestone";
    tasks[0].progress = 60;
    return tasks;
  };

  customPopupHtml = task => {
    const end_date = task._end.format('MMM D');
    return `
      <div class="details-container">
        <h5>${task.name}</h5>
        <p>Expected to finish by ${end_date}</p>
        <p>${task.progress}% completed!</p>
      </div>
    `;
  };

  render() {
    return (
      <div className='examples'>
        <div className='parent'>
          <label> render ReactGantt Component </label>
          <div style={{overflow: 'scroll'}}>
            <ReactGantt tasks={this.state.tasks}
                        viewMode={this.state.viewMode}
                        customPopupHtml={this.customPopupHtml}
                        scrollOffsets={this.state.scrollOffsets}
            />
          </div>
        </div>
      </div>
    );
  }
}
