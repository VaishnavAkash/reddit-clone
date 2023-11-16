import SidebarMenu from '@/components/SidebarMenu.jsx';
import ChannelPage from '@/components/ChannelPage.jsx';

function Page() {

  return (
    <div className='laptop:flex relative h-[100vh]'>
      <div className='w-[17%] fixed top-12'>
        <SidebarMenu/>
      </div>
      <div className='w-[83%] px-8 py-4 relative left-[16.4rem] top-16'>
        <ChannelPage/>
      </div>
    </div>
  )
}

export default Page;