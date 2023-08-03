var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

router.use(bodyParser.json())
router.use(express.urlencoded({ extended: true }))

/**메인 */
router.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html')
})

/**메일 전송 */
router.post('/sendMail', async function (req, res, next) {
  var json = req.body
  console.log(json.mailContent)
  /*
  try{
    const transport = nodemailer.createTransport({
      host: 'smtp.daum.net',
      port: 465,
      secure: true,
      // 이메일을 보낼 계정 데이터 입력
      auth: { 
        user: 'summit.kr',
        pass: 'sec!8814307!'
      },
      from: 'summit@summitkr.com'
    });
  
    // 옵션값 설정
    const options = {
      from: 'summit@summitkr.com',
      to: 'summit4307@gmail.com',
      subject: '홈페이지 메일 문의 건 입니다',
      html: json.mailContent,
    };
  
    let send = await transport.sendMail(options);
    console.log(`Message Sent: `, options);
    return res.send({"message": '메일이 전송되었습니다' });
  }catch (err) {
    console.log(err);
    return res.send({"message": '메일 전송에 실패했습니다. 다시 시도해주세요' });
  }*/
})

module.exports = router
