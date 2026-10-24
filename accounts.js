function loadAccountsFromEnv() {
    let accounts = []

    // 读取旧版环境变量
    if(process.env.TY_ACCOUNTS) {
        let raw = process.env.TY_ACCOUNTS.trim()
        if ((raw.startsWith("'") && raw.endsWith("'")) || (raw.startsWith('"') && raw.endsWith('"'))) {
            raw = raw.slice(1, -1).trim()
        }
        accounts = JSON.parse(raw)
    } else {
        // 从环境变量中读取账号，支持任意数量
        let index = 1
        while (true) {
            const userName = process.env[`TY_USERNAME_${index}`]
            const password = process.env[`TY_PASSWORD_${index}`]
            if (!userName || !password) {
                break
            }
            accounts.push({
                userName,
                password
            })
            index++
        }
    }

    return accounts
}

const accounts = loadAccountsFromEnv()
module.exports = accounts
