'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ContactModalContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
}

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ContactModalContext.Provider value={{
      isOpen,
      open:  () => setIsOpen(true),
      close: () => setIsOpen(false),
    }}>
      {children}
    </ContactModalContext.Provider>
  )
}

export const useContactModal = () => useContext(ContactModalContext)
