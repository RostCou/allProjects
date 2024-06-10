let userName = "РосТИслаВ";
let userSurname = "СавиЧ";

let firstChar = userName.substring(0, 1);
let lastChars = userName.substring(1);

let finalName = firstChar.toUpperCase() + lastChars.toLowerCase();

firstChar = userSurname.substring(0, 1);
lastChars = userSurname.substring(1);

let finalSurname = firstChar.toUpperCase() + lastChars.toLowerCase();

console.log(finalName)

let result = userName === finalName ? "Имя осталось без изменений" : "Имя было преобразовано";

console.log(result)

console.log(finalSurname)

result = userSurname === finalSurname ? "Фамилия осталась без изменений" : "Фамилия была преобразована";

console.log(result)
