'use client'

import { useContactModal } from '@/context/ContactModalContext'

export default function PoslatZivotopisButton({ poziceNazev }: { poziceNazev: string }) {
  const { open } = useContactModal()
  return (
    <button
      onClick={() => open(poziceNazev)}
      className="block w-full text-center bg-brand-dark text-white
                 px-5 py-3.5 rounded-full text-sm font-semibold mb-3
                 hover:bg-brand-mid transition-all duration-300 cursor-pointer"
    >
      Poslat životopis →
    </button>
  )
}
