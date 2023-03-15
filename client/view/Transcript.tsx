import { ReactNode, FC, useEffect } from "react";
import { Content, Sidebar } from "../comp/Layout"
import { FileRow } from "../comp/FileRow"
import { FileInfo } from "../file";
import * as Style from "../comp/Style"
import { totalCost, unitPrice } from "../checkout";



interface Props {
  transcript: string
  file: FileInfo
  cancel():void
}

export const Transcript:FC<Props> = ({transcript, file, cancel}) => {

  let totalUsd = totalCost(file)
  let hint = transcript.substring(0, 1000)

  return (
    <>
      <Content>
        <h1 className="font-bold text-2xl">Transcript</h1>
        <FileRow file={file} onRemove={cancel} />

        <div className="relative h-48">
          <div className="bg-gray-light p-10 border-dashed border-4 border-gray gap-4 flex flex-col absolute h-48 w-full overflow-hidden">
            <p>{hint}</p>
          </div>
          <div className="absolute h-48 w-full bg-gradient-to-t from-white text-right p-1 pr-2 text-sm uppercase">
            Preview
          </div>
        </div>


        <div className="flex flex-row gap-4">
          <div className="grow">Price</div>
          <div className="">{unitPrice()}</div>
        </div>

        <div className="flex flex-row gap-4 text-lg font-bold border-t pt-4">
          <div className="grow uppercase">Total</div>
          <Currency amount={totalUsd}/>
        </div>

      </Content>

      <Sidebar>
        <div className="flex flex-row font-bold text-xl">
          <h1 className="grow">Total</h1>
          <Currency amount={totalUsd}/>
        </div>
        <form action="/checkout" method="POST" className="m-0 flex flex-col">
          <input type="hidden" value={file.name} name="name"/>
          <input type="hidden" value={file.size} name="size"/>
          <button type="submit" className={Style.button + "uppercase"}>Checkout</button>
        </form>
      </Sidebar>
    </>
  )
}


const Currency:FC<{amount:number, className?:string}> = ({amount, className = ""}) => {
  return <>
    <div className={className}>${amount}.00</div>
  </>
}


export default Transcript;

