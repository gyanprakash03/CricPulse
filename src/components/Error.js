import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const Error = () => {

  const {error} = useContext(AppContext);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setShowError(true);

  }, [error])
  

  return (
    <div>
      {
        showError ? (
          <div className='flex flex-col justify-center items-center py-56'>
            <img src="/error-icon-25245.png" className='w-[10%]' />
            <div className='text-[2rem]'>{
              error ? error : "Nothing to see here 🫣"
            }</div> 
          </div>
        ) : null
      }
    </div>
  )
}

export default Error;