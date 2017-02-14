'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _frappeGantt = require('frappe-gantt');

var _frappeGantt2 = _interopRequireDefault(_frappeGantt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ReactGantt = _react2['default'].createClass({
  displayName: 'ReactGantt',

  propTypes: {
    tasks: _react2['default'].PropTypes.array.isRequired,
    viewMode: _react2['default'].PropTypes.string.isRequired,
    onClick: _react2['default'].PropTypes.func,
    onDateChange: _react2['default'].PropTypes.func,
    onProgressChange: _react2['default'].PropTypes.func,
    onViewChange: _react2['default'].PropTypes.func
  },
  gantt: null,
  ganttId: function () {
    var d = +new Date();
    var uuid = 'GFxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  }(),
  emptyFunc: function emptyFunc() {},

  // first add
  componentDidMount: function componentDidMount() {
    this.renderFrappeGanttDOM();
  },


  // TODO: redraw the gantt when update. now just change the viewMode.
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.gantt) this.gantt.change_view_mode(nextProps.viewMode);
  },


  // remove
  componentWillUnmount: function componentWillUnmount() {
    // do nothing.
  },


  // render the dom
  renderFrappeGanttDOM: function renderFrappeGanttDOM() {
    // init the gantt
    // if (this.gantt) this.gantt.clear();
    this.gantt = new _frappeGantt2['default']('#' + this.ganttId, this.props.tasks, {
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
  render: function render() {
    return _react2['default'].createElement('svg', { id: this.ganttId });
  }
});
module.exports = ReactGantt;