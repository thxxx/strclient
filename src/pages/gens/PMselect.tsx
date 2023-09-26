import { SELECT_COLOR, SERVER_IP, useContentStore } from '@/utils/store'
import React, { useState } from 'react'
import style from '../../components/custom.module.css'
import style2 from './engine.module.css'
import axios from 'axios'
import { usePlantStore } from '@/utils/planStore'

export type PLANTYPE = {
  text: string
  value: string
  contentPlaceholer?: string
  promptPlaceholer?: string
}

const PMselect = () => {
  const { brainDump, planList, chosenKeywords, setPlanList } = useContentStore()
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

  const generate = async () => {
    const body = {
      dump: brainDump,
      keywords: [...chosenKeywords.map((item) => item.description)],
      planList,
    }

    const response = await axios.post(SERVER_IP + '/plan', body)

    console.log('결과 : ', response)

    const res = response['data']['data']

    console.log('결과11 : ', res)

    setBackground(res['background'])
    setIntention(res['intention'])
    setInterest(res['growth'])
    setEnding(res['ending'])
    setEvent(res['event'])
    setGrowth(res['interest'])
  }

  const click = (item: PLANTYPE) => {
    if (planList.includes(item)) {
      const removed = planList.filter((doc) => doc !== item)
      setPlanList(removed)
    } else {
      setPlanList([...planList, item])
    }
  }

  return (
    <div className={style2.questionContainer} style={{ margin: '40px 0px' }}>
      <p>위에서 작성한 내용을 바탕으로 만들고 싶은 기획을 선택하세요</p>
      <div className={style.listInner}>
        {GLIST.map((item) => {
          return (
            <div
              key={item.value}
              style={{
                background: `${
                  planList.includes(item) ? SELECT_COLOR : 'white'
                }`,
              }}
              className={style.tableElement}
              onClick={() => click(item)}
            >
              {item.text}
            </div>
          )
        })}
      </div>
      <button className={style.button1} onClick={() => generate()}>
        생성하기
      </button>
    </div>
  )
}

export default PMselect

const GLIST: PLANTYPE[] = [
  {
    text: '배경 세계관 설정',
    value: 'background',
  },
  {
    text: '핵심 주제의식/기획의도',
    value: 'intention',
  },
  {
    text: '주인공/캐릭터의 변화',
    value: 'growth',
  },
  {
    text: '결말',
    value: 'ending',
  },
  {
    text: '독자들의 흥미 유발 요소',
    value: 'interest',
  },
  {
    text: '핵심 사건',
    value: 'event',
  },
  // {
  //   text: '시놉시스',
  //   value: 'synopsis',
  // },
  // {
  //   text: '1화에 들어갈 내용',
  //   value: 'first',
  // },
]
