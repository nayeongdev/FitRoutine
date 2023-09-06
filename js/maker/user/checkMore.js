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

// 객체에있는 값들을 문자열로 바꿔주는 함수
function strDataContent(datas) {
  let dataContent = ''
  for (let key in datas) {
    if (datas.hasOwnProperty(key)) {
      dataContent += `${key} : ${datas[key]}\n`;
    }
  }
  return dataContent;
}

function App() {
  const data = [];
  const userData = {};

  data.push({
    "role": "system",
    "content": "핏루틴은 운동 전문가다."
  });

  const OPENAPI_URL = 'https://estsoft-openai-api.jejucodingcamp.workers.dev/';

  function OpenApi() {
    console.log("실행중");
    $('#backdrop').style.display = "block";
    
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
        location.href = "../result.html";
      });
  }

  $('#personal-info-submit-btn').addEventListener('click', e => {
    e.preventDefault();

    const level = $('#user-level');
    const place = $('#user-place');
    const preferredActivity = $('input[name ="user-preferred-activity"]:checked');
    const focusOnPart = $('#focus-on-body-part');
    const exerciseTime = $('#user-exercise-time');

    userData.level = level.value;
    userData.place = place.value;
    userData.preferredActivity = preferredActivity.value;
    userData.focusOnPart = focusOnPart.value;
    userData.exerciseTime = exerciseTime.value + "분";

    let userDataContent = strDataContent(userData);

    data.push({
      "role": "user",
      "content": `
      아래 정보로 개인 맞춤형 운동 루틴을 계획해줘.
      ${userDataContent}
      `
    });

    OpenApi();
  });

  $('.prev-btn').addEventListener('click', () => {
    history.back()
  });
}

App();