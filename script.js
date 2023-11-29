const postForm = document.querySelector("#create-new-post");
const newPostInput = document.querySelector("#new-post");
const newPostsDiv = document.querySelector("#new-posts-div");

let newPost;
let newTags = [];

//fetchar
fetch("https://dummyjson.com/posts?limit=3")
  .then((response) => response.json())
  .then((response) => {
    renderPosts(response.posts);
  });

/*fetch("https://dummyjson.com/posts/add", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    title: "Nytt inlägg",
    body: "Inläggets text",
    userId: 1,
    tags: ["en tagg", "en annan tagg", "en tredje tagg"]
  })
})
.then(response => response.json())
.then(console.log);*/

//tar in data från användaren i form av text
postForm.addEventListener("submit", (event) => {
  event.preventDefault();
  newPost = newPostInput.value;
  renderNewPost(newPost);
  postForm.reset();
})

//test med att ta in data från användaren i form av checkboxes 
postForm.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const checked = document.querySelectorAll("input[type='checkbox']:checked");
    newTags = Array.from(checked).map(tag => tag.value)
    console.log(newTags);
  }
})

//skriver ut textdata i form av nya posts
function renderNewPost(post) {
    let newArticle = document.createElement("p");
    newPostsDiv.append(newArticle);
    newArticle.innerText = post;
}

//skriver ut posts från DummyJSON
function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i];

    let article = document.createElement("article");
    document.body.append(article);

    let postTitle = document.createElement("h2");
    postTitle.innerText = post.title;
    article.append(postTitle);

    let postBody = document.createElement("p");
    postBody.innerText = post.body;
    article.append(postBody);

    let postTags = document.createElement("p");
    postTags.innerText = post.tags;
    article.append(postTags);
  }
}


