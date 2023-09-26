import { PLANTYPE } from '@/pages/gens/PMselect'
import { create } from 'zustand'
import { KeywordsType } from './keywords'

export const SERVER_IP = 'https://strserver-poc.dev.thingsflow.com'
export const SELECT_COLOR = 'rgba(210,210,250,1)'

type UserContentState = {
  brainDump: string
  synopsis: string
  characters: string
  chosenTopic: string
  storyLine: string
  chosenKeywords: KeywordsType[]
  planList: PLANTYPE[]
  setBrainDump: (value: string) => void
  setSynopsis: (value: string) => void
  setCharacters: (value: string) => void
  setChosenTopic: (value: string) => void
  setStoryline: (value: string) => void
  setPlanList: (value: PLANTYPE[]) => void
  setChosenKeywords: (value: KeywordsType[]) => void
}
export const useContentStore = create<UserContentState>((set) => ({
  brainDump: '',
  synopsis: '',
  characters: '',
  chosenTopic: '',
  storyLine: '',
  planList: [],
  chosenKeywords: [],
  setBrainDump: (value: string) => {
    set(() => ({ brainDump: value }))
  },
  setSynopsis: (value: string) => {
    set(() => ({ synopsis: value }))
  },
  setCharacters: (value: string) => {
    set(() => ({ characters: value }))
  },
  setChosenTopic: (value: string) => {
    set(() => ({ chosenTopic: value }))
  },
  setStoryline: (value: string) => {
    set(() => ({ storyLine: value }))
  },
  setPlanList: (value: PLANTYPE[]) => {
    set(() => ({ planList: value }))
  },
  setChosenKeywords: (value: KeywordsType[]) => {
    set(() => ({ chosenKeywords: value }))
  },
}))
