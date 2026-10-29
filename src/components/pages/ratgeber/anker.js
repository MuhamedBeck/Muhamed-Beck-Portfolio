/* "Was kostet n8n im Monat?" becomes "was-kostet-n8n-im-monat": readable in a
   shared link, and the same on the server and in the browser. In its own file
   because a component module may only export components (react-refresh). */
export const anker = (text) =>
  text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
