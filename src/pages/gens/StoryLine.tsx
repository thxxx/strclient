import React, { useState } from 'react'
import style from './engine.module.css'
import TitleContainer from '@/components/TitleContainer'
import axios from 'axios'
import { SERVER_IP, useContentStore } from '@/utils/store'
import TextInput from '@/components/TextInput'
import ReWriteInput from '@/components/ReWriteInput'

const StoryLine = () => {
  const [prompt, setPrompt] = useState<string>('')
  const { storyLine, setStoryline } = useContentStore()

  const generate = async () => {
    const body = {}
    // const response = await axios.post(SERVER_IP + '/topic', body)
  }

  return (
    <div className={style.questionContainer}>
      <TitleContainer
        title='전체 스토리라인 구성'
        buttonText='작성한 내용을 기반으로 생성하기'
        onClick={generate}
      />
      <TextInput
        value={storyLine}
        onChange={(e) => setStoryline(e.currentTarget.value)}
        placeholder='전체 스토리 라인을 작성하세요.'
      />
      <ReWriteInput
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        placeholder='시놉시스를 수정하고 싶나요? 원하는 내용을 입력하세요. 예시) 좀 더 자극적인 주제로 보여줘, 현실적인 내용으로 해줘 등'
        onClick={generate}
      />
    </div>
  )
}

export default StoryLine
