import React, { useState } from 'react'
import { locationSearch } from '../apis/location-search-func';
import { type Location } from '../interfaces/location';
import { useNavigate } from 'react-router-dom';

// どこの天気を探すかを表示ホーム画面
function Home() {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("")

    const navigate = useNavigate();

    // queryをセットする関数
    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setError("")
    }

    // queryの値を基にAPIを叩く関数
    const submitQuery = async(): Promise<void> => {
        if(query.trim() === ""){
            setError("どこの天気を調べるか入力してください。")
            return;
        }

        const data = await locationSearch(query)
        const locationData: Location = {
            display_name: data[0].display_name,
            lat: data[0].lat,
            lon: data[0].lon
        }
        // 動作確認用
        // console.log(locationData)

        navigate("/location", { state: { locationData } })
    }
    return (
        <div>
            <h1>どこの天気を調べますか？</h1>
            <br />
            {error &&(<>
                    <p>{error}</p>
                    <br />
                </>)
            }
            <input type="text" style={{ backgroundColor: '#fff', border: "1px solid #282727ff" }} value={query} onChange={handleSubmit} />
            <button type="button" onClick={submitQuery}>検索する</button>
        </div>
    )
}

export default Home
