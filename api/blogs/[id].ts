import { createClient } from "microcms-js-sdk"
import "@vercel/edge"

const bots = [
    'Twitterbot',
    'facebookexternalhit',
    'Slackbot-LinkExpanding'
];
export const GET  = async (req:Request):Promise<Response> => {
    const userAgent = req.headers.get('user-agent')as string;
    const isBot = bots.some((bot) => userAgent.toLowerCase().includes(bot.toLowerCase()));
    console.log(userAgent,isBot)
    if(!isBot) {
        return fetch('https://ogp-with-microcms.vercel.app')
    }
    const url = new URL(req.url as string, `http://${req.headers.get('host')}`)
    const client = createClient({
        serviceDomain: '1zu8tyo4pl',
        apiKey: process.env.VITE_MICROCMS_KEY as string,
    })
    const data = await client.get({ endpoint: 'blogs', contentId: url.pathname.split('/')[3] as string })
    return new Response(`
        <!doctype html>
<html lang="en">
  <head prefix="og: http://ogp.me/ns#">
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
              <meta property="og:title" content=${data.title}/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://ogp-with-microcms.vercel.app"/>
          <meta property="og:image" content="https://ogp-with-microcms.vercel.app/onepiece01_luffy.png"/>
          <meta property="og:site_name" content="hoge"/>
          <meta property="og:description" content="desc"/>
          <meta property="og:locale" content="ja_JP"/>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
        `, {
        headers: {
        'content-type': 'text/html;charset=UTF-8'
        },

    })
}