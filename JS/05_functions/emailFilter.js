let whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru'];
let blackList = ['jsfunc@mail.ru','goodday@day.ru'];

function emailFilter(whiteList = [], blackList = []) {
  let resultArray = [];

  for (let i = 0; i < whiteList.length; ++i) {
    if (!blackList.includes(whiteList[i])) {
      resultArray.push(whiteList[i]);
    }
  }

  return resultArray;
}

console.log(emailFilter(whiteList, blackList));
