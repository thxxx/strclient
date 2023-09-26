import React, { useState } from 'react'
import style from './engine.module.css'
import ReWriteInput from '@/components/ReWriteInput'
import ListTable from '@/components/ListTable'
import { SERVER_IP, useContentStore } from '@/utils/store'
import axios from 'axios'

const TopicsRec = () => {
  const { brainDump, chosenKeywords } = useContentStore();
  const [isTopicRec, setIsTopicRec] = useState<boolean>(false)
  const [prompt, setPrompt] = useState<string>('')
  const [genTopics, setGenTopics] = useState<string[]>([
    '소재1',
    '소재2',
    '소재3',
    '소재4',
  ])
  const [storeTopics, setStoreTopics] = useState<string[][]>([])

  const reGenerate = async (typed: 're' | 'first') => {
    let response

    let body = {
      originalList: genTopics,
      prompt: prompt,
      brainDump:brainDump,
      chosenKeywords:[...chosenKeywords.map((item: any) => item.description)],
      info: '',
      type: typed,
    }

    if (typed !== 'first') {
      response = await axios.post(SERVER_IP + '/topic', body)
    } else {
      response = await axios.post(SERVER_IP + '/topic', body)
    }
    if (response.status === 200) {
      console.log('response 22: ', response)
      const lists = JSON.parse(response['data']['data'])
      console.log('response : ', lists)
      setGenTopics(response['data']['data'])
      setStoreTopics([...storeTopics, response['data']['data']])
      setPrompt('')
      setIsTopicRec(true)
    }
  }

  return (
    <div className={style.questionContainer}>
      {!isTopicRec ? (
        <div className={style.rec_button} onClick={() => reGenerate('first')}>
          작성한 내용으로 가능한 소재를 추천받을게요
        </div>
      ) : (
        <div>
          <ListTable title='소재 추천' el={genTopics} />
          <div>
            <ReWriteInput
              value={prompt}
              onChange={(e) => setPrompt(e.currentTarget.value)}
              placeholder='다른 소재를 추천받고 싶으신가요? 원하는 내용을 입력하세요. 예시) 좀 더 자극적인 주제로 보여줘, 현실적인 내용으로 해줘 등. 클릭한 소재를 기반으로 수정된 소재를 생성합니다.'
              onClick={() => reGenerate('re')}
            />
          </div>
          {storeTopics.length > 1 && <div></div>}
        </div>
      )}
    </div>
  )
}

export default TopicsRec
