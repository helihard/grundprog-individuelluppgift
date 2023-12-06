import { newPostTitle, newPostBody, newPostTags, formInactive } from "./form-logic.js";

//skapar åtkomst till element i html-filen
const postForm = document.querySelector("#create-new-post");
const newPostsDiv = document.querySelector("#new-posts-div");

//skapar en klass för nya inlägg
class Post {
  constructor(title, body, tags) {
    this.title = title;
    this.body = body;
    this.tags = tags;
  }
}

//skriver ut nytt inlägg
function printNewPost(post) {
  const newArticle = document.createElement("article");
  const newTitle = document.createElement("h3");
  const newBody = document.createElement("p");
  const newTags = document.createElement("p");
  newTags.classList.add("tag-div");

  post.body = post.body.replace(/\\n/g, "<br />");

  post.tags.forEach((tag) => {
    const newTagSpan = document.createElement("span");
    newTagSpan.classList.add("tag-span");
    newTagSpan.textContent = tag;
    newTags.append(newTagSpan);
  });

  newTitle.textContent = post.title;
  newBody.innerText = post.body;
  
  newArticle.append(newTitle, newBody, newTags);
  newPostsDiv.append(newArticle);
}

//när sidan laddas: 
//finns arrayen newPostsArray redan i localStorage? 
//om ja – parse
//om nej – skapa newPostsArray som en tom array
let newPostsArray = localStorage.getItem("newPosts") ? JSON.parse(localStorage.getItem("newPosts")) : [];
//för varje item som finns i newPostsArray, skriv ut
newPostsArray.forEach(printNewPost);

//om submit – läs in data från formuläret
postForm.addEventListener("submit", getFormData);

//läser in data från formuläret
function getFormData(event) {
  event.preventDefault();

  let title = newPostTitle.value;
  let body = newPostBody.value;
  let checkedTags = [];

  //valda taggar läggs i en array
  for (let tag of newPostTags) {
    if (tag.checked === true) { // && checkedTags.length < 3
      checkedTags.push(tag.value);
    }
  }

  let newPost = new Post(title, body, checkedTags);
  newPostsArray.push(newPost);
  localStorage.setItem("newPosts", JSON.stringify(newPostsArray));
  //skriv ut nytt inlägg
  printNewPost(newPost);
  postForm.reset();
  formInactive();
}
