import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode
}

export const Layout:FC<Props> =({children}) =>{
  return(
    <>
      <div className="min-h-screen md:flex">
        {children}
      </div>
    </>
  )
}

export const Main:FC<Props> =({children}) =>{
  return(
    <>
      <div className="flex-1">
        {children}
      </div>
    </>
  )
}

export const Sidebar:FC<Props> =({children}) =>{
  return(
    <>
      <div className="flex-none w-full md:max-w-xs">
        {children}
      </div>
    </>
  )
}
