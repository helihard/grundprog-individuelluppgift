//hämtar inlägg från DummyJSON
//sparar inlägg i localStorage - får se om det går att göra något med detta
(async () => {
  const response = await fetch("https://dummyjson.com/posts?limit=5");
  const dummyData = await response.json();
  localStorage.setItem("dummyPosts", JSON.stringify(dummyData.posts));
  printDummyData(dummyData.posts);
})();

//skriver ut inlägg från DummyJSON
//se om det går att göra en gemensam printfunktion för nya och gamla inlägg
function printDummyData(posts) {
  posts.forEach((post) => {
  
    const article = document.createElement("article");
    const title = document.createElement("h3");
    const body = document.createElement("p");
    const tags = document.createElement("p");
    tags.classList.add("tag-div");

    post.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.classList.add("tag-span");
      tagSpan.textContent = tag;
      tags.append(tagSpan);
    });

    title.textContent = post.title;
    body.textContent = post.body;

    article.append(title, body, tags);
    dummyPostsDiv.append(article);
  });
}