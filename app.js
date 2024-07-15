const overlay=document.querySelector(".overlay");
const popForm=document.querySelector(".popup-call");
const showform=document.querySelector(".add-transaction-popup");
const closeBtns = document.querySelectorAll(".close-btn");
const form=document.querySelector("form");
const titleFill=document.querySelector("#title")
const amountFill=document.querySelector("#amount")
const income=document.querySelector("#income")
const expense=document.querySelector("#expense")
const transactionsContainer = document.querySelector(".transaction-cards");
const balanceNumber = document.querySelector(".balance-number");
const incomeNumber = document.querySelector(".income-number");
const expenseNumber = document.querySelector(".expense-number");

const transactions=JSON.parse(localStorage.getItem("transactions")) || []

console.log(transactions)


popForm.addEventListener("click",function(){
    console.log("btn clicked")
    showform.style.display="block";
    overlay.style.display="block";
});

closeBtns.forEach((btn)=>{
    close-btn.addEventListener("click",function(){
        showform.style.display="none";
        overlay.style.display="none";
    })   
})


form.addEventListener("submit", (e) => {
    // To prevent page reload
    e.preventDefault();
    
    const title=titleFill.value
    const amount=amountFill.value
    



   let type=""

if(income.checked === true){
    type=income.value
}
if(expense.checked === true){
    type=expense.value
}

const newData={
    title,
    amount:Number(amount),
    type
}
console.log(newData)
transactions.push( newData)
localStorage.setItem("transactions",JSON.stringify(transactions))


renderTransactions(transactions)
updateUi(transactions)
titleFill.value=""
amountFill.value=""

  });

  function renderTransactions(transactions){
    transactionsContainer.innerHTML="";
if(transactions?.length > 0){
transactions.forEach((transaction) =>{
    const transactionHtml=`
      <div class="card">
                    <div class="left-card">
                        <div class="icon">
  <i class='bx bx-down-arrow-alt${
     transaction.type === "income" ? "bx bx-up-arrow-alt" : "bx bx-down-arrow-alt"
                              }' ></i>
                        </div>
                        <div class="title">
                            ${transaction.title}
                        </div>
                    </div>
                    <div class="right-card">
                        <div class="number">
                            <p>$${transaction.amount}</p>
                        </div>
                        <div class="icons">
                            <i class='bx bx-edit green'></i>
                            <i class='bx bxs-trash red' ></i>
                        </div>
                    </div>
                </div>
    `;
    transactionsContainer.insertAdjacentHTML("beforeend", transactionHtml);
})
}else {
    transactionsContainer.innerHTML = "No Transactions";
  }

  }






renderTransactions(transactions)

function updateUi(transactions) {
    // seperate the expenses and incomes
    const expenses = transactions.filter(
      (transaction) => transaction.type === "expense"
    );
  
    const totalExpenses = expenses.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  
    const income = transactions.filter(
      (transaction) => transaction.type === "income"
    );
    console.log(income);
    const totalIncome = income.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
  
    const balance = totalIncome - totalExpenses;
    console.log(balance);
    balanceNumber.innerHTML = `$${balance}`;
    incomeNumber.innerHTML = `$${totalIncome}`;
    expenseNumber.innerHTML = `$${totalExpenses}`;
  }

  updateUi(transactions)
 