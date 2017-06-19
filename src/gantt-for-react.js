import React from 'react';
import PropTypes from 'prop-types';
import GanttJS from 'frappe-gantt';

export default class ReactGantt extends React.Component {
  constructor(props) {
    super(props);
    this.gantt = null; // echarts div element
    this.ganttId = this.generateGanttId();
  }

  // generate unique id
  generateGanttId() {
    let d = +new Date();
    const uuid = 'GFxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  };

  emptyFunc() {
  };

  // first add
  componentDidMount() {
    this.renderFrappeGanttDOM();
  };

  // redraw the gantt when update. now change the viewMode and scroll_offset
  componentWillReceiveProps(nextProps) {
    if (this.gantt) {
      this.gantt.refresh(nextProps.tasks);
      // 不相等才刷新
      if (this.props.viewMode !== nextProps.viewMode) {
        this.gantt.change_view_mode(nextProps.viewMode);
        // if (nextProps.scrollOffsets && nextProps.scrollOffsets.hasOwnProperty(nextProps.viewMode)){
        //   this.gantt.change_scroll_offset(nextProps.viewMode, nextProps.scrollOffsets[nextProps.viewMode]);
        // }
      }
    }
  };

  // render the dom
  renderFrappeGanttDOM() {
    // init the gantt
    // if exist, return
    if (this.gantt) return this.gantt;
    this.gantt = new GanttJS('#' + this.ganttId, this.props.tasks, {
      on_click: this.props.onClick || this.emptyFunc,
      on_date_change: this.props.onDateChange || this.emptyFunc,
      on_progress_change: this.props.onProgressChange || this.emptyFunc,
      on_view_change: this.props.onViewChange || this.emptyFunc,
      custom_popup_html: this.props.customPopupHtml || null
    });
    // change view mode
    this.gantt.change_view_mode(this.props.viewMode);
    // change the scroll offset
    // if(this.props.scrollOffsets && this.props.scrollOffsets.hasOwnProperty(this.props.viewMode)){
    //   this.gantt.change_scroll_offset(this.props.viewMode, this.props.scrollOffsets[this.props.viewMode]);
    // }
    // return the object
    return this.gantt;
  };

  // render
  render() {
    return (
      <svg id={this.ganttId} />
    );
  }
};

ReactGantt.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      start: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
      ]).isRequired,
      end: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
      ]).isRequired,
      progress: PropTypes.number.isRequired,
      dependencies: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string,
      ]),
      custom_class: PropTypes.string,
    })
  ).isRequired,
  viewMode: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onDateChange: PropTypes.func,
  onProgressChange: PropTypes.func,
  onViewChange: PropTypes.func,
  customPopupHtml: PropTypes.func,
};

ReactGantt.defaultProps = {
  tasks: [],
  viewMode: 'Day',
};
