const $ = (selector) => document.querySelector(selector);

// 메뉴 버튼
//열기
$(".menu-open-btn").addEventListener('click', () => {
  document.body.classList.add("non-scroll");
  $(".gnb").classList.add("opened");
  $(".menu-close-btn").classList.add("opened");
  $("#backdrop").style.display = 'block';
  document.body.classList.add("non-scroll");
});
//닫기
$('.menu-close-btn').addEventListener('click', () => {
  $("#backdrop").style.display = 'none';
  $(".gnb").classList.remove("opened");
  $(".menu-close-btn").classList.remove("opened");
  document.body.classList.remove("non-scroll");
});


function App() {
  const data = [];
  const userData = {};
  const groupData = {};

  data.push({
    "role": "system",
    "content": "핏루틴은 운동 전문가다."
  });

  const OPENAPI_URL = 'https://estsoft-openai-api.jejucodingcamp.workers.dev/';

  function OpenApi() {
    // console.log("실행중");
    fetch(OPENAPI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    })
      .then(res => res.json())
      .then(res => {
        let content = res.choices[0].message.content;
        console.log(content);
        $('.chat-screen').innerHTML += `
          <div class="ai-chat">
            <div class="chat-content">
              <pre>${content}</pre>
            </div>
          </div>
        `
      });
  }

  $('#chat-submit-btn').addEventListener('click', e => {
    e.preventDefault();

    const chatScreen = $('.chat-screen');
    const chatInput = $('#chat-input');

    if (chatInput.value.trim().length > 0) {
      chatScreen.innerHTML += `
      <div class="user-chat">
        <div class="chat-content">
          ${chatInput.value}
        </div>
      </div>
      `
    } else {
      alert("채팅 내용을 입력해 주세요")
    }

    data.push({
      "role": "user",
      "content": chatInput.value + ". 결과는 100자로 작성해"
    });

    chatInput.value = "";
    chatInput.focus();

    OpenApi();
  });

}

App();