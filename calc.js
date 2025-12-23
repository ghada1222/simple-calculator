const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyContent = key.textContent
    const displayedNum = display.textContent

    // Nombre
    if (!action) {
      if (displayedNum === '0' || calculator.dataset.previousKeyType === 'operator') {
        display.textContent = keyContent
      } else {
        display.textContent = displayedNum + keyContent
      }
      calculator.dataset.previousKeyType = 'number'
    }

    // Décimal
    if (action === 'decimal') {
      display.textContent = displayedNum + '.'
      calculator.dataset.previousKeyType = 'decimal'
    }

    // Opérateurs
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
      key.classList.add('is-depressed')

      calculator.dataset.firstvalue = displayedNum
      calculator.dataset.operator = action
      calculator.dataset.previousKeyType = 'operator'
    }

    // Clear
    if (action === 'clear') {
      display.textContent = '0'
      calculator.dataset.previousKeyType = 'clear'
    }

    // Egal
    if (action === 'calculate') {
      const firstValue = calculator.dataset.firstvalue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      display.textContent = calculate(firstValue, operator, secondValue)
      calculator.dataset.previousKeyType = 'calculate'
    }
  }
})

const calculate = (n1, operator, n2) => {
  let result = ''
  if (operator === 'add') {
    result = parseFloat(n1) + parseFloat(n2)
  } else if (operator === 'subtract') {
    result = parseFloat(n1) - parseFloat(n2)
  } else if (operator === 'multiply') {
    result = parseFloat(n1) * parseFloat(n2)
  } else if (operator === 'divide') {
    result = parseFloat(n1) / parseFloat(n2)
  }
  return result
}
