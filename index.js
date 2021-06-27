
//parent element to store cards
const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);

//global store using array
const globalStore = [];


const newCard = ({id, imageUrl, taskTitle, taskType, taskDescription,}) => 
` <div class="col-md-6 col-lg-4" id=${id}>
<div class="card text-center">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
<button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
  </div>
  <img src=${imageUrl} class="card-img-top" alt="card image">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <h5><span class="badge bg-primary">${taskType}</span></h5>

  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
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


const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,   //unique no for card id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value,

    };

    const createNewCard = newCard(taskData);

    taskContainer.insertAdjacentHTML("beforeend", createNewCard);

    globalStore.push(taskData);
    console.log(globalStore);


// now access local storage with API (application programming interface)  
// local storage -> interface -> programming
 
localStorage.setItem("tasky", JSON.stringify({cards: globalStore}));

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