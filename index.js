// Form
const form = document.getElementById('form')
// Inputs
const dateSelector = document.getElementById('date-selector')
const salaryInput = document.getElementById('salary')
// Outputs
const errors = document.getElementById('errors')
const result = document.getElementById('result')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const date = dateSelector.value
  if (date === '') {
    errors.innerHTML = 'La fecha es requerida'
    errors.style.display = 'block'
    result.style.display = 'none'
    return
  }

  const salary = salaryInput.value
  if (salary === '') {
    errors.innerHTML = 'El salario es requerido'
    errors.style.display = 'block'
    result.style.display = 'none'
    return
  }

  const url = `https://api.bluelytics.com.ar/v2/historical?day=${date}`

  try {
    const data = await fetch(url);
    const response = await data.json();

    if (response.error) {
      errors.innerHTML = response.error;
      errors.style.display = 'block'
      result.style.display = 'none'
      return
    }

    const dollarValue = response.blue.value_avg
    const salaryInDollars = (salary / dollarValue).toFixed(2)
    errors.style.display = 'none'

    result.innerHTML = 'Ganabas: U$D ' + salaryInDollars
    result.style.display = 'block'
  } catch (error) {
    errors.innerHTML = 'Error al obtener el valor del dolar'
    errors.style.display = 'block'
    result.style.display = 'none'

    console.log(error)
  }
})