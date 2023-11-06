var express = require('express')
var router = express.Router()
//var favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const path = require('path')

const MAIL_PWD = 'sec!8814307!'
const MAIL = 'summit@summitkr.com'

//app.use(favicon(path.join(__dirname, 'assets/', 'favicon2.ico')))
router.use(bodyParser.json())
router.use(express.urlencoded({ extended: true }))

/**메인 */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

/**메일 전송 */
router.post('/sendMail', async function (req, res, next) {
  var json = req.body
  console.log(json.mailContent)

  try {
    const transport = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465,
      secure: true,
      // 이메일을 보낼 계정 데이터 입력
      auth: {
        user: 'summit.kr',
        pass: MAIL_PWD,
      },
      from: MAIL,
    })

    // 옵션값 설정
    const options = {
      from: 'summit.kr@daum.net',
      to: MAIL,
      subject: '홈페이지 메일 문의 건 입니다',
      html: json.mailContent,
    }

    let send = await transport.sendMail(options)
    console.log(`Message Sent: `, options)
    return res.send({ message: '메일이 전송되었습니다' })
  } catch (err) {
    console.log(err)
    return res.send({ message: '메일 전송에 실패했습니다. 다시 시도해주세요' })
  }
})

module.exports = router
