import {useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos, ChannelCard } from './'
import { fetchFromAPI } from '../utils/fetchFormAPI'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((data)=> setChannelDetail(data?.items[0]));

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((data)=> setVideos(data?.items));

  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(18,14,87,1) 0%, rgba(48,29,177,1) 37%, rgba(224,0,255,1) 100%)',
          zIndex : 10,
          height : '250px'
        }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px"/> 
      </Box>
      <Box display="flex" p="2">
        <Box sx={{mr:{sm:'125px'}}}/>
          
        <Videos videos={videos}/>
      </Box>
    </Box>

  )
}

export default ChannelDetail