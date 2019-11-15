import React from 'react'
import { Button, Icon, Input, Table, TextArea } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

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
                autoheight="true"
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
        <Button
          className="ui button"
          color="green"
          icon
          labelPosition="left"
          onClick={this.props.addDialogueBefore}
        >
          <Icon name="add" />
          <FormattedMessage id="insert record" />
        </Button>
        <br />
        <Button
          className="ui button"
          color="red"
          icon
          labelPosition="left"
          onClick={this.props.removeDialogue}
        >
          <Icon name="remove" />
          <FormattedMessage id="remove" />
        </Button>
        <br />
        <Button
          className="ui button"
          color="green"
          icon
          labelPosition="left"
          onClick={this.props.addDialogueAfter}
        >
          <Icon name="add" />
          <FormattedMessage id="append record" />
        </Button>
        <br />
      </Table.Cell>
    </Table.Row>
  )
}
