'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _frappeGantt = require('frappe-gantt');

var _frappeGantt2 = _interopRequireDefault(_frappeGantt);

var _sizeSensor = require('size-sensor');

var _helper = require('./helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactGantt = function (_Component) {
  _inherits(ReactGantt, _Component);

  function ReactGantt() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ReactGantt);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ReactGantt.__proto__ || Object.getPrototypeOf(ReactGantt)).call.apply(_ref, [this].concat(args))), _this), _this.ganttRef = undefined, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ReactGantt, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderFrappeGanttDOM();
    }
  }, {
    key: 'componentDidUpdate',


    // redraw the gantt when update. now change the viewMode
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.ganttInst) {
        this.ganttInst.refresh(this.props.tasks);
        // 不相等才刷新
        if (this.props.viewMode !== prevProps.viewMode) {
          this.ganttInst.change_view_mode(this.props.viewMode);
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      (0, _sizeSensor.clear)(this.ganttRef);
    }

    /**
     * render the gantt chart
     * @returns {GanttJS}
     */

  }, {
    key: 'renderFrappeGanttDOM',
    value: function renderFrappeGanttDOM() {
      var _this2 = this;

      // init the Gantt
      // if exist, return
      if (this.ganttInst) return this.ganttInst;

      var _props = this.props,
          onClick = _props.onClick,
          onDateChange = _props.onDateChange,
          onProgressChange = _props.onProgressChange,
          onViewChange = _props.onViewChange,
          customPopupHtml = _props.customPopupHtml,
          tasks = _props.tasks,
          viewMode = _props.viewMode;

      // when resize

      (0, _sizeSensor.bind)(this.ganttRef, function () {
        if (_this2.ganttInst) {
          _this2.ganttInst.refresh(_this2.props.tasks);
        }
      });

      // new instance
      this.ganttInst = new _frappeGantt2.default(this.ganttRef, tasks, {
        on_click: onClick || _helper.noop,
        on_date_change: onDateChange || _helper.noop,
        on_progress_change: onProgressChange || _helper.noop,
        on_view_change: onViewChange || _helper.noop,
        custom_popup_html: customPopupHtml || null
      });
      // change view mode
      this.ganttInst.change_view_mode(viewMode);
      return this.ganttInst;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('svg', { ref: function ref(node) {
          _this3.ganttRef = node;
        } });
    }
  }]);

  return ReactGantt;
}(_react.Component);

exports.default = ReactGantt;
;
module.exports = exports['default'];