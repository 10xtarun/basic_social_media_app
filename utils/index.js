module.exports.randomSecureKey = () => {
    const length = 8
    const randomString = Math.floor(Math.random() * Math.pow(10, length) )
    return `sma${randomString}`
}