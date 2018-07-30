import React from 'react'
import { Container } from 'semantic-ui-react'
import AssEditor from '../components/ass-editor'
import { withPrefix } from 'gatsby-link'

export default (props) =>
  <Container fluid>
    <Container textAlign='center'>
      <video id="video" controls src={withPrefix('test.mp4')}
             style={{ maxWidth: '100%' }}/>
    </Container>
    <AssEditor messages={props.messages}/>
  </Container>
