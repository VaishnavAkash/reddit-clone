import React from 'react'

const Loader = () => {
  return (
    <div id='loader-container' className=' relative w-full h-[80vh] left-0 top-2'>
        <div id='loader'></div>
    </div>
  )
}


export const LoginFormLoader = () =>{
  return <div class="loader">
  <li class="ball"></li>
  <li class="ball"></li>
  <li class="ball"></li>
</div>

}

export default Loader