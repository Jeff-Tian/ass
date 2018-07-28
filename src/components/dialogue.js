import React from 'react'
import { Table } from 'semantic-ui-react'

export default (props) =>
  <Table.Row>
    {
      props.dialogue && props.header &&
      props.header.map(h => <Table.Cell
        key={h}>{
        h === 'Text' ?
          String(props.dialogue.Text.raw)
          : String(props.dialogue[h] || '')
      }</Table.Cell>)
    }
  </Table.Row>
