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
    "content": "assistant는 운동 전문가다."
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
        // console.log(content);
        $('.answer').innerHTML = `<p>${content}</p>`;
      });
  }

  $('#peronal-info-btn').addEventListener('click', e => {
    e.preventDefault();
    const goal = $('#user-goal');
    const age = $('#user-age');
    const gender = $('input[name ="user-gender"]:checked');
    const height = $('#user-height');
    const weight = $('#user-weight');

    userData.goal = goal.value;
    userData.age = age.value + "살";
    userData.gender = gender.value;
    userData.height = height.value + "cm";
    userData.weight = weight.value + "kg";
  });

  // form태그가 자동으로 전송되는걸 막아준다. (ENTER키를 눌렀을 때 새로고침 되는걸 막아준다.)
  $('#peronal-info-submit-btn').addEventListener('click', e => {
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

    // console.log(userData);

    let userDataContent = ''
    for (let key in userData) {
      if (userData.hasOwnProperty(key)) {
        userDataContent += `${key} : ${userData[key]}\n`;
      }
    }
    // console.log(userDataContent);

    data.push({
      "role": "user",
      "content": `
      아래 정보로 개인 맞춤형 운동 루틴을 계획해줘.
      ${userDataContent}
      `
    });

    OpenApi();
  });


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

    let groupDataContent = ''
    for (let key in groupData) {
      if (groupData.hasOwnProperty(key)) {
        groupDataContent += `${key} : ${groupData[key]}\n`;
      }
    }
    console.log(groupDataContent);

    data.push({
      "role": "user",
      "content": `
      아래 정보로 개인 맞춤형 운동 루틴을 계획해줘.
      ${groupDataContent}
      `
    });

    OpenApi();
  });

  $('#chat-submit-btn').addEventListener('click', e => {
    e.preventDefault();
    console.log("실행중");

    let chatInput = $('#chat-input').value;

    data.push({
      "role": "user",
      "content": chatInput
    });

    chatInput = "";

    OpenApi();
  });

}

App();