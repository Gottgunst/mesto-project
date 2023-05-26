// ########################
// Проверка на одни пробелы
// ########################

export function checkSpace(input) {
  return input.replace(/\s/g, '').length ? input : input = 'Безымянный';
}


// ########################
// Получить ширину изображения
// ########################

export function sliceExt(input) {
  let ext = input.pathname;
  ext = ext.slice(ext.indexOf('_', 0),-1);
  return ext.slice(1, ext.indexOf('-',-1));
}
