'use client'

import React, { useEffect, useState } from 'react'
import style from './engine.module.css'
import Brain from './Brain'
import TopicsRec from './TopicsRec'
import Synopsis from './Synopsis'
import Character from '@/pages/gens/Character'
import FirstChapter from './FirstChapter'
import PMselect from './PMselect'
import OrganizedList from './OrganizedList'
import TitleContainer from '@/components/TitleContainer'
import { questions_corpus } from '@/utils/questions'
import ReWriteInput from '@/components/ReWriteInput'
import { usePlantStore } from '@/utils/planStore'
import Head from 'next/head'

const Gem = () => {
  const {questions, setQuestions} = usePlantStore()
  const [prompt, setPrompt] = useState<string>('')

  useEffect(() => {
    const randQ = getRandomElements(questions_corpus, 3)
    setQuestions(randQ)
  }, [])

  const getRandomElements =  (array: string[], count: number): string[] => {
    let dup = [...array]
    const result: string[] = [];
 
    // Ensure the count is within the range of the array length
    count = Math.min(count, array.length);
  
    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomElement = array[randomIndex];
  
      // Avoid duplicates
      if (!result.includes(randomElement)) {
        result.push(randomElement);
      }
    }
  
    return result;
  }

  return (
    <main className={style.main}>
      {/* <Head>
        <title>기획 어시스턴트</title>
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="upgrade-insecure-requests" 
        />
      </Head> */}
      <div className={style.innerMain} style={{ position: 'relative' }}>
        <h2>스토리 기획 도우미</h2>
        {/* 좋은 질문을 던져주기 */}
        <div
          className={style.questionContainer}
          style={{ padding: '0px 16px' }}
        >
          <TitleContainer
            title='사고를 위한 질문'
            // buttonText='다른 질문 보기'
            // onClick={() => {}}
          />
        </div>
        <div
          className={style.questionWrapper}
          style={{
            width:'100%',
            padding:'0px 35px',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            background: 'rgba(245,245,245,1)',
            alignItems:'center',
            justifyContent:'center',
          }}
        >
          {questions.slice(0, 3).map((item) => {
            return <div className={style.question} key={item}>{item}</div>
          })}
          <button className={style.reset_button} onClick={() => {
            const randQ = getRandomElements(questions_corpus, 3)
            setQuestions(randQ)
          }}>🔄</button>
        </div>
        <br />
        {/* 
        <div
          className={style.questionContainer}
          style={{ padding: '0px 16px' }}
        >
          <ReWriteInput
            row={2}
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            onClick={generate}
            placeholder='어떤 종류의 질문이 필요하신가요? 예시) 판타지 세계관을 작성하려고 해, 좀 더 로맨스에 관련된 질문해줘'
          />
        </div> */}
        <Brain getRandomElements={getRandomElements} />
        {/* 주제 추천 */}
        {/* <TopicsRec /> */}
        {/* 기획서 구성 선택 및 생성 : 위에서 작성한 내용으로, 이것들을 만들어주세요 */}
        <PMselect />
        {/* 선택한 목록을 기반으로 생성된 기획서 */}
        <OrganizedList />
        {/* 시놉시스 */}
        <Synopsis />
        {/* 캐릭터 */}
        <Character />
        {/* 전체 스토리 라인 */}
        {/* <StoryLine /> */}
        {/* 1화의 4섹션 */}
        <FirstChapter />
      </div>
    </main>
  )
}

export default Gem
