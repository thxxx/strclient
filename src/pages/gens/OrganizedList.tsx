import React, { useState } from 'react'
import style from './engine.module.css'
import SectionTemplate from '@/components/SectionTemplate'
import { usePlantStore } from '@/utils/planStore'
import { useContentStore } from '@/utils/store'

const OrganizedList = () => {
  const { planList } = useContentStore()
  const {
    background,
    intention,
    growth,
    ending,
    event,
    interest,
    setBackground,
    setIntention,
    setInterest,
    setEnding,
    setEvent,
    setGrowth,
  } = usePlantStore()

  const [bPrompt, setBPrompt] = useState<string>('')
  const [iPrompt, setIPrompt] = useState<string>('')
  const [gPrompt, setGPrompt] = useState<string>('')
  const [enPrompt, setEnPrompt] = useState<string>('')
  const [evPrompt, setEvPrompt] = useState<string>('')
  const [interestPrompt, setInterestPrompt] = useState<string>('')

  return (
    <div className={style.questionContainer}>
      {planList.length > 0 && (
        <>
          <div className={style.listInner}>
            {planList.map((item) => item.value).includes('background') && (
              <SectionTemplate
                text='배경 세계관 설정'
                prompt={bPrompt}
                setPrompt={setBPrompt}
                onClick={() => {}}
                seeNudge={() => {}}
                content={background}
                setContent={setBackground}
              />
            )}
            {planList.map((item) => item.value).includes('intention') && (
              <SectionTemplate
                text='핵심 주제의식/기획의도'
                prompt={iPrompt}
                setPrompt={setIPrompt}
                onClick={() => {}}
                seeNudge={() => {}}
                content={intention}
                setContent={setIntention}
              />
            )}
            {planList.map((item) => item.value).includes('growth') && (
              <SectionTemplate
                text='주인공/캐릭터의 변화'
                prompt={gPrompt}
                setPrompt={setGPrompt}
                onClick={() => {}}
                seeNudge={() => {}}
                content={growth}
                setContent={setGrowth}
              />
            )}
            {planList.map((item) => item.value).includes('ending') && (
              <SectionTemplate
                text='결말'
                prompt={enPrompt}
                setPrompt={setEnPrompt}
                onClick={() => {}}
                seeNudge={() => {}}
                content={ending}
                setContent={setEnding}
              />
            )}
            {planList.map((item) => item.value).includes('interest') && (
              <SectionTemplate
                text='독자들의 흥미 유발 요소'
                prompt={interestPrompt}
                setPrompt={setInterestPrompt}
                onClick={() => {}}
                seeNudge={() => {}}
                content={interest}
                setContent={setInterest}
              />
            )}
            {planList.map((item) => item.value).includes('event') && (
              <SectionTemplate
                text='핵심 사건'
                prompt={evPrompt}
                setPrompt={setEvPrompt}
                onClick={() => {}}
                seeNudge={() => {}}
                content={event}
                setContent={setEvent}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default OrganizedList
