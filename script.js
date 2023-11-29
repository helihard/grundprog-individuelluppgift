const postForm = document.querySelector("#create-new-post");
const newPostInput = document.querySelector("#new-post");
const newPostsDiv = document.querySelector("#new-posts-div");

postForm.addEventListener("submit", getFormData);

//hämtar data från formulär
function getFormData(event) {
  event.preventDefault();

  const newPostTags = document.querySelectorAll(".new-tag");
  let checkedTags = [];

  for (let tag of newPostTags) {
    if (tag.checked === true && checkedTags.length < 3) {
      checkedTags.push(tag.value);
    }
  }

  let newPost = {
    "title": this.newtitle.value,
    "body": this.newbody.value,
    "tags": checkedTags
  }

  renderNewPost(newPost);
  postForm.reset();
}

//skriver ut data i form av nytt inlägg
function renderNewPost(post) {
  let newArticle = document.createElement("article");
  let newTitle = document.createElement("h2");
  let newPostBody = document.createElement("p");
  let newTags = document.createElement("p");
  newTitle.innerText = post.title;
  newPostBody.innerText = post.body;
  newTags.innerText = post.tags.join(", ");
  newArticle.append(newTitle, newPostBody, newTags);
  newPostsDiv.append(newArticle);
}

//hämtar inlägg från DummyJSON
fetch("https://dummyjson.com/posts?limit=3")
  .then((response) => response.json())
  .then((response) => {
    renderPosts(response.posts);
  });

//skriver ut inlägg från DummyJSON
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
    postTags.innerText = post.tags.join(", ");
    article.append(postTags);
  }
}