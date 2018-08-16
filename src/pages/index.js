import React from 'react'
import { withPrefix } from 'gatsby-link'
import { Container, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import AssEditor from '../components/ass-editor'

export default class IndexPage extends React.Component {
  state = { videoFileLink: withPrefix('/test.mp4') }

  loadVideo = (link) => {
    this.setState({ videoFileLink: link })
  }

  render() {
    return <Container fluid>
      <Container textAlign='center'>
        <video id="video" controls src={this.state.videoFileLink}
               style={{ maxWidth: '100%', minHeight: '500px' }}/>
      </Container>
      <AssEditor videoFileLink={this.state.videoFileLink} loadVideo={this.loadVideo}/>
    </Container>
  }
}
