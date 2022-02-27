//Todo Eleman ekleme

//eleman seçimi

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;



//load items
loadItems();
eventListeners();



function eventListeners (){
//submit Event
    form.addEventListener("submit", addNewItem)

//delete Event
    taskList.addEventListener("click",deleteItem);
//delete al event

    btnDeleteAll.addEventListener("click",deleteAllItems);
}


function loadItems(){

    todos = getItemsFromLs();
    todos.forEach(function(item){
        createItem(item);
    })



}

//get items From Local storage
function getItemsFromLs (){

    if(localStorage.getItem("todos")=== null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
// set item to local storage
function setItemToLS(newTodo){
    todos = getItemsFromLs();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}









function createItem(newTodo){
           //li oluşturma
           const li = document.createElement("li");
           li.className = "list-group-item list-group-item-secondary";
           li.appendChild(document.createTextNode(newTodo));
           
           //a Oluşturma
       
           const a = document.createElement("a");
           a.setAttribute("href","#");
           a.classList = "delete-item float-right";
           a.innerHTML='<i class="fas fa-times"></i>';
           
           li.appendChild(a);
           taskList.appendChild(li);
}


function addNewItem(e){


    if(input.value ===''){
        alert("Add New Item");

    }else{ 
        createItem(input.value);
        setItemToLS(input.value);
        input.value = "";
    }
e.preventDefault();
}


function deleteItem (e){

  
        if (e.target.className === "fas fa-times"){
            if(confirm("Silmek istediğinize emin misiniz?")){
                e.target.parentElement.parentElement.remove();
                deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
                  }
                     }
    
 e.preventDefault()
}

function deleteTodoFromStorage(deletetodo){

    let todos = getItemsFromLs();

    todos.forEach(function(todo,index){

        if(todo === deletetodo){
            todos.splice(index,1);
        }




    });
    localStorage.setItem("todos",JSON.stringify(todos));


}

//tüm herşeyi silme
function deleteAllItems (e){

    /*Daha basit ve kullanışlı olan şekil de aşağıda belirtilmiştir. */
 if(confirm("Tüm herşeyi silmek istediğinize eminmisiniz?")){
   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }
   localStorage.clear();
 }


    /*Daha Farklı bir silme yöntemi */
//  if(confirm("Tüm Elemanları Silmek İstediğinize Emin Misiniz?")){

//     taskList.childNodes.forEach(function(item){
//     if(item.nodeType === 1){
//         item.remove();
//      }
//    })

// }



}

