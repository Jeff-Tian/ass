import React from 'react'
import { withPrefix } from 'gatsby-link'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import AssEditor from '../components/ass-editor'
import VideoPlayer from '../components/video-player'
import Layout from '../components/layout'

import messages from '../data/messages/zh'
import 'intl/locale-data/jsonp/zh'

export default class IndexPage extends React.Component {
  state = { videoFileLink: withPrefix('/test.mp4') }

  loadVideo = link => {
    this.setState({ videoFileLink: link })
  }

  render() {
    return (
      <Layout location={this.props.location} i18nMessages={messages}>
        <Container fluid>
          <Container>
            <VideoPlayer videoFileLink={this.state.videoFileLink} />
          </Container>
          <AssEditor
            videoFileLink={this.state.videoFileLink}
            loadVideo={this.loadVideo}
          />
        </Container>
      </Layout>
    )
  }
}
