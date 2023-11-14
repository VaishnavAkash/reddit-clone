import SidebarMenu from '@/components/SidebarMenu.jsx';
import CreatePost from '@/components/CreatePost.jsx';

function Page() {

  return (
    <div className='laptop:flex relative h-[100vh]'>
      <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>
      <div className='w-[83%] px-16 py-4 relative left-56 top-16'>
        <CreatePost/> 
      </div>
    </div>
  )
}

export default Page;