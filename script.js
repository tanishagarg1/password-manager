function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += "*"
    }
    return str
}

function copyText(txt){
    navigator.clipboard.writeText(txt)
}

const deletePassword = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully Deleted ${website}'s password`)
    showPasswords()

}

const showPasswords = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show"
    }
    else {
        tb.innerHTML = `<tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
</tr>`
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
         <td>${element.website} <img src="copy.svg" alt="Copy" onclick="copyText('${element.website}')" style="cursor: pointer;">
         </td>
         <td>${element.username}<img src="copy.svg" alt="Copy" onclick="copyText('${element.username}')" style="cursor: pointer;">
         </td>
         <td>${maskPassword(element.password)}<img src="copy.svg" alt="Copy" onclick="copyText('${element.password}')" style="cursor: pointer;">
         </td>
         <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
    </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ""
    username.value = ""
    password.value = ""
}

console.log("working")
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("clicked...")
    console.log(username.value, password.value)
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})
