
//parent element to store cards
const taskContainer = document.querySelector(" .task__container");


//global store using array
let globalStore = [];


const newCard = ({id, imageUrl, taskTitle, taskType, taskDescription,}) => 
` <div class="col-md-6 col-lg-4" id=${id}>
<div class="card text-center">
  <div class="card-header d-flex justify-content-end gap-2">
  <button type="button" id=${id} class="btn btn-outline-success" onclick="editCard.apply(this, arguments)">
  <i class="fas fa-pencil-alt" id=${id} onclick="editCard.apply(this, arguments)" ></i>
</button>
<button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments)">
  <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this, arguments)"></i>
</button>
  </div>
  <img src=${imageUrl} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" id=${id} class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`;

//function to get the data back from local storage...
const loadInitialTaskCards = () => {
    
    
    // access local storage
const getInitialData = localStorage.getItem("tasky");
if (!getInitialData) return;

    // converty stringified object to object
const {cards} = JSON.parse(getInitialData);


    // map around the array to generate html card and inject it to dom
cards.map((cardObject) => {
    const createNewCard = newCard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(cardObject);
});

};

const updateLocalStorage = () => localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));


const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,   //unique no for card id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,

    };


    //html code

    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);

    globalStore.push(taskData);

    //add to localstorage

// now access local storage with API (application programming interface)  
// local storage -> interface -> programming
updateLocalStorage();

};

// delete modal feature

const deleteCard = (event) => {

    //id
event = window.event;
const targetID = event.target.id;
const tagname = event.target.tagName;    //Buttons


    //search the global storage, remove the object with that id
    globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID); 
    updateLocalStorage();

    //access dom to remove 
if(tagname === "BUTTON"){

    //task_container

    return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode
    );
}
//task container
return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
);
};








/*   issue
1 the modal was not closing after adding mew card      -------resolved using bootstrap code "data-bs-dismiss"modal""
2 the cards were deleted after refreshing   -> store in local storage of browser - its 5-mb space only
*/

/* featutes
1 delete modal feature
2 open task
3 edit task 
*/