import React, { useState } from 'react'
import style from './engine.module.css'
import TextInput from '@/components/TextInput'
import { KeywordsType, keywords } from '@/utils/keywords'
import { SELECT_COLOR, SERVER_IP, useContentStore } from '@/utils/store'
import TitleContainer from '@/components/TitleContainer'
import ReWriteInput from '@/components/ReWriteInput'
import axios from 'axios'
import { questions_corpus } from '@/utils/questions'
import { usePlantStore } from '@/utils/planStore'

type BrainProps = {
  getRandomElements: (array:string[], count:number) => string[]
}

const Brain = ({getRandomElements}: BrainProps) => {
  const { brainDump, chosenKeywords, setChosenKeywords, setBrainDump } =
    useContentStore()
  const {questions, setQuestions} = usePlantStore()
  const [index, setIndex] = useState<number>(0)
  const [prompt, setPrompt] = useState<string>("")
  const [responseText, setResponseText] = useState<string>("")

  const clickKeyword = (word: KeywordsType) => {
    if (chosenKeywords?.includes(word)) {
      const filtered = chosenKeywords.filter((doc) => doc !== word)
      setChosenKeywords([...filtered])
    } else {
      setChosenKeywords([...chosenKeywords, word])
    }
  }

  const seeNudge = () => {
    if(brainDump.length < 5){
      const randQ = getRandomElements(questions_corpus, 3)
      setQuestions(randQ)
    }
  }

  const generate = async () => {
    if (prompt.length<3) return;

    const body = {
      info:'',
      brainDump:brainDump,
      prompt:prompt
    }

    const response = await axios.post(SERVER_IP + '/brain_ask', body)

    console.log("aaaa : ", response)
    setResponseText(response['data']['data'])
  }

  return (
    <div className={style.gen_card}>
      <div className={style.inner}>
        <TitleContainer
          title='모든 생각을 적는 곳'
          seeNudge={seeNudge}
        />
        <TextInput
          row={19}
          value={brainDump}
          onChange={(e) => setBrainDump(e.currentTarget.value)}
          placeholder='이야기에 관해서 머릿속에 떠오르는 모든 것들을 적어보세요. 의식의 흐름대로 적어도 되고 문장이 아니어도 괜찮습니다.'
        />
        <ReWriteInput
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
            placeholder='도움이 필요한 내용들을 입력해주세요. 예시) 이런 이야기에서 결말은 어떻게 나는게 좋을까? 이걸로 아무 소설 아이디어 만들어줘 등'
            onClick={generate}
          />
        {
          responseText && <div className={style.brain_res} dangerouslySetInnerHTML={{__html:responseText}} />
        }
      </div>
      <div className={style.inner}>
        {
          chosenKeywords.length > 0 &&
            <p>선택한 키워드 ( 클릭해서 삭제 )</p>
        }
        <div>
          {chosenKeywords?.map((item) => {
            return (
              <div
                key={item.text}
                className={style.tag}
                onClick={() => clickKeyword(item)}
                style={{ background: SELECT_COLOR }}
              >
                {item.text}
              </div>
            )
          })}
        </div>

        <TitleContainer
          title='이야기에 사용하고 싶은 모든 키워드들을 선택하세요.'
          buttonText='다른 키워드 찾기'
          onClick={() => {
            if (index === 5) {
              setIndex(0)
            } else {
              setIndex(index + 1)
            }
            console.log(keywords.length)
          }}
        />
        <div className={style.keywordTable}>
          {keywords.slice(index * 55, (index + 1) * 55).map((item) => {
            return (
              <div
                key={item.text}
                className={style.tag}
                onClick={() => clickKeyword(item)}
                style={{
                  background: `${
                    chosenKeywords.includes(item) ? SELECT_COLOR : 'white'
                  }`,
                }}
              >
                {item.text}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Brain
