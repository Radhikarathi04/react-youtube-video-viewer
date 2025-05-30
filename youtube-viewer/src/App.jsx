import React, { useState , useEffect} from 'react';
import { Video } from './Video';
import { Search } from './Search';

const App = () => {
  const baseUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3D'
  const [videos, setVideos] = useState([]);
  const [currentChannelId, setCurrentChannelId] = useState();
  const [channelName, setChannelName] = useState('');
  const [searchError, setSearchError] = useState('');

  // This code will rerun every time the currentChannelId changes
  useEffect(() => {
    (async () => {
      if (currentChannelId) {
          try {
            const data = await fetch(`${baseUrl}${currentChannelId}`)
              .then(response => response.json());
            if(!data.items) {
              throw new Error();
            }
            // how do we know that the data returned will have items?
            setVideos(data.items);
            setChannelName(data.items[0].author);
            setSearchError('');
            console.log(data.items);  
          } catch (error) {
            console.log(error);
            setSearchError('Could not retrieve videos. Please check the channel ID and try again.');
            
          }
        }
      })();
  }, [currentChannelId]);
  
  return (
    <div className='app-container'>
      <h1>Latest YouTube Videos</h1>
      <Search setCurrentChannelId={id => setCurrentChannelId(id)}/>
      <div className="search__errors">
        {searchError}
      </div>
      {channelName &&  <h2>Videos from {channelName}</h2>}
      <div className="videos">
        {videos.map(video => <Video key={video.guid} video={video} />)}
      </div>
    </div>
  )
}

export default App;
