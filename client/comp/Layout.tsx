import { ReactNode, FC } from "react";

interface Props {
  children: ReactNode
}

export const Layout:FC<Props> =({children}) =>{
  return(
    <>
      <div className="min-h-screen flex flex-col">
        <div className="h-24 p-3 px-8"><Logo/></div>
        <div className="flex flex-row justify-center">
          <div className="max-w-4xl grow sm:flex flex-row">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}


export const Content:FC<Props> =({children}) =>{
  return(
    <>
      <div className="grow flex flex-col p-4 gap-4">
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


export const Logo = () => {
  return (
    <a id="logo" className="" href="https://satellitedisplay.com" target="_blank">
      <img className="h-full" alt="Badger by Satellite Display" src="https://satellitedisplay.com/wp-content/uploads/2020/05/Logo-with-Badger-1.png"></img>
    </a>
  )
}
