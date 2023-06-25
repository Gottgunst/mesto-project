// ########################
// Получить ширину изображения
// ########################

export function sliceExt(input) {
  let ext = input.pathname;
  ext = ext.slice(ext.indexOf('_', 0),-1);
  return ext.slice(1, ext.indexOf('-',-1));
}

// ########################
// Генерация случайного id
// ########################

export function genId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substring(2);
  return dateString + randomness;
}
