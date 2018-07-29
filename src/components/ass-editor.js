import React from 'react'
import { withPrefix } from 'gatsby-link'
import DialogueList from './dialogue-list'
import ASS from 'assjs'
import AssSerialize from 'ass-serialize'

let uuidv4 = require('uuid/v4')
let parse = require('ass-compiler').parse

/* eslint-disable */
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
/* eslint-enable */

parse = parse.after((json) => {
  json.events.dialogue = json.events.dialogue.map(d => {
    d.id = uuidv4()
    return d
  })

  return json
})

function createEmptyDialogue(start, end) {
  return {
    id: uuidv4(),
    'Layer': 0,
    'Start': start,
    'End': end,
    'Style': 'Default',
    'Name': '',
    'MarginL': 0,
    'MarginR': 0,
    'MarginV': 0,
    'Effect': null,
    'Text': {
      'raw': '新内容',
    },
  }
}

let assDisplay = null
export default class AssEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ass: '', json: {} }
  }

  async componentWillMount() {
    let ass = await (await fetch(withPrefix('test.ass'))).text()

    this.setState({
      ass: ass,
      json: parse(ass),
      activeIndex: 0,
    })

    AssEditor.displayASS(ass)
  }

  static displayASS(ass) {
    if (assDisplay) {
      assDisplay.destroy()
    }
    assDisplay = new ASS(ass, document.getElementById('video'))
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

  setActiveIndex = (index) => {
    this.setState({ activeIndex: index })
  }

  removeDialogue = (id) => {
    this.setState({
      json: {
        ...this.state.json,
        events: {
          ...this.state.json.events,
          dialogue: this.state.json.events.dialogue.filter(d => d.id !== id),
        },
      },
    }, () => {
      this.reRenderASS()
    })
  }

  addDialogueBefore = (id, index) => {
    this.setState({
      json: {
        ...this.state.json,
        events: {
          ...this.state.json.events,
          dialogue: [
            ...this.state.json.events.dialogue.slice(0, index),
            createEmptyDialogue(0, 0),
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
            createEmptyDialogue(0, 0),
            ...this.state.json.events.dialogue.slice(index + 1),
          ],
        },
      },
    })
  }

  render() {
    const { ass, json } = this.state
    const { events } = json

    return <DialogueList events={events} onJsonChanged={this.onJsonChanged}
                         reRenderASS={this.reRenderASS} saveASS={this.saveASS}
                         downloadInfo={this.state.downloadInfo}
                         activeIndex={this.state.activeIndex}
                         setActiveIndex={this.setActiveIndex} preview={this.reRenderASS}
                         removeDialogue={this.removeDialogue}
                         addDialogueBefore={this.addDialogueBefore}
                         addDialogueAfter={this.addDialogueAfter}
    />
  }

  onJsonChanged = (index, dialogue) => {
    this.setState({
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
    }, () => {
      this.reRenderASS()
    })
  }
}
