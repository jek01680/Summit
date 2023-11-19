document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');

    contactForm.addEventListener('input', function () {
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let phone = document.getElementById('phone').value;
        let message = document.getElementById('message').value;
    
        let isFormValid = name && email && phone && message;
    
        if (isFormValid) {
          submitButton.classList.remove('disabled');
        } else {
          submitButton.classList.add('disabled');
        }
      });
});

function sendMail(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('message').value;

    var mailContent = `
        <div style="font-family: 'Arial', sans-serif; color: #333;">
            <h2 style="color: #4F46E5;">문의자 정보</h2>
            <p><strong>이름(회사명):</strong> ${name}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>연락처:</strong> ${phone}</p>
            <h2 style="color: #4F46E5;">문의 내용</h2>
            <p>${message.replace(/\n/g, '<br>')}</p>
        </div>`;

    var json = {
        "mailContent": mailContent
    };

    fetch(`${window.location.origin}/sendMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(json)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert("메일이 발송되었습니다.\n적어주신 메일로 답변드리겠습니다.");
        
        // 입력 컨트롤 값을 초기화
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = '';
        document.getElementById('name').removeAttribute('disabled');
        document.getElementById('email').removeAttribute('disabled');
        document.getElementById('phone').removeAttribute('disabled');
        document.getElementById('message').removeAttribute('disabled');
        document.getElementById('submitButton').classList.add('disabled');
        document.getElementById('submitButton').classList.remove('d-none');
    })
    .catch(error => {
        alert('메일 전송에 실패했습니다. 다시 시도해주세요.'); // 에러 알림
    });
}
