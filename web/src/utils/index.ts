// Função para comparar arrays
export function arraysEqual(arr1: any[], arr2: any[]) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}
