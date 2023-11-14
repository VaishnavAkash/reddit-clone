import { getChannels, getPosts } from '@/utils/helper';
import PostsList from './PostsList';


const Main= async()=>{
    const [posts,channels] = await Promise.all([getPosts(),getChannels()]);

    return (
      <>
        <PostsList posts={posts} channels={channels} />
      </>
    );
  }

export default Main;