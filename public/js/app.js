const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageTwo.textContent = "Anan"

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Getting Weather Info...'
    messageTwo.textContent = ''

    fetch('/weather/?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error//console.log(data.error)
            }
            messageOne.textContent = data.name
            messageTwo.textContent = data.data
        })
    })
})