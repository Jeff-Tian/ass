import React, { useState } from 'react'

const isBrowser = typeof window !== 'undefined'

if (isBrowser) {
  const Player = require('aliplayer-react')
  const AliVideoPlayer = ({ videoFileLink }) => {
    const [instance, setInstance] = useState(null)

    const config = {
      source: videoFileLink,
      width: '100%',
      height: '500px',
      autoPlay: true,
      isLive: false,
      rePlay: false,
      playsinline: true,
      preload: true,
      controlBarVisibility: 'hover',
      useH5Prism: true,
      components: [
        {
          name: 'RateComponent',
          type: Player.components.RateComponent,
        },
      ],
    }

    return <Player config={config} onGetInstanc={setInstance} />
  }
}

const VideoPlayer = props => (
  <video
    id="video"
    controls
    src={props.videoFileLink}
    style={{ maxWidth: '100%', minHeight: '500px' }}
  />
)

export default VideoPlayer
