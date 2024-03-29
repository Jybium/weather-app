import {Toaster} from "react-hot-toast"

import React from 'react'

const Toast = ({Children}) => {
  return (
    <div>
        {Children}
        <Toaster/>
    </div>
  )
}

export default Toast