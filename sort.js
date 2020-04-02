function sort(selectOrder) {
  let order = ''
  switch (selectOrder) {
    case 'dateAsc':
      order = [['date', 'ASC']]
      break
    case 'dateDesc':
      order = [['date', 'DESC']]
      break
    case 'amountDesc':
      order = [['amount', 'DESC']]
      break
    case 'amountAsc':
      order = [['amount', 'ASC']]
      break
    default:
      break
  }
  return order
}
module.exports = sort