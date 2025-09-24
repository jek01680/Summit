var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const path = require('path')

const MAIL_PWD = 'cvinbtvnmeegfjrq'
const MAIL = 'summit@summitkr.com'

router.use(bodyParser.json())
router.use(express.urlencoded({ extended: true }))

/** 메인 (서비스 포함) */
router.get('/', function (req, res) {
  res.render('index')
})

/** 비즈니스 */
router.get('/business', function (req, res) {
  res.render('business')
})

/** 연혁 */
router.get('/history', function (req, res) {
  res.render('history')
})

/** 팀 소개 */
router.get('/team', function (req, res) {
  res.render('team')
})

/** 견적문의 */
router.get('/contact', function (req, res) {
  res.render('contact')
})

/**메일 전송 */
router.post('/sendMail', async function (req, res) {
  const { name, email, phone, message, mailContent } = req.body;

  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ooojek0608@gmail.com",
        pass: MAIL_PWD
      },
      family: 4,
      logger: true,
      debug: true,
    });

    const options = {
      from: 'ooojek0608@gmail.com',
      to: 'summit@summitkr.com',
      replyTo: email,
      subject: `[Summit 홈페이지] 견적 문의 - ${name}`,
      html: mailContent,
    };

    let info = await transport.sendMail(options);

    if (info.accepted && info.accepted.length > 0) {
      return res.status(200).json({
        success: true,
        message: '메일이 전송되었습니다.',
        accepted: info.accepted
      });
    } else {
      return res.status(500).json({
        success: false,
        message: '메일 전송에 실패했습니다. (수신자가 거부됨)',
        rejected: info.rejected
      });
    }
  } catch (err) {
    console.error("메일 전송 오류:", err);
    return res.status(500).json({
      success: false,
      message: '메일 전송에 실패했습니다. 다시 시도해주세요.',
      error: err.message
    });
  }
});

module.exports = router
