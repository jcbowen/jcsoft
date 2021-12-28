import CryptoJS from 'crypto-js'

let AES = function () {
  let that = this
  that.key = 'jcsoft.aes_key__'
  that.iv = 'jcsoft.aes_iv___'
  that.config = {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }
}

let aes = new AES()

AES.prototype.encrypt = function (str, key, iv) {
  let that = this
  key = CryptoJS.enc.Utf8.parse(key || that.key)
  iv = CryptoJS.enc.Utf8.parse(iv || that.iv)
  const encrypted = CryptoJS.AES.encrypt(str, key, { iv, ...that.config })
  return encrypted.toString()
}
AES.prototype.decrypt = function (str, key, iv) {
  let that = this
  key = CryptoJS.enc.Utf8.parse(key || that.key)
  iv = CryptoJS.enc.Utf8.parse(iv || that.iv)
  const decrypt = CryptoJS.AES.decrypt(str, key, {
    iv,
    ...that.config,
  })
  return decrypt.toString(CryptoJS.enc.Utf8)
}

/**
 * 使用方法演示
 */
AES.prototype.demo = function () {
  let that = this

  let data = 'jcsoft: success'
  let a = that.encrypt(data)
  let b = that.decrypt(a)
  console.log('data:', data)
  console.log('encrypt-data:', a)
  console.log('decrypt-data:', b)
}

export default aes
