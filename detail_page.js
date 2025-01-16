window.onload = async () => {
    try {
        let urlParams = new URLSearchParams(window.location.search)
        let hn = urlParams.get('hn')
        console.log(hn)

        let response = await axios.get(`http://localhost:8000/usersdb/${hn}`)
        let userData = response.data
        await loadUserData(userData)
        console.log(userData)
    } catch (error) {
        console.error('Error fetching users:', error.message)
    }
}

function backToIndex() {
    if (window.opener) {
        window.opener.location.reload();    // Reload the parent tab
        window.close(); // Close the current tab
    } else {
        alert("Unable to find the parent tab. Please manually return.");
    }
}

async function addUser() {
    try {
        let firstNameDOM = document.getElementById('first-name')
        let lastNameDOM = document.getElementById('last-name')
        let phoneNumberDOM = document.getElementById('phone-number')
        let emailDOM = document.getElementById('email')

        let userData = {
            first_name: firstNameDOM.value,
            last_name: lastNameDOM.value,
            phone_number: phoneNumberDOM.value,
            email: emailDOM.value
        }
        if (checkInvalidField(userData)) {
            await axios.post(`http://localhost:8000/usersdb`, userData)
            backToIndex()
        }
    } catch (error) {
        console.error('Error adding users:', error.message)
    }
}

async function saveUserData() {
    try {
        let hnDOM = document.getElementById('hn')
        let firstNameDOM = document.getElementById('first-name')
        let lastNameDOM = document.getElementById('last-name')
        let phoneNumberDOM = document.getElementById('phone-number')
        let emailDOM = document.getElementById('email')

        let userData = {
            hn: parseInt(hnDOM.value),
            first_name: firstNameDOM.value,
            last_name: lastNameDOM.value,
            phone_number: phoneNumberDOM.value,
            email: emailDOM.value
        }
        if (checkInvalidField(userData)) {
            await axios.delete(`http://localhost:8000/usersdb/${hnDOM.value}`)
            await axios.post(`http://localhost:8000/usersdb`, userData)
            backToIndex()
        }
    } catch (error) {
        console.error('Error adding users:', error.message)
    }
}

async function deleteUser() {
    try {
        let urlParams = new URLSearchParams(window.location.search)
        let hn = urlParams.get('hn')
        console.log(hn)
        await axios.delete(`http://localhost:8000/usersdb/${hn}`)
        backToIndex()
    } catch (error) {
        console.error('Error deleting users:', error.message)
    }
}

function checkInvalidField(userData) {
    if (userData.first_name == '') {
        alert('Please enter a first name.')
        return false
    }
    if (userData.last_name == '') {
        alert('Please enter a last name.')
        return false
    }
    if (userData.phone_number == '' || userData.phone_number.length > 15) {
        alert('Please enter a valid phone number.')
        return false
    }
    if (userData.email == '') {
        alert('Please enter an email.')
        return false
    }
    const digitRegex = /^[0-9]+$/;
    if (!digitRegex.test(userData.phone_number)) {
        alert('Please enter a valid phone number.')
        return false
    }
    return true
}

function loadUserData(user) {
    let hnDOM = document.getElementById('hn')
    let firstNameDOM = document.getElementById('first-name')
    let lastNameDOM = document.getElementById('last-name')
    let phoneNumberDOM = document.getElementById('phone-number')
    let emailDOM = document.getElementById('email')

    hnDOM.value = user.hn
    firstNameDOM.value = user.first_name
    lastNameDOM.value = user.last_name
    phoneNumberDOM.value = user.phone_number
    emailDOM.value = user.email
}