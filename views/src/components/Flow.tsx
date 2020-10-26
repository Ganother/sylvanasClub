import React from 'react'
import ReactDOM from 'react-dom'
import eventEmitter from '../models/event'
import { getMinIndex } from '../models/util'

interface FlowProps {
  children: React.ReactNode
  rows: number
}
interface ItemProps {
  children: React.ReactNode
  index: number
}

const colPadding = 20 // 行间距
let flowId = 0

export class FlowItem extends React.Component<ItemProps, any>{
  state: any
  updatePosition: any
  constructor(props: ItemProps) {
    super(props)
    this.state = { style: { top: '0', left: '50%', transform: 'translateX(-50%)', opacity: 0 } }
    eventEmitter.on('flow-item-update' + this.props.index, updatePosition)
    let self = this
    function updatePosition(index: number, position: any) {
      if (index == self.props.index) {
        self.setState({ 'style': position })
        eventEmitter.remove('flow-item-update' + self.props.index, updatePosition)
      }
    }
  }
  componentWillUpdate() {

  }
  componentDidMount() {
    let self = this
    let divDom: any = ReactDOM.findDOMNode(this)
    let img = divDom.getElementsByTagName('img')
    if (img && img.length) {
      let image = new Image()
      image.onload = function () {
        eventEmitter.emit('flow-item-height' + flowId, [divDom.offsetHeight, self.props.index])
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
    this.state = { list: [], rows: [], mainWidth: 0, itemWidth: 0, style: { 'height': 0 } }
    this.initRows()
    let self = this
    flowId++;
    if (eventEmitter.has('flow-item-height' + (flowId - 1))) {
      eventEmitter.remove('flow-item-height' + (flowId - 1))
    }
    eventEmitter.on('flow-item-height' + flowId, (height, index) => {
      let { rows, mainWidth, itemWidth } = self.state
      let rowIndex = getMinIndex(rows)
      eventEmitter.emit('flow-item-update' + index, [index, {
        top: rows[rowIndex],
        left: rowIndex * (mainWidth / rows.length) + rowIndex * colPadding,
        transfrom: 'translateX(0)',
        opacity: 1,
        width: itemWidth
      }])
      rows[rowIndex] += (height + 20)
      this.setState({ style: { 'height': Math.max.apply(null, rows) + 'px' } })
    })
  }
  componentDidMount() {
    this.getMainWidth()

  }
  componentWillUpdate() {
  }
  componentDidUpdate() {
    this.getMainWidth()
  }
  getMainWidth() {
    let ul: any = ReactDOM.findDOMNode(this)
    this.state.mainWidth = ul.offsetWidth
    this.setItemWidth()
  }
  setItemWidth() {
    let {rows, mainWidth, itemWidth} = this.state
    let length = rows.length
    itemWidth = Math.floor((mainWidth - colPadding * (length - 1)) / length)
  }
  initRows() {
    this.state.rows = []
    let i = 0
    while (i < this.props.rows) {
      this.state.rows.push(0)
      i++;
    }
  }
  render() {
    let { children } = this.props
    return (
      <div className="flow-wrap" style={this.state.style}>
        {children}
      </div>
    )
  }
} 