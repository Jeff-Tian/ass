import React from 'react'
import { Button, Input, Table } from 'semantic-ui-react'
import Dialogue from './dialogue'
import { FormattedMessage } from 'react-intl'

export default class DialogueList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assFileLink: '',
    }
  }

  handleChange = (events, { name, value }) => {
    this.setState({
      [name]: value,
    })
  }

  onFileChange = (event, input) => {
    let file = event.target.files[0]
    if (file) {
      let reader = new FileReader()
      reader.addEventListener('load', () => {
        console.log(reader.result)

        this.setState({
          assFileLink: reader.result,
        })
      }, false)
      reader.readAsDataURL(file)
    }
  }

  render() {
    let props = this.props

    return <Table celled selectable striped>
      <Table.Header>
        <Table.Row>
          <Table.Cell
            colSpan={props.events && props.events.format ? props.events.format.length + 2 : 1}>

            <div>
              <div style={{ display: 'inline-block' }}>
                <Input name="assFileLink" list='ass-files' placeholder="请输入一个 ass 文件 url" onChange={this.handleChange}
                       style={{ width: '600px' }} value={this.state.assFileLink}/>
                <datalist id='ass-files'>
                  <option
                    value='https://raw.githubusercontent.com/Aegisub/Aegisub/master/docs/specs/ass-format-tests.ass'/>
                </datalist>
              </div>
              &emsp;
              <Button className='ui green button'
                      onClick={() => this.state.assFileLink && props.loadAss(this.state.assFileLink, true)}>
                <FormattedMessage id="loadASS"/>
              </Button>
              <a className='ui green button right floated'
                 onClick={props.saveASS}
                 href={props.downloadInfo ? props.downloadInfo.downloadLink : 'javascript:void(0)'}
                 download={props.downloadInfo ? props.downloadInfo.filename : ''}><FormattedMessage id="saveAss"/></a>
            </div>
            <div>&nbsp;</div>
            <div>
              <Input type="file" placeholder="请选择本地 ass 文件" name="assFileLink" onChange={this.onFileChange}
                     accept=".ass,text/plain"/>
              &emsp;
              <Button className="ui green button"
                      onClick={() => this.state.assFileLink && props.loadAss(this.state.assFileLink, true)}>
                <FormattedMessage id="loadLocalASS"/>
              </Button>
            </div>
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
  }
}
