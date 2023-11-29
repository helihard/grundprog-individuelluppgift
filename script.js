fetch("https://dummyjson.com/posts?limit=3")
  .then((response) => response.json())
  .then((response) => {
    renderPosts(response.posts);
  });

fetch("https://dummyjson.com/posts/add", {
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
.then(console.log);

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