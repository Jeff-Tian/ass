import React from 'react'
import { Button, Icon, Input, Table, TextArea } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import Ops from './ops'

export default class Dialogue extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogue: props.dialogue,
    }
  }

  handleChange = (event, { name, value }) => {
    this.setState({
      dialogue: {
        ...this.state.dialogue,
        [name]: value,
      },
    })
  }

  handleBlur = event => {
    this.props.onJsonChanged(this.state.dialogue)
  }

  handleDialogueChange = (event, textarea) => {
    let { dialogue } = this.state

    this.setState({
      dialogue: {
        ...dialogue,
        Text: { ...dialogue.Text, raw: textarea.value },
      },
    })
  }

  handleDialogueBlur = evt => {
    this.props.onJsonChanged(this.state.dialogue)
  }

  render = () => (
    <Table.Row onClick={this.props.onClick} active={this.props.active}>
      <Table.Cell>{this.props.index}</Table.Cell>
      {this.state.dialogue &&
        this.props.header &&
        this.props.header.map(h => (
          <Table.Cell key={h}>
            {h === 'Text' && (
              <TextArea
                autoHeight
                value={String(this.state.dialogue.Text.raw)}
                style={{ width: '100%', border: 'none' }}
                onBlur={this.handleDialogueBlur}
                onChange={this.handleDialogueChange}
              />
            )}
            {(h === 'Layer' ||
              h === 'Start' ||
              h === 'End' ||
              h === 'MarginL' ||
              h === 'MarginR' ||
              h === 'MarginV') && (
              <Input
                type="number"
                transparent
                fluid
                value={String(
                  this.state.dialogue[h] === null ? '' : this.state.dialogue[h]
                )}
                style={{ width: '50px' }}
                name={h}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
              />
            )}
            {(h === 'Style' || h === 'Name' || h === 'Effect') && (
              <Input
                type="text"
                transparent
                fluid
                value={String(
                  this.state.dialogue[h] === null ? '' : this.state.dialogue[h]
                )}
                style={{ width: '50px' }}
                name={h}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
              />
            )}
            {
              // String(this.state.dialogue[h] === null ? '' : this.state.dialogue[h])
            }
          </Table.Cell>
        ))}
      <Table.Cell>
        <Ops
          addDialogueBefore={this.props.addDialogueBefore}
          removeDialogue={this.props.removeDialogue}
          addDialogueAfter={this.props.addDialogueAfter}
        />
      </Table.Cell>
    </Table.Row>
  )
}
