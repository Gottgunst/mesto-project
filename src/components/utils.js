// ########################
// Получить ширину изображения
// ########################

export function sliceExt(input) {
  let ext = input.pathname;
  ext = ext.slice(ext.indexOf('_', 0),-1);
  return ext.slice(1, ext.indexOf('-',-1));
}
