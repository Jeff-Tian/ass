import React from 'react'
import { Button, Dropdown, Input, Tab, Table } from 'semantic-ui-react'
import Dialogue from './dialogue'
import { FormattedMessage } from 'react-intl'

export default class DialogueList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assFileLink: props.assFileLink,
      videoFileLink: props.videoFileLink,
      videoList: [
        {
          key: 'youku',
          text: '优酷 WWDC 大会视频',
          value: 'http://58.216.104.114/65726AF4E473A831A19CDA3C79/03000815005B15E6EA028122D6731B261CB0CB-8194-49E0-958B-5BA7675613FB.mp4?ccode=0590&duration=395&expire=18000&psid=f98b0199f23606e29613d3f36b84e2d5&sp=&ups_client_netip=b4a71942&ups_ts=1532951783&ups_userid=&utid=5X63EwlzsEECAaQ0DDuJ1K%2BV&vid=XMzY0NjMxNzAzMg%3D%3D&vkey=B1271b0f8764d3a9fd4f51b83a65121cd',
        }, {
          key: 'videojs', text: '示例视频', value: 'https://vjs.zencdn.net/v/oceans.mp4',
        },
      ],
    }
  }

  componentWillMount() {
    this.setState({
      videoFileLink: this.state.videoList[0].value,
    }, () => {
      this.loadVideoToUI()
    })
  }

  handleChange = (events, { name, value }) => {
    this.setState({
      [name]: value,
    })
  }

  handleAddition = (event, { value }) => {
    this.setState({ videoList: [{ text: value, value }, ...this.state.videoList] })
  }

  onFileChange = (event, input) => {
    let file = event.target.files[0]

    if (file) {
      const isBrowser = typeof window !== 'undefined'
      if ('videoFileLink' === input.name && isBrowser) {
        const URL = window.URL || window.webkitURL
        this.setState({
          [input.name]: URL.createObjectURL(file),
        }, () => {
          this.loadVideoToUI()
        })
      } else {
        let reader = new FileReader()

        reader.addEventListener('load', () => {
          this.setState({
            [input.name]: reader.result,
          }, () => {
            if ('assFileLink' === input.name) {
              this.loadAssToUI()
            } else {
              this.loadVideoToUI()
            }
          })
        }, false)

        reader.readAsDataURL(file)
      }
    }
  }

  loadAssToUI = () => {
    if (this.state.assFileLink) {
      this.props.loadAss(this.state.assFileLink, true)
    }
  }

  loadVideoToUI = () => {
    if (this.state.videoFileLink) {
      this.props.loadVideo(this.state.videoFileLink, true)
    }
  }

  render() {
    let props = this.props

    let videoList = this.state.videoList
    return <Table celled selectable striped>
      <Table.Header>
        <Table.Row>
          <Table.Cell
            colSpan={props.events && props.events.format ? props.events.format.length + 2 : 1}>

            <Tab panes={[{
              menuItem: '加载本地 ASS 文件',
              render: () => <Tab.Pane>
                <Input type="file" placeholder="请选择本地 ass 文件" name="assFileLink"
                       onChange={this.onFileChange}
                       accept=".ass,text/plain"/>
              </Tab.Pane>,
            }, {
              menuItem: '加载线上 ASS 文件',
              render: () => <Tab.Pane>
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
                        onClick={this.loadAssToUI}>
                  <FormattedMessage id="loadASS"/>
                </Button>
              </Tab.Pane>,
            }, {
              menuItem: '加载本地视频',
              render: () => <Tab.Pane>
                <Input type="file" placeholder="请选择本地视频文件" name="videoFileLink"
                       onChange={this.onFileChange}
                       accept=".mp4,video/*"/>
              </Tab.Pane>,
            }, {
              menuItem: '加载线上视频',
              render: () => <Tab.Pane>
                <div style={{ display: 'inline-block' }}>
                  <Dropdown name="videoFileLink"
                            options={videoList}
                            placeholder='请输入一个视频文件 url，回车确认'
                            search
                            selection
                            fluid
                            allowAdditions
                            value={this.state.videoFileLink}
                            onAddItem={this.handleAddition}
                            onChange={this.handleChange}
                            style={{ width: '600px' }}
                  />
                </div>

                &emsp;
                <Button className='ui green button'
                        onClick={this.loadVideoToUI}>
                  <FormattedMessage id="loadVideo"/>
                </Button>
              </Tab.Pane>,
            }, {
              menuItem: '保存 ASS 文件',
              render: () => <Tab.Pane style={{ textAlign: 'right' }}>
                <a className='ui green button '
                   onClick={props.saveASS}
                   href={props.downloadInfo ? props.downloadInfo.downloadLink : 'javascript:void(0)'}
                   download={props.downloadInfo ? props.downloadInfo.filename : ''}><FormattedMessage id="saveAss"/></a>
              </Tab.Pane>,
            }]}/>
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
