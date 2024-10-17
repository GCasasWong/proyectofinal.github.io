class Activity {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.imgUrl = obj.imgUrl;
  }
}

class Repository {
  constructor() {
    this.activities = [];
    this.id = 0;
  }

  getAllActivities() {
    return this.activities;
  }

  createActivity(activityObj) {
    let myActivity = new Activity(activityObj);
    myActivity.id = this.id;
    this.activities.push(myActivity);
    this.id++;
  }

  deleteActivity(activityId) {
    this.activities = this.activities.filter(
      (activity) => activity.id !== activityId
    );
    renderRepository();
  }
}

const repository = new Repository();

function activityToHTML(activity) {
  let { id, title, description, imgUrl } = activity;

  const cardContainer = document.createElement("div");
  const cardTitle = document.createElement("p");
  const cardImg = document.createElement("img");
  const cardDescription = document.createElement("p");
  const deleteButton = document.createElement("button");

  cardTitle.innerText = title;
  cardImg.src = imgUrl;
  cardDescription.innerText = description;

  cardTitle.classList.add("textTitle");

  deleteButton.classList.add("delete");

  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => repository.deleteActivity(id));

  cardContainer.append(cardTitle, cardImg, cardDescription, deleteButton);

  cardContainer.classList.add("imagenesNew");

  return cardContainer;
}

function renderRepository() {
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  const activities = repository.getAllActivities();
  const activitiesHTML = activities.map((activity) => activityToHTML(activity));

  activitiesHTML.forEach((activity) => cardContainer.append(activity));
}

const handler = () => {
  const titleInput = document.getElementById("activityTitle");
  const titleDescription = document.getElementById("activityDescription");
  const titleImgUrl = document.getElementById("activityimgUrl");
  const noActivityMessage = document.getElementById("noActivityMessage");

  const titleValue = titleInput.value.trim();
  const descriptionValue = titleDescription.value.trim();
  const imgUrlValue = titleImgUrl.value.trim();

  if (!titleValue || !descriptionValue || !imgUrlValue) {
    alert("Debes llenar todos los campos");
  } else {
    const activityObj = {
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
    };

    repository.createActivity(activityObj);
    renderRepository();
    noActivityMessage.style.display = "none";
    titleInput.value = "";
    titleDescription.value = "";
    titleImgUrl.value = "";
  }
};

const sendActivityButton = document.getElementById("sendActivityButton");
sendActivityButton.addEventListener("click", handler);
