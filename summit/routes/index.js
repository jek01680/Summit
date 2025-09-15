var express = require('express')
var router = express.Router()
//var favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const path = require('path')

// const MAIL_PWD = 'DoctorTlqkf5332!'
const MAIL_PWD = 'cvinbtvnmeegfjrq'
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

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ooojek0608@gmail.com",
        pass: MAIL_PWD
      },
    })
    // 옵션값 설정
    const options = {
      from: 'ooojek0608@gmail.com',
      to: 'summit@summitkr.com',
      subject: '[Summit 홈페이지] 견적 문의입니다.',
      html: json.mailContent,
    }

    let send = await transport.sendMail(options)
    return res.send({ message: '메일이 전송되었습니다' })
  } catch (err) {
    console.log(err)
    return res.send({ message: '메일 전송에 실패했습니다. 다시 시도해주세요' })
  }
})

module.exports = router
