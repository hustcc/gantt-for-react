import React from 'react';
import FrappeGantt from 'frappe-gantt';

const ReactGantt = React.createClass({
  propTypes: {
    tasks: React.PropTypes.array.isRequired,
    viewMode: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func,
    onDateChange: React.PropTypes.func,
    onProgressChange: React.PropTypes.func,
    onViewChange: React.PropTypes.func
  },
  gantt: null,
  ganttId: function() {
    let d = +new Date();
    let uuid = 'GFxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
  }(),
  emptyFunc() {
  },
  // first add
  componentDidMount() {
    this.renderFrappeGanttDOM();
  },

  // TODO: redraw the gantt when update. now just change the viewMode.
  componentWillReceiveProps(nextProps) {
    if (this.gantt) this.gantt.change_view_mode(nextProps.viewMode);
  },

  // remove
  componentWillUnmount() {
    // do nothing.
  },

  // render the dom
  renderFrappeGanttDOM() {
    // init the gantt
    // if (this.gantt) this.gantt.clear();
    this.gantt = new FrappeGantt('#' + this.ganttId, this.props.tasks, {
      on_click: this.onClick || this.emptyFunc,
      on_date_change: this.onDateChange || this.emptyFunc,
      on_progress_change: this.onProgressChange || this.emptyFunc,
      on_view_change: this.onViewChange || this.emptyFunc
    });
    // change view mode
    this.gantt.change_view_mode(this.props.viewMode);
    // return the object
    return this.gantt;
  },

  // render
  render() {
    return (
      <svg id={this.ganttId} />
    );
  }
});
module.exports = ReactGantt;