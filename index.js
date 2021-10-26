//Dependencies
const Debugger = require("./utils/i2rys")
const Puppeteer = require("puppeteer")
const Is_IP = require("is-ip")

//Variables
const Self_Args = process.argv.slice(2)

//Functions
async function Bing(page){
    await page.goto(`https://www.bing.com/search?q=${Self_Args[0]}`, { waitUntil: "domcontentloaded" }).catch(()=>{
        Debugger.log("yellowish", "ERROR", "Is_IP_Leaked Debugger:", "Something went wrong while using Bing search engine.")
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Skipping Bing search engine.")

        DuckDuckGo(page)
        return
    })

    const page_content = await page.content()

    if(page_content.indexOf("There are no results for") == -1){
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Looks like the IP might be leaked on Bing search engine.")
    }else{
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Looks like the IP is not leaked on Bing search engine.")
    }

    DuckDuckGo(page)
}

async function DuckDuckGo(page){
    await page.goto(`https://duckduckgo.com/?q=${Self_Args[0]}&t=hy&va=g&ia=web`, { waitUntil: "domcontentloaded" }).catch(()=>{
        Debugger.log("yellowish", "ERROR", "Is_IP_Leaked Debugger:", "Something went wrong while using DuckDuckGo search engine.")
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Skipping DuckDuckGo search engine.")

        Yandex(page)
        return
    })

    const page_content = await page.content()

    if(page_content.indexOf("No results found for") == -1){
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Looks like the IP might be leaked on DuckDuckGo search engine.")
    }else{
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Looks like the IP is not leaked on DuckDuckGo search engine.")
    }

    Yandex(page)
}

async function Yandex(page){
    await page.goto(`https://yandex.com/search/?text=${Self_Args[0]}&lr=21065`, { waitUntil: "domcontentloaded" }).catch(()=>{
        Debugger.log("yellowish", "ERROR", "Is_IP_Leaked Debugger:", "Something went wrong while using Yandex search engine.")
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Skipping Yandex search engine.")

        SwissCows(page)
        return
    })

    const page_content = await page.content()

    if(page_content.indexOf("No results matching your search") == -1){
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Looks like the IP might be leaked on Yandex search engine.")
    }else{
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Looks like the IP is not leaked on Yandex search engine.")
    }
    
    SwissCows(page)
}

async function SwissCows(page){
    await page.goto(`https://swisscows.com/web?query=${Self_Args[0]}`, { waitUntil: "domcontentloaded" }).catch(()=>{
        Debugger.log("yellowish", "ERROR", "Is_IP_Leaked Debugger:", "Something went wrong while using SwissCows search engine.")
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Skipping SwissCows search engine.")

        Done()
        return
    })

    const page_content = await page.content()

    if(page_content.indexOf("No results found for") == -1){
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Looks like the IP might be leaked on SwissCows search engine.")
    }else{
        Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Looks like the IP is not leaked on SwissCows search engine.")
    }
    
    Done()
}

async function Done(){
    Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Searching is finished.")
    Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Exiting...")

    process.exit()
}

//Main
if(!Self_Args.length){
    console.log(`node index.js <ip>
Example: node index.js 0.0.0.0`)
    process.exit()
}

if(!Is_IP(Self_Args[0])){
    Debugger.log("yellowish", "CRITICAL", "Is_IP_Leaked Debugger:", "Invalid IP.")
    Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Exiting...")
    process.exit()
}

Debugger.log("yellowish", "INFO", "Is_IP_Leaked Debugger:", "Searching has started.")

Main()
async function Main(){
    const browser = await Puppeteer.launch({ headless: false, args: ["--no-sandbox", "--disable-setuid-sandbox"] })
    const page = await browser.newPage()

    Bing(page)
}
