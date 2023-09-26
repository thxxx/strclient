import TitleContainer from '@/components/TitleContainer'
import React, { useState } from 'react'
import style from './input.module.css'
import style2 from './engine.module.css'
import style3 from '@/components/custom.module.css'
import ReWriteInput from '@/components/ReWriteInput'
import { SERVER_IP, useContentStore } from '@/utils/store'
import axios from 'axios'
import { usePlantStore } from '@/utils/planStore'
import { get_info } from '@/utils/utils'

const FirstChapter = () => {
  const [start, setStart] = useState<string>('')
  const [fevent, setFEvent] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [end, setEnd] = useState<string>('')
  const [prompt, setPrompt] = useState<string>('')
  const { background, intention, growth, ending, event, interest, setQuestions } =
    usePlantStore()
  const { brainDump, planList, chosenKeywords, synopsis } = useContentStore()
  const [keep, setKeep] = useState<string[]>([])

  const generate = async () => {
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
      info: info,
    }
    const response = await axios.post(SERVER_IP + '/first', body)

    const output = JSON.parse(response['data']['data'])
    setStart(output['start'])
    setFEvent(output['event'])
    setEnd(output['end'])
    setDesc(output['description'])
  }
  const reGenerate = async () => {}

  const onKeep = (item: string) => {
    if (keep.includes(item)) {
      const filtered = keep.filter((doc) => doc !== item)
      setKeep([...filtered])
    } else {
      setKeep([...keep, item])
    }
  }

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

    const first = {
      start:start,
      event:fevent,
      end:end,
      desc: desc,
    }

    const body = {
      info:info,
      first:first,
    }

    const response = await axios.post(SERVER_IP + "/first_nudge", body)
    
    const output = response['data']['data']

    setQuestions([...output.slice(0,3)])
  }

  return (
    <div className={style2.questionContainer}>
      <TitleContainer
        title='1화 구성'
        buttonText='작성한 내용을 기반으로 생성하기'
        seeNudge={seeNudge}
        onClick={generate}
      />
      <div className={style.sectionContainer}>
        <div className={style.sectionWrapper}>
          <div className={style.flexRow}>
            <span className={style.sectionLabel}>1화의 시작</span>
            {/* <button
              className={style3.reset_button}
              onClick={() => onKeep('start')}
              >
              보존
            </button> */}
          </div>
          <textarea
            className={style.section}
            value={start}
            onChange={(e) => setStart(e.currentTarget.value)}
          />
        </div>
        <div className={style.sectionWrapper}>
          <div className={style.flexRow}>
            <span className={style.sectionLabel}>
              1화에서 표현되어야 하는 내용
            </span>
            {/* <button
              className={style3.reset_button}
              onClick={() => onKeep('start')}
            >
              보존
            </button> */}
          </div>
          <textarea
            className={style.section}
            value={desc}
            onChange={(e) => setDesc(e.currentTarget.value)}
          />
        </div>
        <div className={style.sectionWrapper}>
          <div className={style.flexRow}>
            <span className={style.sectionLabel}>1화의 주요 사건</span>
            {/* <button
              className={style3.reset_button}
              onClick={() => onKeep('start')}
            >
              보존
            </button> */}
          </div>
          <textarea
            className={style.section}
            value={fevent}
            onChange={(e) => setFEvent(e.currentTarget.value)}
          />
        </div>
        <div className={style.sectionWrapper}>
          <div className={style.flexRow}>
            <span className={style.sectionLabel}>1화의 엔딩</span>
            {/* <button
              className={style3.reset_button}
              onClick={() => onKeep('start')}
            >
              보존
            </button> */}
          </div>
          <textarea
            className={style.section}
            value={end}
            onChange={(e) => setEnd(e.currentTarget.value)}
          />
        </div>
      </div>
      <ReWriteInput
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        placeholder='다른 소재를 추천받고 싶나요? 원하는 내용을 입력하세요. 예시) 좀 더 자극적인 주제로 보여줘, 현실적인 내용으로 해줘 등'
        onClick={() => reGenerate()}
      />
    </div>
  )
}

export default FirstChapter
