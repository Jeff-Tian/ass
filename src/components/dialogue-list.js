import React from 'react'
import {Button, Dropdown, Input, Tab, Table} from 'semantic-ui-react'
import Dialogue from './dialogue'
import {FormattedMessage} from 'react-intl'
import zhihu from "../zhihu/zhihu";

function handleZhiHuVideo(zVideoUrl) {
    if (!zhihu.isZVideoUrl(zVideoUrl)) {
        return Promise.resolve(zVideoUrl);
    }

    return zhihu.getPlayUrl(zVideoUrl);
}

export default class DialogueList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            assFileLink: props.assFileLink,
            videoFileLink: props.videoFileLink,
            videoList: [{
                key: 'videojs', text: '示例视频', value: 'https://vjs.zencdn.net/v/oceans.mp4',
            }],
        }
    }

    componentWillMount() {
    }

    handleChange = (events, {name, value}) => {
        this.setState({
            [name]: value,
        })
    }

    handleAddition = (event, {value}) => {
        console.log('value = ', value);

        handleZhiHuVideo(value).then(result => {
            this.setState({videoList: [{text: result, value: result}, ...this.state.videoList]})
        });
    }

    onFileChange = (event, input) => {
        let file = event.target.files[0]

        const isBrowser = typeof window !== 'undefined'
        if (file && isBrowser) {
            const URL = window.URL || window.webkitURL
            this.setState({
                [input.name]: URL.createObjectURL(file),
            }, () => {
                if ('assFileLink' === input.name) {
                    this.loadAssToUI()
                } else {
                    this.loadVideoToUI()
                }
            })
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
                                <div style={{display: 'inline-block'}}>
                                    <Input name="assFileLink" list='ass-files' placeholder="请输入一个 ass 文件 url"
                                           onChange={this.handleChange}
                                           style={{width: '600px'}} value={this.state.assFileLink}/>
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
                                <div style={{display: 'inline-block'}}>
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
                                              style={{width: '600px'}}
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
                            render: () => <Tab.Pane style={{textAlign: 'right'}}>
                                <a className='ui green button '
                                   onClick={props.saveASS}
                                   href={props.downloadInfo ? props.downloadInfo.downloadLink : 'javascript:void(0)'}
                                   download={props.downloadInfo ? props.downloadInfo.filename : ''}><FormattedMessage
                                    id="saveAss"/></a>
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
