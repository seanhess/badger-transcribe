import { ReactNode, FC } from "react";

interface Parent {
  children: ReactNode
}

export const TargetBox:FC<Parent> = ({children}) => {
  return (
    <div className="bg-gray-light p-10 border-dashed border-4 border-gray gap-4 flex flex-col">
      {children}
    </div>
  )
}

export default TargetBox;
