import React from 'react'

const Loader = () => {
  return (
    <div id='loader-container' className='relative h-[100vh] w-full flex justify-center items-center'>
        <div id='loader'></div>
    </div>
  )
}


export const LoginFormLoader = () =>{
  return <div class="formLoader">
  <li class="ball"></li>
  <li class="ball"></li>
  <li class="ball"></li>
</div>

}

export default Loader