fetch("https://dummyjson.com/posts?limit=10")
  .then(response => response.json())
  .then(console.log);

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