# gantt-for-react

> [Frappe Gantt](https://github.com/frappe/gantt) components for React wrapper.

[![Build Status](https://travis-ci.org/hustcc/gantt-for-react.svg?branch=master)](https://travis-ci.org/hustcc/gantt-for-react) [![npm](https://img.shields.io/npm/v/gantt-for-react.svg?style=flat-square)](https://www.npmjs.com/package/gantt-for-react) [![npm](https://img.shields.io/npm/dt/gantt-for-react.svg?style=flat-square)](https://www.npmjs.com/package/gantt-for-react) [![npm](https://img.shields.io/npm/l/gantt-for-react.svg?style=flat-square)](https://www.npmjs.com/package/gantt-for-react)

# 1. install

```sh
npm install gantt-for-react
```

Online demo see [http://git.hust.cc/gantt-for-react/](http://git.hust.cc/gantt-for-react/).


# 2. usage

Simple demo code. for more example can see: [http://git.hust.cc/gantt-for-react/](http://git.hust.cc/gantt-for-react/)

```js
import React from 'react';
import ReactGantt from 'gantt-for-react';

<ReactGantt 
	tasks={this.getTasks()} 
	viewMode={this.state.viewMode} />
    onClick={this._func} 
	onDateChange={this._func}
	onProgressChange={this._func}
	onViewChange={this._func} />
```


# 3. component props

 - **`tasks`** (required, array)

The tasks array need to be show with gantt graph.

 - **`viewMode`** (required, string)

The view mode of gantt. Can be **Quarter Day, Half Day, Day, Week, Month**. 

And 4 event function props: `onClick`, `onDateChange`, `onProgressChange`, `onViewChange`. Document can see [here](https://frappe.github.io/gantt/).


# 4. LICENSE

MIT @[hustcc](https://github.com/hustcc)
