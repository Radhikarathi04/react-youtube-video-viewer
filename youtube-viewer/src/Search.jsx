import React, { useState } from "react";

export const Search = ({ setCurrentChannelId }) => {
    const [channelId, setChannelId] = useState('');

    return (
        <div className="search">
        <input type="text" onChange={event => setChannelId(event.target.value)}placeholder='Enter your favourite channel ID'/>
        <button onClick={() => setCurrentChannelId(channelId)}>Get Videos</button>
      </div>
    )
};