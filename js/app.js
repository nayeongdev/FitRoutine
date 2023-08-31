const $ = (selector) => document.querySelector(selector);

function App() {
  let data = [];

  data.push({
    "role": "system",
    "content": "assistant는 운동 전문가이다."
  });

  const OPENAPI_URL = 'https://estsoft-openai-api.jejucodingcamp.workers.dev/';

  $('button').addEventListener('click', e => {
    e.preventDefault();
    // const goal = $('#goal').value;
    console.log(goal);
    data.push({
      "role": "user",
      "content": "운동목표 :" + goal
    })
    $('#goal').value = "";
    OpenApi();
  });

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

}

App();