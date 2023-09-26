import { PLANTYPE } from '@/pages/gens/PMselect'
import { create } from 'zustand'
import { KeywordsType } from './keywords'

type PlantState = {
  questions: string[]
  background: string
  intention: string
  growth: string
  ending: string
  interest: string
  event: string
  setQuestions: (value: string[]) => void
  setBackground: (value: string) => void
  setIntention: (value: string) => void
  setGrowth: (value: string) => void
  setEnding: (value: string) => void
  setInterest: (value: string) => void
  setEvent: (value: string) => void
}
export const usePlantStore = create<PlantState>((set) => ({
  questions: [],
  background: '',
  intention: '',
  growth: '',
  ending: '',
  interest: '',
  event: '',
  setQuestions: (value: string[]) => {
    set(() => ({ questions: value }))
  },
  setBackground: (value: string) => {
    set(() => ({ background: value }))
  },
  setIntention: (value: string) => {
    set(() => ({ intention: value }))
  },
  setGrowth: (value: string) => {
    set(() => ({ growth: value }))
  },
  setEnding: (value: string) => {
    set(() => ({ ending: value }))
  },
  setInterest: (value: string) => {
    set(() => ({ interest: value }))
  },
  setEvent: (value: string) => {
    set(() => ({ event: value }))
  },
}))
