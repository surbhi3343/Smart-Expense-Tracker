const num = 10;
const table = document.getElementById("TableSub");
function createRows(data = {}) {
    const {
        date = "",
        description = "",
        amount = "",
        balance = ""
    } = data;
    const tr = document.createElement("tr");
    const keys = ["date", "description", "amount", "balance"];
    keys.forEach(key => {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.value = data[key] || key;
        if(key === "amount") {
            input.addEventListener("blur",() => {
                calculateBalance();
                savetoLocalStorage();
            });
        }
        else {
            input.addEventListener("blur",savetoLocalStorage);
        }
        td.appendChild(input);
        tr.appendChild(td);
    });
    return tr;
}
function createEmptyRows () {
    for(let i = 0; i < num; i++) {
        table.appendChild(createRows());
    }
}
function calculateBalance() {
    let total = 0;
    let element = document.getElementById("totalvalue");
    const rows = table.querySelectorAll("tr");
    rows.forEach((tr,index) => {
        const amountInput = tr.children[2].querySelector("input");
        let amount = parseFloat(amountInput.value.trim());
        if(isNaN(amount)) amount = 0;
        total += amount;
        element.value = total.toFixed(2);
        console.log(total);
        console.log(element.value);
    });
}
function addExpense () {
    table.appendChild(createRows());
}
function cleartable() {
    localStorage.removeItem("key");
    table.innerHTML = "";
    createEmptyRows(); // Refill with blank rows
    document.getElementById("totalvalue").value = "";
}
function savetoLocalStorage () {
    const arr = [];
    table.querySelectorAll("tr").forEach(tr => {
        const data = {
            date:tr.children[0].querySelector("input").value.trim(),
            description:tr.children[1].querySelector("input").value.trim(),
            amount:tr.children[2].querySelector("input").value.trim(),
            balance:tr.children[3].querySelector("input").value.trim()
        };
        arr.push(data);
    })
    localStorage.setItem("key",JSON.stringify(arr));
}
function loadfromLocalStorage () {
    const arr = JSON.parse(localStorage.getItem("key") || "[]");
    table.innerHTML = "";
    if(arr.length === 0) {
        table.appendChild(createEmptyRows());
    }
    else {
        arr.forEach(data => {
            table.appendChild(createRows(data));
        })
    }
    calculateBalance();
}
window.onload = function () {
    loadfromLocalStorage();
}