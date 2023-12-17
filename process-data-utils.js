//skapar en klass för nya inlägg
class Post {
  constructor(title, body, tags) {
    this.title = title;
    this.body = body;
    this.tags = tags;
  }
}

//sammanställer hämtad data från formuläret till ett inlägg
export function compileNewPost(title, body, tags, arr) {

  let post = new Post(title, body, tags);
  post.reactions = 0;

  //tar bort mellanslag och radbrytningar i början och slutet av titeln och inläggstexten
  post.title = post.title.trim();
  post.body = post.body.trim();

  //autogenerera titel från inläggstexten om användaren inte angett titel
  if (post.title === "") {
    post.title = renderDefaultTitle(post.body);
  } else {
    post.title;
  }
  
  arr.unshift(post);
  localStorage.setItem("posts", JSON.stringify(arr));
  return post;
}

//autogenererar titel
function renderDefaultTitle(body) {
  //delar upp inlägget i rader
  //alla tomma rader blir en tom sträng i arrayen även om de innehåller mellanslag
  const splitByNewLine = body.split(/\r?\n/).map(line => line.trim());
  
  //första raden i inlägget
  const firstLine = splitByNewLine[0];

  //tar bort resterande items i arrayen
  for (let i = 1; i < splitByNewLine.length; i++) {
    splitByNewLine.pop();
    i--;
  }

  //console.log(splitByNewLine);
 
  //delar upp första raden i ord
  const splitByWhiteSpace = firstLine.split(" ");
  //console.log(splitByWhiteSpace);
  const defaultTitleArray = [];

  //lägger bestämt maxantal ord i arrayen som ska bli inläggets genererade titel
  for (let i = 0; i < splitByWhiteSpace.length; i++) {
    let word = splitByWhiteSpace[i];

    //max sex ord i titeln
    if (i < 6) {
      defaultTitleArray.push(word);
    }
  }

  //skapar en string av arrayen: detta är titeln
  let defaultTitle = defaultTitleArray.join(" ");
  let arrayOfChar = Array.from(defaultTitle);
  if (arrayOfChar.length > 70) {
    defaultTitle = shortenTitle(arrayOfChar);
    console.log(defaultTitle);
  }
  //returnerar titeln
  return defaultTitle;
}

function shortenTitle(arr) {
  while (arr.length > 70) {
    arr.pop();
  }
  let shortenedTitle = arr.join("");
  return shortenedTitle;
}