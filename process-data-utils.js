//autogenererar titel
export function renderDefaultTitle(body) {
  //delar upp inlägget i rader
  //alla tomma rader blir en tom sträng i arrayen även om de innehåller mellanslag
  const splitByNewLine = body.split(/\r?\n/).map((line) => line.trim());

  //första raden i inlägget
  const firstLine = splitByNewLine[0];

  //tar bort resterande items i arrayen
  for (let i = 1; i < splitByNewLine.length; i++) {
    splitByNewLine.pop();
    i--;
  }

  //delar upp första raden i ord
  const splitByWhiteSpace = firstLine.split(" ");
  const defaultTitleArray = [];

  //lägger bestämt maxantal ord i arrayen som ska bli inläggets genererade titel
  for (let i = 0; i < splitByWhiteSpace.length; i++) {
    let word = splitByWhiteSpace[i];

    //max sex ord i titeln
    if (i < 6) {
      defaultTitleArray.push(word);
    }
  }

  //skapar en string av arrayen: detta blir titeln (efter eventuell kortning)
  let defaultTitle = defaultTitleArray.join(" ");
  //korta titeln om den är längre än 70 tecken
  let arrayOfChar = Array.from(defaultTitle);
  if (arrayOfChar.length > 70) {
    defaultTitle = shortenTitle(arrayOfChar);
  }
  //returnerar titeln
  return defaultTitle;
}

//kortar titeln
function shortenTitle(arr) {
  while (arr.length > 70) {
    arr.pop();
  }
  let shortenedTitle = arr.join("");
  return shortenedTitle;
}
