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
  const groupData = {};

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

        localStorage.setItem("result", JSON.stringify(content));

        location.href = "../result.html";
      });
  }


  $('#group-info-submit-btn').addEventListener('click', e => {
    e.preventDefault();

    const participantsNum = $('#participants-num');
    const gender = $('input[name ="group-gender"]:checked');
    const goal = $('#group-goal');
    const level = $('#group-level');
    const place = $('#group-place');
    const preferredActivity = $('#group-preferred-activity');
    const exerciseTime = $('#group-exercise-time');

    groupData.participantsNum = participantsNum.value + "명";
    groupData.gender = gender.value;
    groupData.goal = goal.value;
    groupData.level = level.value;
    groupData.place = place.value;
    groupData.preferredActivity = preferredActivity.value;
    groupData.exerciseTime = exerciseTime.value + "분";


    let groupDataContent = strDataContent(groupData);
    console.log(groupDataContent);

    data.push({
      "role": "user",
      "content": `
      아래 정보로 그룹 맞춤형 운동 루틴을 계획해줘.
      ${groupDataContent}
      `
    });

    OpenApi();
  });

  $('.prev-btn').addEventListener('click', () => {
    history.back()
  });
}

App();