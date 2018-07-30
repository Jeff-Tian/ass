import React from 'react'
import { withPrefix } from 'gatsby-link'
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import AssEditor from '../components/ass-editor'

const IndexPage = () => (
  <Container fluid>
    <Container textAlign='center'>
      <video id="video" controls src={withPrefix('test.mp4')}
             style={{ maxWidth: '100%' }}/>
    </Container>
    <AssEditor/>
  </Container>
)

export default IndexPage
