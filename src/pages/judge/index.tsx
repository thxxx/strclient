import React, { useState } from 'react'
import style from '../generate.module.css'
import axios from 'axios'
import { SERVER_IP } from '@/utils/store'

type PersonType = {
    label:string,
    desc:string
}

const JudgePage = () => {
    const [person1, setPerson1] = useState<PersonType>({
        "label":"나",
        "desc":"말도 없이 이성과 술을 마신 애인때문에 화가 남"
    })
    const [person2, setPerson2] = useState<PersonType>({
        "label":"애인",
        "desc":"이성이 술자리에 있다는 사실을 알리지 않음"
    })
    const [person3, setPerson3] = useState<PersonType>({
        "label":"",
        "desc":""
    })
    const [case1, setCase1] = useState<string>("제 여자친구가 친구들이랑 술을 마시러 간다고 했는데, 알고보니 그 술자리에 남자인 친구도 있었어요. 이성이 있다면 미리 말해야하는거 아닌가요?")
    const [loading, setLoading] = useState<boolean>(false)
    const [addition, setAddition] = useState<string>("")
    const [middle, setMiddle] = useState<any[]>()
    const [judge1, setJudge1] = useState<string>("")
    const [last, setLast] = useState<any[]>()

    const getDiscussion = async () => {
        console.log("클릭")
        setLoading(true)
        const body = {
            person1,
            person2,
            person3,
            case:case1
        }

        const response = await axios.post(SERVER_IP + '/judge1', body)
        console.log(response)
        setLoading(false)
        setMiddle(response.data.response)
        setJudge1(response.data.text)
    }

    const sendAddition = async () => {
        console.log("클릭")
        setLoading(true)
        const body = {
            person1,
            person2,
            person3,
            case:case1,
            addition:addition,
            judge1:judge1
        }

        const response = await axios.post(SERVER_IP + '/judge2', body)
        console.log(response)
        setLoading(false)
        setLast(response.data.response)
    }

  return (
    <main className={style.main}>
    {
        loading && <div className={style.loading}>로딩중</div>
    }
    <div>
        <div>case</div>
        <textarea value={case1} onChange={e => setCase1(e.currentTarget.value)}  className={style.inputs}/>
        <div>
            <p>people</p>
            <p>첫번째 인물</p>
            <div>
                <input value={person1.label} onChange={e => setPerson1({...person1, label: e.currentTarget.value})} />
                <input value={person1.desc}  onChange={e => setPerson1({...person1, desc: e.currentTarget.value})} className={style.inputs}/>
            </div>
            <p>두번째 인물</p>
            <div>
                <input value={person2.label}  onChange={e => setPerson2({...person2, label: e.currentTarget.value})}/>
                <input value={person2.desc}  onChange={e => setPerson2({...person2, desc: e.currentTarget.value})} className={style.inputs}/>
            </div>
            <p>세번째 인물</p>
            <div>
                <input value={person3.label}  onChange={e => setPerson3({...person3, label: e.currentTarget.value})}/>
                <input value={person3.desc}  onChange={e => setPerson3({...person3, desc: e.currentTarget.value})} className={style.inputs}/>
            </div>
        </div>
    </div>
    <button onClick={() => getDiscussion()}>출력 받기</button>
    
    {
        middle && <>
            <p style={{padding:5}}>{middle.map((item, i) => {
                return <div className={style.one_div} key={i}>
                    <strong>{item.type}</strong> : {item.text}
                </div>
            })}</p>
            <iframe src="https://giphy.com/embed/3ohzdTinQ1itue6f2o" width="480" height="266" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/snl-saturday-night-live-3ohzdTinQ1itue6f2o">via GIPHY</a></p>
            <br />
            <label>추가 입장 밝히기</label>
            <textarea value={addition} onChange={e => setAddition(e.currentTarget.value)} className={style.inputs}/>
            <button onClick={() => sendAddition()}>추가 입장 제출</button>
        </>
    }

    {
        last && <>
        <p style={{padding:5}}>{last.map((item, i) => {
            return <div className={style.one_div} key={i}>
                <strong>{item.type}</strong> : {item.text}
            </div>
        })}</p>
            <iframe src="https://giphy.com/embed/yLlXBR9OMAYjm" width="480" height="300" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/yLlXBR9OMAYjm">via GIPHY</a></p>
        </>
    }
    <br />
    <br />
    <br />
    </main>
  )
}

export default JudgePage