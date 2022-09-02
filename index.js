function saveToLocalStorage(event){
    event.preventDefault();
    const expenseAmount = event.target.expenseamount.value;
    const description = event.target.descriptionId.value;
    const category = event.target.category.value;
    const myObj ={
        expenseAmount,
        description,
        category,
    }
    localStorage.setItem(myObj.description , JSON.stringify(myObj));
    showNewExpenseOnScreen(myObj)
} 
window.addEventListener("DOMContentLoaded", () =>{
    const localStorageObj = localStorage;
    const localStorageKeys = Object.keys(localStorageObj)
    for(var i=0; i<localStorageKeys.length; i++){
        const key =localStorageKeys[i];
        const expenseDetailsString= localStorageObj[key];
        const expenseDetailsObj= JSON.parse(expenseDetailsString);
        showNewExpenseOnScreen(expenseDetailsObj);
    }
})

function showNewExpenseOnScreen(expense){
    document.getElementById('description').value="";
    document.getElementById('expenseamount').value="";
    document.getElementById('category').value=" ";

   
    if(localStorage.getItem(expense.description)!== null){
        removeExpenseFromScreen(expense.description);
    }
    const parentNode= document.getElementById('listOfExpense');
    const childHTML = `<li id=${expense.description}> ${expense.expenseAmount}  -  ${expense.description}  -  ${expense.category}
                        <button onclick=deleteExpense('${expense.description}')>Delete Expense</button>
                        <button onclick=editExpense('${expense.description}','${expense.expenseAmount}','${expense.category}')>Edit Expense</button>
                       </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}


//edit user 
function editExpense(descriptionId , expenseAmount , category){
    document.getElementById('description').value=descriptionId;
    document.getElementById('expenseamount').value=expenseAmount;
    document.getElementById('category').value=category;

    deleteExpense(descriptionId);
    
}

//delete user 
function deleteExpense(descriptionId){
    console.log(descriptionId);
    localStorage.removeItem(descriptionId);
    removeExpenseFromScreen(descriptionId);
}
function removeExpenseFromScreen(descriptionId){
    const parentNode = document.getElementById('listOfExpense');
    const childNodeToBeDeleted= document.getElementById(descriptionId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
    }
}
