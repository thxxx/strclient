import { useContentStore } from '@/utils/store'
import React, { useState } from 'react'
import TitleContainer from '@/components/TitleContainer'
import style from './engine.module.css'
import cstyle from '@/components/custom.module.css'
import { SERVER_IP } from '@/utils/store'
import TextInput from '@/components/TextInput'
import ReWriteInput from '@/components/ReWriteInput'
import axios from 'axios'
import { usePlantStore } from '@/utils/planStore'
import { get_info } from '@/utils/utils'

const Character = () => {
  const { background, intention, growth, ending, event, interest, questions, setQuestions } = usePlantStore()
  const { brainDump, planList, chosenKeywords, synopsis, characters, setCharacters } = useContentStore()
  const [prompt, setPrompt] = useState<string>('')

  const generate = async () => {
    const body = {
      dump: brainDump,
      keywords: [...chosenKeywords.map((item) => item.description)],
      synopsis: synopsis,
      planList,
    }

    const response = await axios.post(SERVER_IP + '/char', body)
    const output = response['data']['data']
 
    setCharacters(output)
  }
  const reGenerate = async () => {}

  const seeNudge = async () => {
    const valueList = planList.map((item) => item.value)

    let info = get_info(
      valueList,
      brainDump,
      chosenKeywords,
      background,
      intention,
      growth,
      ending,
      interest,
      event
    )

    info += `\n\n Synopsis(plot summary) of this novel : ${synopsis}`

    const body = {
      info:info,
      characters:characters,
    }

    const response = await axios.post(SERVER_IP + "/char_nudge", body)
    
    const output = response['data']['data']

    setQuestions([...output.slice(0,3)])
  }

  return (
    <div className={style.questionContainer}>
      <TitleContainer
        title='캐릭터를 구성하세요'
        buttonText='작성한 내용을 기반으로 생성하기'
        onClick={generate}
        seeNudge={seeNudge}
      />
      <TextInput
        row={12}
        value={characters}
        onChange={(e) => setCharacters(e.currentTarget.value)}
        placeholder='캐릭터 설명을 작성하세요. [ ] 안에 지시사항을 입력해서 위치를 지정하고 해당 위치에 생성할 내용에 대한 자세한 가이드를 제공가능합니다. 
        예시) 이수지/주인공/20살, 갓 대학생이 되었다. 이야기가 진행되는 동안 무엇에 더 가치를 둬야하는지 고민한다. [좋아하는 음식에 관한 내용을 추가해줘]'
      />
      <ReWriteInput
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        placeholder='캐릭터를 수정하고 싶으신가요? 원하는 내용을 입력하세요. 예시) 좀 더 자극적인 주제로 보여줘, 현실적인 내용으로 해줘 등'
        onClick={reGenerate}
      />
    </div>
  )
}

export default Character
