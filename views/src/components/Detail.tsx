import React from 'react'
import axios from 'axios'
import markdown from 'markdown-it'
import highlight from 'highlight.js'
interface DetailProps {
  match: any
}
let md = new markdown()
md.set({
  breaks: true,
  highlight: function (str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          highlight.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (__) { }
    }

    return ''; // use external default escaping
  }
})
export class Detail extends React.Component<DetailProps, any> {
  public state: any
  constructor(props) {
    super(props)
    this.state = { detail: {} }
    let self = this
    axios.get('/get_article_by_id?id=' + self.props.match.params.id).then(res => {
      self.setState({ detail: res.data.data })
    })
  }
  componentDidMount() {
  }
  render() {
    const detail = this.state.detail
    return (
      <div className="detail-wrapper">
        <p className="title">{detail.title}</p>
        <div dangerouslySetInnerHTML={{ __html: md.render(detail.body || '') }}></div>
      </div>
    )
  }
}