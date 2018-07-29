import React from 'react'
import { Button, Table } from 'semantic-ui-react'
import Dialogue from './dialogue'

export default (props) =>
  <Table celled selectable striped>
    <Table.Header>
      <Table.Row>
        <Table.Cell
          colSpan={props.events && props.events.format ? props.events.format.length : 1}>
          <a className='ui green button'
             onClick={props.saveASS}
             href={props.downloadInfo ? props.downloadInfo.downloadLink : 'javascript:void(0)'}
             download={props.downloadInfo ? props.downloadInfo.filename : ''}>保存字幕文件</a>
        </Table.Cell>
      </Table.Row>
    </Table.Header>
    <Table.Header>
      <Table.Row>
        {
          props.events && props.events.format &&
          props.events.format.map(f => <Table.HeaderCell
            key={f}>{f}</Table.HeaderCell>)
        }
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {
        props.events && props.events.dialogue &&
        props.events.dialogue.map((d, i) => <Dialogue key={i} dialogue={d}
                                                      header={props.events.format}
                                                      onJsonChanged={(d) => props.onJsonChanged(i, d)}
                                                      active={props.activeIndex === i}
                                                      onClick={() => props.setActiveIndex(i)}/>)
      }
    </Table.Body>
  </Table>
