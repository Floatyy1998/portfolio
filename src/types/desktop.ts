import type { LuUser as User2 } from 'react-icons/lu'

export interface AppDef {
  id: string
  label: string
  icon: typeof User2
  w: number
  h: number
  minW?: number
  minH?: number
}

export interface WinState {
  isOpen: boolean
  minimized: boolean
  maximized: boolean
  z: number
  x: number
  y: number
  w: number
  h: number
  preMax?: { x: number; y: number; w: number; h: number }
  minTarget?: { x: number; y: number }
}
