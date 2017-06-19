'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _frappeGantt = require('frappe-gantt');

var _frappeGantt2 = _interopRequireDefault(_frappeGantt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactGantt = function (_React$Component) {
  _inherits(ReactGantt, _React$Component);

  function ReactGantt(props) {
    _classCallCheck(this, ReactGantt);

    var _this = _possibleConstructorReturn(this, (ReactGantt.__proto__ || Object.getPrototypeOf(ReactGantt)).call(this, props));

    _this.gantt = null; // echarts div element
    _this.ganttId = _this.generateGanttId();
    return _this;
  }

  // generate unique id


  _createClass(ReactGantt, [{
    key: 'generateGanttId',
    value: function generateGanttId() {
      var d = +new Date();
      var uuid = 'GFxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
      });
      return uuid;
    }
  }, {
    key: 'emptyFunc',
    value: function emptyFunc() {}
  }, {
    key: 'componentDidMount',


    // first add
    value: function componentDidMount() {
      this.renderFrappeGanttDOM();
    }
  }, {
    key: 'componentWillReceiveProps',


    // redraw the gantt when update. now change the viewMode and scroll_offset
    value: function componentWillReceiveProps(nextProps) {
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
    }
  }, {
    key: 'renderFrappeGanttDOM',


    // render the dom
    value: function renderFrappeGanttDOM() {
      // init the gantt
      // if exist, return
      if (this.gantt) return this.gantt;
      this.gantt = new _frappeGantt2['default']('#' + this.ganttId, this.props.tasks, {
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
    }
  }, {
    key: 'render',


    // render
    value: function render() {
      return _react2['default'].createElement('svg', { id: this.ganttId });
    }
  }]);

  return ReactGantt;
}(_react2['default'].Component);

exports['default'] = ReactGantt;
;

ReactGantt.propTypes = {
  tasks: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
    id: _propTypes2['default'].string.isRequired,
    name: _propTypes2['default'].string.isRequired,
    start: _propTypes2['default'].oneOfType([_propTypes2['default'].instanceOf(Date), _propTypes2['default'].string]).isRequired,
    end: _propTypes2['default'].oneOfType([_propTypes2['default'].instanceOf(Date), _propTypes2['default'].string]).isRequired,
    progress: _propTypes2['default'].number.isRequired,
    dependencies: _propTypes2['default'].oneOfType([_propTypes2['default'].arrayOf(_propTypes2['default'].string), _propTypes2['default'].string]),
    custom_class: _propTypes2['default'].string
  })).isRequired,
  viewMode: _propTypes2['default'].string.isRequired,
  onClick: _propTypes2['default'].func,
  onDateChange: _propTypes2['default'].func,
  onProgressChange: _propTypes2['default'].func,
  onViewChange: _propTypes2['default'].func,
  customPopupHtml: _propTypes2['default'].func
};

ReactGantt.defaultProps = {
  tasks: [],
  viewMode: 'Day'
};