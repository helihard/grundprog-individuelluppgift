//skapar åtkomst till element i html-filen
const postForm = document.querySelector("#create-new-post");
const newPostTitle = document.querySelector("#new-title");
const newPostBody = document.querySelector("#new-post");
const newPostsDiv = document.querySelector("#new-posts-div");
const dummyPostsDiv = document.querySelector("#dummy-posts-div");

//skapar en klass för nya inlägg
class Post {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }
}

//skriver ut nytt inlägg
function printNewPost(post) {
  let newArticle = document.createElement("article");
  let newTitle = document.createElement("h3");
  let newBody = document.createElement("p");
  newTitle.textContent = post.title;
  newBody.textContent = post.body;
  newArticle.append(newTitle, newBody);
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
  let newPost = new Post(title, body);
  newPostsArray.push(newPost);
  localStorage.setItem("newPosts", JSON.stringify(newPostsArray));
  //skriv ut nytt inlägg
  printNewPost(newPost);
  postForm.reset();
}