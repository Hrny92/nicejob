'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type ContactModalContextType = {
  isOpen: boolean
  jobTitle: string
  open: (jobTitle?: string) => void
  close: () => void
}

const ContactModalContext = createContext<ContactModalContextType>({
  isOpen: false,
  jobTitle: '',
  open: () => {},
  close: () => {},
})

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [jobTitle, setJobTitle] = useState('')
  return (
    <ContactModalContext.Provider value={{
      isOpen,
      jobTitle,
      open: (title = '') => { setJobTitle(title); setIsOpen(true) },
      close: () => setIsOpen(false),
    }}>
      {children}
    </ContactModalContext.Provider>
  )
}

export const useContactModal = () => useContext(ContactModalContext)
