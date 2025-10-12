import React, { useState } from 'react'
import { locationSerch } from '../apis/location-serch-func';

// どこの天気を探すかを表示ホーム画面
function Home() {
    const [query, setQuery] = useState("");

    // queryをセットする関数
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    // queryの値を基にAPIを叩く関数
    const submitQuery = async(): Promise<void> => {
        const data = await locationSerch(query)
        console.log(data)
    }
    return (
        <div>
            <h1>どこの天気を調べますか？</h1>
            <br />
            <input type="text" style={{ backgroundColor: 'grey' }} value={query} onChange={handleSubmit} />
            <button type="button" onClick={submitQuery}>検索する</button>
        </div>
    )
}

export default Home
