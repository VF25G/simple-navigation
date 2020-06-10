let searchFormList = {
    bing: {action: "https://www.bing.com", name: "q"},
    google: {action: "https://www.google.com/search", name: "q"},
    baidu: {action: "https://www.baidu.com/s", name: "wd"}
}

const searchEngineColor = {
    bing: '#008383',
    google: '#008AF2',
    baidu: '#0047DE'
}

const $siteList = $('.siteList')
const localStored = localStorage.getItem('localStored')
const localStoredObject = JSON.parse(localStored)
const localStoredHashMap = localStoredObject || [
    {favicon: "https://favicon.link/google.com", url: "https://www.google.com"},
    {favicon: "https://favicon.link/acwifi.net", url: "https://www.acwifi.net"},
    {favicon: "https://favicon.link/v2ex.com", url: "https://v2ex.com"},
    {favicon: "https://favicon.link/github.com", url: "https://github.com"},
    {favicon: "https://favicon.link/bing.com", url: "https://bing.com"},
    {favicon: "https://favicon.link/baidu.com", url: "https://baidu.com"},
    {favicon: "https://favicon.link/bilibili.com", url: "https://bilibili.com"},
    {favicon: "https://favicon.link/acfun.cn", url: "https://acfun.cn"},
    {favicon: "https://favicon.link/jd.com", url: "http://www.jd.com/"},
    {favicon: "https://favicon.link/vol.moe", url: "https://vol.moe"}
]


const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}
const domainName = (url) => {
    // 待完善
    return simplifyUrl(url).replace('.com', '')
        .replace('.net', '')
}

const render = () => {
    $siteList.find('li').remove()
    localStoredHashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo"><img src=${node.favicon} alt=""></div>
                    <div class="siteName">${domainName(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-remove"></use>
                        </svg>
                    </div>
                </div>
            </li>`)

        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            localStoredHashMap.splice(index, 1)
            render()
        })

        $siteList.append($li)
    })
}

render()

const $searchFrom = $('.searchForm')
const $searchInput = $('.searchInput')
let currentSearchEngine = localStorage.getItem('currentEngine') || 'bing'

function changeSearchEngine(eventOrButtonName) {
    let buttonName
    if (eventOrButtonName instanceof Object) {
        let currentClassName = eventOrButtonName.currentTarget.className
        buttonName = currentClassName.replace('Btn', "")
    } else if (typeof eventOrButtonName === "string") {
        buttonName = eventOrButtonName
    }

    // setting searchButton background
    $('.searchButton').css({'background': searchEngineColor[buttonName]})

    // change searchFrom
    $searchFrom.attr('action', searchFormList[buttonName].action)
    $searchInput.attr('name', searchFormList[buttonName].name)
    currentSearchEngine = buttonName
}

// Setting localEngine by page Loaded
changeSearchEngine(currentSearchEngine)

$('.searchEngine').on('click', 'div', (e) => {
    changeSearchEngine(e)
})

function faviconUrl(url) {
    const faviconAPI = 'https://favicon.link/'
    let baseURl = simplifyUrl(url)
    return faviconAPI + baseURl
}

$('.addButton').on('click', () => {
    let url = window.prompt('请输入需要添加的网址：')
    if (!url) {
        return
    }
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    localStoredHashMap.push({
        favicon: faviconUrl(url),
        url: url
    })
    render()
})

window.onbeforeunload = () => {
    const hashMapString = JSON.stringify(localStoredHashMap)
    localStorage.setItem('localStored', hashMapString)
    localStorage.setItem('currentEngine', currentSearchEngine)
}

$(document).ready(() => {
    $('.searchInput').val("")
})