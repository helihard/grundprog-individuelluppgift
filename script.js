const postForm = document.querySelector("#create-new-post");
const newPostTitle = document.querySelector("#new-title");
const newPostInput = document.querySelector("#new-post");
const newPostTagsDiv = document.querySelector("#new-tags-div");
const submitBtn = document.querySelector("#submit-new-post");
const newPostsDiv = document.querySelector("#new-posts-div");

submitBtn.disabled = true;
newPostTitle.style.display ="none";
newPostTagsDiv.style.display = "none";
submitBtn.style.display = "none";

newPostInput.addEventListener("focus", () => {
  newPostInput.style.width = "400px";
  newPostInput.style.height = "200px";
  newPostTitle.style.display = "block";
  newPostTagsDiv.style.display = "block";
  submitBtn.style.display = "block";

  newPostInput.addEventListener("input", checkIfEmpty);
});

function checkIfEmpty() {
  let fieldToCheck = this.value;
  let trimmedNewBodyValue = fieldToCheck.trim();

  if (fieldToCheck !== "" && trimmedNewBodyValue.length !== 0) {
    submitBtn.disabled = false;     
  } else if (trimmedNewBodyValue.length === 0){
    submitBtn.disabled = true;
  }
}

postForm.addEventListener("submit", getFormData);

//hämtar data från formulär – om ingen inläggstext finns går det inte att posta inlägget
function getFormData(event) {
  event.preventDefault();

  renderNewPost(compileNewPost(postForm));
  postForm.reset();
  newPostInput.style.width = "auto";
  newPostInput.style.height = "auto";
  newPostTitle.style.display = "none";
  newPostTagsDiv.style.display = "none";
  submitBtn.style.display = "none";
  submitBtn.disabled = true;
}


//sammanställer data från formuläret till ett inlägg
function compileNewPost(form) {
  const newPostTags = document.querySelectorAll(".new-tag");
  let checkedTags = [];

  for (let tag of newPostTags) {
    if (tag.checked === true && checkedTags.length < 3) {
      checkedTags.push(tag.value);
    }
  }

  let newPost = {
    "title": form.newtitle.value,
    "body": form.newbody.value,
    "tags": checkedTags
  }

  if (newPost.title === "") {
    newPost.title = renderDefaultTitle(newPost.body);
  } else {
    newPost.title;
  }
  return newPost;
}

//genererar en titel från inläggets text om användaren inte ger sitt inlägg en titel
function renderDefaultTitle(body) {
  const newTitleArray = body.split(" ");
  const defaultTitleArray = [];

  for (let i = 0; i < newTitleArray.length; i++) {
    let word = newTitleArray[i];

    if (i < 6) {
      defaultTitleArray.push(word);
    }
  }
  let defaultTitle = defaultTitleArray.join(" ");
  return defaultTitle;
}

//skriver ut data i form av nytt inlägg
function renderNewPost(post) {
  let newArticle = document.createElement("article");
  let newTitle = document.createElement("h3");
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

    let postTitle = document.createElement("h3");
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