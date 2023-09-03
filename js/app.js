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
  let data = [];

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
        console.log(res.choices[0].message.content);
        $('.answer').innerHTML = `<p>${res.choices[0].message.content}</p>`;
      });
  }

  // form태그가 자동으로 전송되는걸 막아준다. (ENTER키를 눌렀을 때 새로고침 되는걸 막아준다.)
  $('#peronal-info-submit-btn').addEventListener('click', e => {
    e.preventDefault();
    console.log("실행중");
    const goal = $('#user-goal');
    const age = $('#user-age');
    const gender = $('input[name ="user-gender"]:checked');
    const height = $('#user-height');
    const weight = $('#user-weight');
    const place = $('#user-place');
    const preferredActivity = $('input[name ="user-preferred-activity"]:checked');
    const focusOnPart = $('#focus-on-body-part');
    const level = $('#user-level');
    const exerciseTime = $('#user-exercise-time');

    data.push({
      "role": "user",
      "content": `
      아래 정보로 개인 맞춤형 운동 루틴을 계획해줘.
      ${goal.innerText} : ${goal.value}
      ${gender.innerText} : ${gender.value}
      ${age.innerText} : ${age.value}살
      ${height.innerText} : ${height.value}cm
      ${weight.innerText} : ${weight.value}kg
      ${level.innerText} : ${level.value}
      ${place.innerText} : ${place.value}
      ${preferredActivity.innerText} : ${preferredActivity.value}
      ${focusOnPart.innerText} : ${focusOnPart.value}
      ${exerciseTime.innerText} : ${exerciseTime.value}
      `
    });

    goal.value = "";
    age.value = "";
    gender.value = "";
    height.value = "";
    weight.value = "";
    level.value = "";
    place.value = "";
    preferredActivity.value = "";
    focusOnPart.value = "";
    exerciseTime.value = "";

    OpenApi();
  });


  $('#group-info-submit-btn').addEventListener('click', e => {
    e.preventDefault();
    console.log("실행중");
    const participantsNum = $('#participants-num');
    const gender = $('input[name ="group-gender"]:checked');
    const goal = $('#group-goal');
    const level = $('#group-level');
    const place = $('#group-place');
    const preferredActivity = $('#group-preferred-activity');
    const exerciseTime = $('#group-exercise-time');

    data.push({
      "role": "user",
      "content": `
      아래 정보로 그룹 맞춤형 운동 루틴을 계획해줘.
      ${participantsNum.innerText} : ${participantsNum.value}명
      ${gender.innerText} : ${gender.value}
      ${goal.innerText} : ${goal.value}
      ${level.innerText} : ${level.value}
      ${place.innerText} : ${place.value}
      ${preferredActivity.innerText} : ${preferredActivity.value}
      ${exerciseTime.innerText} : ${exerciseTime.value}
      `
    });

    participantsNum.value = "";
    gender.value = "";
    goal.value = "";
    level.value = "";
    place.value = "";
    preferredActivity.value = "";
    exerciseTime.value = "";

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