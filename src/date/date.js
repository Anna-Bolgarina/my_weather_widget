const days = {
  0: "Воскресенье",
  1: "Понедельник",
  2: "Вторник",
  3: "Среда",
  4: "Четверг",
  5: "Пятница",
  6: "Суббота",
};
const monthes = {
  0: "Января ",
  1: "Февраля ",
  2: "Марта ",
  3: "Апреля ",
  4: "Майя ",
  5: "Июня ",
  6: "Июля ",
  7: "Августа ",
  8: "Сентября ",
  9: "Октября ",
  10: "Ноября ",
  11: "Декабря ",
};

function formatDate() {
  const date = new Date();

  return `
    ${days[date.getDay()]} - 
   ${date.getDate()} ${
    monthes[date.getMonth()]
  } ${date.getFullYear()} года -  ${date.getHours()}:${
    (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
  } мск
    `;
}

function formatAfterDate(sec) {
  const milSec = sec * 1000;
  const date = new Date(milSec);
  const day = date.getDay();
  const afterDate = date.getDate();
  const month = date.getMonth();

  return `${days[day]} - ${afterDate} ${
    monthes[month]
  } ${date.getFullYear()} года`;
}
export { formatDate, formatAfterDate };
