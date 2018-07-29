import React from 'react'
import { withPrefix } from 'gatsby-link'
import { parse } from 'ass-compiler'
import DialogueList from './dialogue-list'
import ASS from 'assjs'
import AssSerialize from 'ass-serialize'

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

  render() {
    const { ass, json } = this.state
    const { events } = json

    return <DialogueList events={events} onJsonChanged={this.onJsonChanged}
                         reRenderASS={this.reRenderASS}/>
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
