

export const Upload = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
    </svg>
  )
}

export const Right = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

export const XCircle = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

interface SpinnerProps {
  fill: string
  size: number
}
export const Spinner = ({fill, size}:SpinnerProps) => {
  return (
    <svg fill={fill} width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style></style><rect className="spinner_zWVm" x="1" y="1" width="7.33" height="7.33"/><rect className="spinner_gfyD" x="8.33" y="1" width="7.33" height="7.33"/><rect className="spinner_T5JJ" x="1" y="8.33" width="7.33" height="7.33"/><rect className="spinner_E3Wz" x="15.66" y="1" width="7.33" height="7.33"/><rect className="spinner_g2vs" x="8.33" y="8.33" width="7.33" height="7.33"/><rect className="spinner_ctYB" x="1" y="15.66" width="7.33" height="7.33"/><rect className="spinner_BDNj" x="15.66" y="8.33" width="7.33" height="7.33"/><rect className="spinner_rCw3" x="8.33" y="15.66" width="7.33" height="7.33"/><rect className="spinner_Rszm" x="15.66" y="15.66" width="7.33" height="7.33"/></svg>
  )
}


