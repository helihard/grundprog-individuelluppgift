//hämtar inlägg från DummyJSON
fetch("https://dummyjson.com/posts?limit=5")
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

    let postBody = document.createElement("p");
    postBody.innerText = post.body;

    let postTags = document.createElement("p");
    postTags.innerText = post.tags.join(", ");

    article.append(postTitle, postBody, postTags);
  }
}