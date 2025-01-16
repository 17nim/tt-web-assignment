window.onload = async () => {
    try {
        console.log('Hello, world!')
        let response = await axios.get('http://localhost:8000/usersdb')
        let usersData = response.data
        console.log(usersData)

        let masterTable = new DataTable('#master', {
            stateSave: true,
            columnDefs: [{ width: '1%', targets: 0 }],
            columns: [
                { title: 'Operation' },
                { title: 'HN เจ้าของ' },
                { title: 'ชื่อเจ้าของ' },
                { title: 'เบอร์ติดต่อ' },
                { title: 'อีเมล' }
            ],
            data: convertToArray(usersData)
        })
    } catch (error) {
        console.error('Error fetching users:', error.message)
    }
}

// Convert to an array of json for inserting data to DataTable
function convertToArray(jsonData) {
    let resultArray = []
    for (let i = 0; i < jsonData.length; i++) {
        let operationButton = '<td><button class="operation-button" onclick="openDetailPage(' + jsonData[i]['hn'] + ')" data-hn="' + jsonData[i]['hn'] + '"><span class="material-symbols-outlined">edit_document</span></button></td>'
        let hn = String(jsonData[i]['hn']).padStart(6, '0')
        let name = '<a href="#" onclick="openDetailPage(' + jsonData[i]['hn'] + ')">' + jsonData[i]['first_name'] + ' ' + jsonData[i]['last_name'] + '</a>'
        let phoneNumber = jsonData[i]['phone_number']
        let email = jsonData[i]['email']
        resultArray.push([operationButton, hn, name, phoneNumber, email])
    }
    return resultArray
}

function openDetailPage(hn) {
    let detail_page = "detail-page.html?hn=" + hn
    window.open(detail_page, "_blank")
}