// ########################
// Проверка на одни пробелы
// ########################

export function checkSpace(input) {
  return input.replace(/\s/g, '').length ? input : input = 'Безымянный';
}
