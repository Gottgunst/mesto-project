// ########################
// Проверка на одни пробелы
// ########################

export function checkSpace(input) {
  return input.replace(/\s/g, '').length ? input : input = 'Безымянный';
}


// ########################
// Убрать расширение файла расширение файла
// ########################

export function sliceExt(input) {
  return input.slice(0, input.indexOf('.',-1));
}
