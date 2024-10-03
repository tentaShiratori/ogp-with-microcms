import { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import {Helmet} from "react-helmet"
import { createClient } from 'microcms-js-sdk'

  const client = createClient({
    serviceDomain: '1zu8tyo4pl',
    apiKey: import.meta.env.VITE_MICROCMS_KEY as string,
  })
function App() {
  const [count, setCount] = useState(0)
  const [title, setTitle] = useState('')
  useEffect(() => {
    client.getList<{"ogp-title":string}>({ endpoint: 'blogs' }).then((response) => {
      setTitle(response.contents[0]['ogp-title'])
    })
  },[])

  return (
    <>
      <div>
        <Helmet>
          <meta property="og:title" content={title}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="{url}"/>
          <meta property="og:image" content="{url}/ogp-img.png"/>
          <meta property="og:site_name" content="SmartHR（スマートHR）"/>
          <meta property="og:description" content="SmartHRは、人事・労務の業務効率化からタレントマネジメントまで、働くすべての人の生産性向上を支える、「クラウド人事労務ソフト」です。"/>
          <meta property="og:locale" content="ja_JP"/>
        </Helmet>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
