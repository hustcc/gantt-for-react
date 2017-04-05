'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _frappeGantt = require('frappe-gantt');

var _frappeGantt2 = _interopRequireDefault(_frappeGantt);

var _ganttjs = require('ganttjs');

var _ganttjs2 = _interopRequireDefault(_ganttjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var ReactGantt = _react2['default'].createClass({
  displayName: 'ReactGantt',

  propTypes: {
    tasks: _react2['default'].PropTypes.array.isRequired,
    viewMode: _react2['default'].PropTypes.string.isRequired,
    onClick: _react2['default'].PropTypes.func,
    onDateChange: _react2['default'].PropTypes.func,
    onProgressChange: _react2['default'].PropTypes.func,
    onViewChange: _react2['default'].PropTypes.func,
    customPopupHtml: _react2['default'].PropTypes.func
  },
  gantt: null,
  // generate unique id
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


  // redraw the gantt when update. now change the viewMode and scroll_offset
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.gantt) {
      this.gantt.refresh(nextProps.tasks);
      // 不相等才刷新
      if (this.props.viewMode !== nextProps.viewMode) {
        this.gantt.change_view_mode(nextProps.viewMode);
        this.gantt.change_scroll_offset(nextProps.viewMode, nextProps.scrollOffsets[nextProps.viewMode]);
      }
    }
  },


  // render the dom
  renderFrappeGanttDOM: function renderFrappeGanttDOM() {
    // init the gantt
    // if exist, return
    if (this.gantt) return;
    this.gantt = new _ganttjs2['default']('#' + this.ganttId, this.props.tasks, {
      on_click: this.props.onClick || this.emptyFunc,
      on_date_change: this.props.onDateChange || this.emptyFunc,
      on_progress_change: this.props.onProgressChange || this.emptyFunc,
      on_view_change: this.props.onViewChange || this.emptyFunc,
      custom_popup_html: this.props.customPopupHtml || null
    });
    // change view mode
    this.gantt.change_view_mode(this.props.viewMode);
    this.gantt.change_scroll_offset(this.props.viewMode, this.props.scrollOffsets[this.props.viewMode]);

    // return the object
    return this.gantt;
  },


  // render
  render: function render() {
    return _react2['default'].createElement('svg', { id: this.ganttId });
  }
});
module.exports = ReactGantt;