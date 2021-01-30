const parseCookies = (cookie : string | undefined) => {
    try {
        if (cookie === undefined) throw new Error()
        let cookies : string | Array<string[]> = cookie
        cookies = cookies.split(';').map(cookie => cookie.replace(' ', '').split('='))
        let parsedCookies : { [key : string] : string } = {}
        cookies.forEach(cookie => {
            parsedCookies = {
                ...parsedCookies,
                [cookie[0]]: cookie[1]
            }
        })
        return parsedCookies
    }
    catch {
        return null
    }
}

export default parseCookies