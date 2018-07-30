import React from 'react'
import { Table } from 'semantic-ui-react'
import Dialogue from './dialogue'
import { FormattedMessage } from 'react-intl'

export default (props) =>
  <Table celled selectable striped>
    <Table.Header>
      <Table.Row>
        <Table.Cell
          colSpan={props.events && props.events.format ? props.events.format.length + 2 : 1}>
          <a className='ui green button right floated'
             onClick={props.saveASS}
             href={props.downloadInfo ? props.downloadInfo.downloadLink : 'javascript:void(0)'}
             download={props.downloadInfo ? props.downloadInfo.filename : ''}><FormattedMessage id="saveAss"/></a>
        </Table.Cell>
      </Table.Row>
    </Table.Header>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>#</Table.HeaderCell>
        {
          props.events && props.events.format &&
          props.events.format.map(f => <Table.HeaderCell
            key={f}>{f}</Table.HeaderCell>)
        }
        <Table.HeaderCell/>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        props.events && props.events.dialogue &&
        props.events.dialogue.map((d, i) => <Dialogue index={i} key={d.id} dialogue={d}
                                                      header={props.events.format}
                                                      onJsonChanged={(d) => props.onJsonChanged(i, d)}
                                                      active={props.activeIndex === i}
                                                      onClick={() => props.setActiveIndex(i)}
                                                      removeDialogue={() => props.removeDialogue(d.id)}
                                                      addDialogueBefore={() => props.addDialogueBefore(d.id, i)}
                                                      addDialogueAfter={() => props.addDialogueAfter(d.id, i)}
        />)
      }
    </Table.Body>
  </Table>
