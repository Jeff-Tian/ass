import React from 'react'
import { withPrefix } from 'gatsby-link'
import { parse } from 'ass-compiler'
import DialogueList from './dialogue-list'
import ASS from 'assjs'
import AssSerialize from 'ass-serialize'

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
    const assDisplay = new ASS(ass, document.getElementById('video'))
  }

  render() {
    const { ass, json } = this.state
    const { events } = json

    return <DialogueList events={events} onJsonChanged={this.onJsonChanged}/>
  }

  onJsonChanged = (events) => {
    this.setState({
      json: {
        ...json,
        events,
      },
    }, () => {
      this.setState({
        ass: AssSerialize.serialize(this.state.json),
      }, () => {
        AssEditor.displayASS(this.state.ass)
      })
    })
  }
}
