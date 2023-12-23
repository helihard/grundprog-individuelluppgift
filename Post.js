import { renderDefaultTitle } from "./process-data-utils.js";

//skapar en klass för nya inlägg
export default class Post {
  constructor(title, body, tags) {
    //tar bort mellanslag och radbrytningar i början och slutet av titeln
    //generera titel från inläggstexten om användaren inte angett titel
    this.title = title.trim().length > 0 ? title.trim() : renderDefaultTitle(body);
    //tar bort mellanslag och radbrytningar i början och slutet av inläggstexten
    this.body = body.trim();
    this.tags = tags;
    this.reactions = 0;
    this.upvoted = false;
  }
}
