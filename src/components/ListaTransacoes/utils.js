export function orderColumnAsc(a, b, by) {
  if (by === 'date') {
    return new Date(a.data) - new Date(b.data);
  }

  if (by === 'value') {
    return a.valor - b.valor
  }
}

export function orderColumnDesc(a, b, by) {
  if (by === 'date') {
    return new Date(b.data) - new Date(a.data);
  }

  if (by === 'value') {
    return b.valor - a.valor
  }
}