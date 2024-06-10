let password = "1234-";
// let password = "4321-";
// let password = "qaz-xsw";
// let password = "_zxd";
// let password = "_-a";
// let password = "qaz";
// let password = "_-3";
// let password = "123456789";

if (password.length >= 4 && (password.includes("-") || password.includes("_"))) {
  console.log("Пароль надёжный");
}
else {
  console.log("Пароль ненадёжный");
}
