import React from 'react'
import { withPrefix } from 'gatsby-link'
import DialogueList from './dialogue-list'

import AssSerialize from 'ass-serialize'
import 'regenerator-runtime/runtime'

let uuidv4 = require('uuid/v4')
let parse = require('ass-compiler').parse

Function.prototype.before = function(func) {
  const self = this
  return function() {
    if (func.apply(this, arguments) === false) {
      return false
    }

    return self.apply(this, arguments)
  }
}

Function.prototype.after = function(func) {
  const self = this
  return function() {
    let result = self.apply(this, arguments)
    return func.apply(this, [result])
  }
}

parse = parse.after(json => {
  json.events.dialogue = json.events.dialogue.map(d => {
    d.id = uuidv4()
    return d
  })

  return json
})

function createEmptyDialogue(start, end, text) {
  return {
    id: uuidv4(),
    Layer: 0,
    Start: start,
    End: end,
    Style: 'Default',
    Name: '',
    MarginL: 0,
    MarginR: 0,
    MarginV: 0,
    Effect: null,
    Text: {
      raw: text,
    },
  }
}

let assDisplay = null

export default class AssEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ass: '', json: {}, assFileLink: withPrefix('/test.ass') }

    this.loadAss = this.loadAss.bind(this)
  }

  async componentWillMount() {
    await this.loadAss(this.state.assFileLink)
  }

  async loadAss(link, showSuccessMessage = false) {
    const isBrowser = typeof window !== 'undefined'

    if (isBrowser) {
      try {
        let response = await window.fetch(link)
        if (response.status < 200 || response.status >= 300) {
          throw new Error(await response.text())
        }

        let ass = await response.text()
        console.log(parse(ass))
        console.log('done')

        this.setState({
          assFileLink: link,
          ass: ass,
          json: parse(ass),
          activeIndex: 0,
        })

        AssEditor.displayASS(ass)

        if (showSuccessMessage) {
          alert('加载 ASS 文件成功！')
        }
      } catch (ex) {
        alert('加载 ASS 文件失败，原因是：' + (ex.message || ex.toString()))
        throw ex
      }
    }
  }

  static displayASS(ass) {
    if (assDisplay) {
      try {
        assDisplay.destroy()
      } catch (e) {}
    }
    const isBrowser = typeof window !== 'undefined'
    if (isBrowser) {
      const ASS = require('assjs').default
      console.log('ASS = ', ASS)
      assDisplay = new ASS(ass, document.getElementById('video'))
    }
  }

  reRenderASS = () => {
    let ass = AssSerialize.serialize(this.state.json)
    this.setState({ ass })
    AssEditor.displayASS(ass)
  }

  saveASS = () => {
    this.setState({
      downloadInfo: {
        downloadLink: `data:text/plain;charset=utf-8,\ufeff${this.state.ass}`,
        filename: 'ass.ass',
      },
    })
  }

  setActiveIndex = index => {
    this.setState({ activeIndex: index })
  }

  removeDialogue = id => {
    this.setState(
      {
        json: {
          ...this.state.json,
          events: {
            ...this.state.json.events,
            dialogue: this.state.json.events.dialogue.filter(d => d.id !== id),
          },
        },
      },
      () => {
        this.reRenderASS()
      }
    )
  }

  addDialogueBefore = (id, index) => {
    this.setState({
      json: {
        ...this.state.json,
        events: {
          ...this.state.json.events,
          dialogue: [
            ...this.state.json.events.dialogue.slice(0, index),
            createEmptyDialogue(0, 0, ''),
            ...this.state.json.events.dialogue.slice(index),
          ],
        },
      },
    })
  }

  addDialogueAfter = (id, index) => {
    this.setState({
      json: {
        ...this.state.json,
        events: {
          ...this.state.json.events,
          dialogue: [
            ...this.state.json.events.dialogue.slice(0, index + 1),
            createEmptyDialogue(0, 0, ''),
            ...this.state.json.events.dialogue.slice(index + 1),
          ],
        },
      },
    })
  }

  render() {
    const { ass, json } = this.state
    const { events } = json

    return (
      <DialogueList
        events={events}
        onJsonChanged={this.onJsonChanged}
        reRenderASS={this.reRenderASS}
        saveASS={this.saveASS}
        downloadInfo={this.state.downloadInfo}
        activeIndex={this.state.activeIndex}
        setActiveIndex={this.setActiveIndex}
        preview={this.reRenderASS}
        removeDialogue={this.removeDialogue}
        addDialogueBefore={this.addDialogueBefore}
        addDialogueAfter={this.addDialogueAfter}
        loadAss={this.loadAss}
        loadVideo={this.props.loadVideo}
        assFileLink={this.state.assFileLink}
        videoFileLink={this.props.videoFileLink}
      />
    )
  }

  onJsonChanged = (index, dialogue) => {
    this.setState(
      {
        json: {
          ...this.state.json,
          events: {
            ...this.state.json.events,
            dialogue: [
              ...this.state.json.events.dialogue.slice(0, index),
              dialogue,
              ...this.state.json.events.dialogue.slice(index + 1),
            ],
          },
        },
      },
      () => {
        this.reRenderASS()
      }
    )
  }
}
