import { Button, Icon, Table } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import React from 'react'

export default function Ops(props) {
  return (
    <div>
      <Button
        className="ui button"
        color="green"
        icon
        labelPosition="left"
        onClick={props.addDialogueBefore}
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
        onClick={props.removeDialogue}
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
        onClick={props.addDialogueAfter}
      >
        <Icon name="add" />
        <FormattedMessage id="append record" />
      </Button>
      <br />
    </div>
  )
}
