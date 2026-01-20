import React, { use } from 'react'

const New = ({params}) => {
  const{id}=use(params)
  return (
    <div>{id}</div>
  )
}

export default New  