import {Toaster} from "react-hot-toast"

import React from 'react'

const Toast = ({Children}) => {
  return (
    <>
        {Children}
        <Toaster/>
    </>
  )
}

export default Toast