import { createContext, useContext, useState, type ReactNode } from 'react'

interface Ctx {
  show: boolean
  setShow: (v: boolean) => void
}

const AnnotationContext = createContext<Ctx>({ show: false, setShow: () => {} })

export function AnnotationProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false)
  return <AnnotationContext.Provider value={{ show, setShow }}>{children}</AnnotationContext.Provider>
}

export const useAnnotations = () => useContext(AnnotationContext)
