import React from 'react'
import MainForm from './MainForm'
import ViewForm from '../View/ViewForm'

const Layout = ({index}) => {
  return(
    <div>
      {
        (index===0)?(
          <div>
            <MainForm/>
          </div>
        ):(
        <div>
          <ViewForm/>
        </div>
        )
      }
    </div>
  )
}

export default Layout