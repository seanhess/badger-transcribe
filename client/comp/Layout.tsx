import { ReactNode, FC } from "react";

interface Parent {
  children: ReactNode
  className?: string
}

export const Layout:FC<Parent> =({children}) =>{
  return(
    <>
      <div className="min-h-screen flex flex-col bg-primary">
        <div className="h-20 p-1 pt-2 px-8 bg-white"><Logo/></div>
        <div className="flex flex-row justify-center">
          <div className="max-w-4xl grow sm:flex flex-row">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}


export const Content:FC<Parent> =({children}) =>{
  return(
    <>
      <div className="grow flex flex-col p-4 gap-4">
        <Panel>
          {children}
        </Panel>
      </div>
    </>
  )
}

export const Sidebar:FC<Parent> =({children}) =>{
  return(
    <>
      <div className="grow sm:max-w-md">
        {children}
      </div>
    </>
  )
}


export const Logo = () => {
  return (
    <a id="logo" className="" href="https://satellitedisplay.com" target="_blank">
      <img className="h-full" alt="Badger by Satellite Display" src="https://satellitedisplay.com/wp-content/uploads/2020/05/Logo-with-Badger-1.png"></img>
    </a>
  )
}

export const Panel:FC<Parent> = ({children, className = ""}) => {
  return (
    <div className="bg-white rounded-lg drop-shadow-xl p-6 gap-4 flex flex-col">
      {children}
    </div>
  )
}
