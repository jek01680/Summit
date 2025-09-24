document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // 음수 방지
  }, false);
});

function sendMail(event) {
    event.preventDefault();

    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let message = document.getElementById('message').value.trim();
    let submitButton = document.getElementById('submitButton');

    if (!name || !email || !phone || !message) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

    // 버튼 비활성화 (중복 클릭 방지)
    submitButton.disabled = true;
    submitButton.innerText = "전송 중...";

    // HTML 이메일 본문
    let mailContent = `
        <div style="font-family: 'Arial', sans-serif; color: #333;">
            <h2 style="color: #4F46E5;">문의자 정보</h2>
            <p><strong>이름(회사명):</strong> ${name}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>연락처:</strong> ${phone}</p>
            <h2 style="color: #4F46E5;">문의 내용</h2>
            <p>${message.replace(/\n/g, '<br>')}</p>
        </div>`;

    // 서버로 보낼 데이터
    var json = { name, email, phone, message, mailContent };

    fetch(`${window.location.origin}/sendMail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json'
        },
        body: JSON.stringify(json)
    })
    .then(response => {
        if (!response.ok) throw new Error('서버 응답 오류');
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert("메일이 발송되었습니다.\n적어주신 메일로 답변드리겠습니다.");
            document.getElementById('contactForm').reset(); // 폼 전체 초기화
        } else {
            alert("메일 전송 실패: " + data.message);
        }
        submitButton.disabled = false;
        submitButton.innerText = "제출하기";
    })
    .catch(error => {
        alert('메일 전송에 실패했습니다. 다시 시도해주세요.\n' + error.message);
        submitButton.disabled = false;
        submitButton.innerText = "제출하기";
    });
}