import React from 'react'
import { Table, TextArea } from 'semantic-ui-react'

export default class Dialogue extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogue: props.dialogue,
    }
  }

  handleChange = ({ name, value }) => {
    this.setState()
  }

  handleDialogueChange = (event, textarea) => {
    let { dialogue } = this.state

    this.setState({
      dialogue: {
        ...dialogue,
        Text: { ...dialogue.Text, raw: textarea.value },
      },
    }, () => {
      this.props.onJsonChanged(this.state.dialogue)
    })
  }

  render = () =>
    <Table.Row>
      {
        this.state.dialogue && this.props.header &&
        this.props.header.map(h => <Table.Cell
          key={h}>{
          h === 'Text' ?
            <TextArea value={String(this.state.dialogue.Text.raw)}
                      onChange={this.handleDialogueChange}/>
            : String(this.state.dialogue[h] === null ? '' : this.state.dialogue[h])
        }</Table.Cell>)
      }
    </Table.Row>
}
