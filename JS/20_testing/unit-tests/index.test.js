import {
  validationNumberCard,
  validationCvvCard,
  createForm,
} from "./src/index";

test("Валидация номера карты пропускает корректный номер карты", () => {
  expect(validationNumberCard("2202200223948454")).toBe(true);
});
test("Валидация номера карты не пропускает произвольную строку", () => {
  expect(validationNumberCard("2202q002ш3948,54")).toBe(false);
});
test("Валидация номера карты не пропускает строку с недостаточным количеством цифр", () => {
  expect(validationNumberCard("2202054")).toBe(false);
});
test("Валидация номера карты не пропускает строку со слишком большим количеством цифр", () => {
  expect(validationNumberCard("1234567890123456789012345")).toBe(false);
});

test("Валидация CVV/CVC пропускает строку с тремя цифровыми символами", () => {
  expect(validationCvvCard("154")).toBe(true);
});
test("Валидация CVV/CVC не пропускает строки с 1 цифровым символом", () => {
  expect(validationCvvCard("1")).toBe(false);
});
test("Валидация CVV/CVC не пропускает строки с 2 цифровыми символами", () => {
  expect(validationCvvCard("12")).toBe(false);
});
test("Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами", () => {
  expect(validationCvvCard("1234")).toBe(false);
});
test("Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами", () => {
  expect(validationCvvCard("qwe")).toBe(false);
});

test("Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля для ввода", () => {
  expect(createForm().outerHTML).toBe(
    '<form><input placeholder="Номер карты"><input placeholder="ММ/ГГ"><input placeholder="CVV/CVC"><input placeholder="Email"></form>'
  );
});
