import React from 'react'
import ReactDOM from 'react-dom'
import { Article } from './interface'
import axios from 'axios'
import eventEmitter from '../models/event'
import { getMinIndex } from '../models/util'
import classnames from 'classnames'

interface FlowProps {
  children: React.ReactNode
  rows: number
}
interface ItemProps {
  children: React.ReactNode
  index: number
}
// 每一列
interface Row {
  height: number
}

const rowPadding = 20 // 列间距
const colPadding = 20 // 行间距

export class FlowItem extends React.Component<ItemProps, any>{
  state: any
  updatePosition: any
  constructor(props: ItemProps) {
    super(props)
    this.state = { style: { top: '100%', left: '50%', transform: 'translateX(-50%)', opacity: 0 } }
    eventEmitter.on('flow-item-update' + this.props.index, updatePosition)
    let self = this
    function updatePosition(index, position) {
      console.log(index, position)
      if (index == self.props.index) {
        self.setState({'style': position})
        eventEmitter.remove('flow-item-update' + self.props.index, updatePosition)
      }
    }
  }
  componentDidMount() {
    let self = this
    let divDom: any = ReactDOM.findDOMNode(this)
    let img = divDom.getElementsByTagName('img')
    if (img && img.length) {
      let image = new Image()
      image.onload = function () {
        eventEmitter.emit('flow-item-height', [divDom.offsetHeight, self.props.index])
      }
      image.src = img[0].src
    }
  }
  render() {
    return (
      <div className="flow-item" style={this.state.style}>
        {this.props.children}
      </div>
    )
  }
}
export class Flow extends React.Component<FlowProps, any> {
  state: any
  constructor(props: FlowProps) {
    super(props)
    this.state = { list: [], rows: [], mainWidth: 0, itemWidth: 0 }
    let i = 0
    while (i < props.rows) {
      this.state.rows.push(0)
      i++;
    }
    let self = this
    eventEmitter.on('flow-item-height', (height, index) => {
      console.log(height, index)
      let { rows, mainWidth } = self.state
      let rowIndex = getMinIndex(rows)
      eventEmitter.emit('flow-item-update' + index, [index, {
        top: rows[rowIndex],
        left: rowIndex * (mainWidth / rows.length) + rowIndex * colPadding,
        transfrom: 'translateX(0)',
        opacity: 1
      }])
      rows[rowIndex] += (height + colPadding)
    })
  }
  componentDidMount() {
    this.getMainWidth()
  }
  componentDidUpdate() {
    this.getMainWidth()
  }
  getMainWidth() {
    let ul: any = ReactDOM.findDOMNode(this)
    this.state.mainWidth = ul.offsetWidth
  }
  render() {
    let { children, rows } = this.props
    return (
      <div className="flow-wrap">
        {children}
      </div>
    )
  }
} 