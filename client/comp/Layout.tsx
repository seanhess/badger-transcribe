import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode
}

export const Layout:FC<Props> =({children}) =>{
  return(
    <>
      <div className="min-h-screen flex flex-row justify-center">
        <div className="max-w-4xl grow sm:flex flex-row">
          {children}
        </div>
      </div>
    </>
  )
}


export const Content:FC<Props> =({children}) =>{
  return(
    <>
      <div className="grow flex flex-col p-4 g-4">
        {children}
      </div>
    </>
  )
}

export const Sidebar:FC<Props> =({children}) =>{
  return(
    <>
      <div className="grow sm:max-w-md">
        {children}
      </div>
    </>
  )
}
