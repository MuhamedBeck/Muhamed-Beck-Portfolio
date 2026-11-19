// Seite /links: die öffentlichen Profile des Inhabers an einer Stelle.
// Ausführen mit `npm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ROUTES, getGroupRoute } from "../src/routes/registry.js";
import { SAME_AS, SOCIAL } from "../src/content/site.js";
import { PROFIL_GRUPPEN, PROFIL_SEITE } from "../src/content/profile.de.js";

const alleProfile = () => PROFIL_GRUPPEN.flatMap((gruppe) => gruppe.profile);
const adresseVon = (name) => alleProfile().find((profil) => profil.name === name)?.url;
const quelltext = (pfad) => readFileSync(new URL(pfad, import.meta.url), "utf8");

test("Profile: /links ist eine deutsche Route ohne Gegenstück in en und ar", () => {
  const route = ROUTES.find((eintrag) => eintrag.id === "links");
  assert.deepEqual(
    [route.path, route.locale, route.group, route.h1, route.navLabel],
    ["/links", "de", "links", "Profile und Portale", "Alle Profile"]
  );
  assert.equal(route.h1, PROFIL_SEITE.headline);
  assert.equal(getGroupRoute("links", "en"), undefined);
  assert.equal(getGroupRoute("links", "ar"), undefined);
});

test("Profile: jede Gruppe hat einen Titel, jedes Profil Name, Satz und https-Adresse", () => {
  assert.ok(PROFIL_GRUPPEN.length > 0);
  for (const gruppe of PROFIL_GRUPPEN) {
    assert.ok(gruppe.titel, "Gruppe ohne Titel");
    assert.ok(gruppe.profile.length > 0, `${gruppe.titel} ist leer`);
    for (const profil of gruppe.profile) {
      assert.ok(profil.name, "Profil ohne Namen");
      assert.ok(profil.text, `${profil.name} ohne Satz`);
      assert.match(profil.url, /^https:\/\/\S+$/, `${profil.name} ohne https-Adresse`);
    }
  }
});

test("Profile: keine Adresse steht zweimal auf der Seite", () => {
  const adressen = alleProfile().map((profil) => profil.url);
  assert.equal(new Set(adressen).size, adressen.length);
});

test("Profile: LinkedIn, GitHub und freelancermap kommen aus site.js", () => {
  assert.equal(adresseVon("LinkedIn"), SOCIAL.linkedin);
  assert.equal(adresseVon("GitHub"), SOCIAL.github);
  assert.equal(adresseVon("freelancermap"), SOCIAL.freelancermap);
  assert.ok(SAME_AS.includes(SOCIAL.freelancermap));
});

/* Ein neues Portal kommt nicht nebenbei auf die Seite: Wer es einträgt, ergänzt
   es auch hier und hat das Profil vorher so angesehen, wie ein Besucher es
   sieht. */
test("Profile: jedes Portal ist bewusst aufgenommen", () => {
  const geprueft = [
    "www.linkedin.com",
    "github.com",
    "community.n8n.io",
    "www.freelancermap.de",
    "www.freelance.de",
  ];
  for (const profil of alleProfile()) {
    assert.ok(geprueft.includes(new URL(profil.url).host), `${profil.name} ist nicht geprüft`);
  }
});

test("Profile: Links nach außen öffnen sicher, Texte und Farben stehen nicht in der Komponente", () => {
  const quelle = quelltext("../src/components/pages/Profile.jsx");
  const neueTabs = quelle.match(/target="_blank"/g) ?? [];
  const abgesichert = quelle.match(/rel="noopener noreferrer"/g) ?? [];
  assert.ok(neueTabs.length > 0, "kein Link nach außen");
  assert.equal(neueTabs.length, abgesichert.length);
  assert.doesNotMatch(quelle, /\b(text|bg|border)-(gray|slate|zinc|neutral|stone|white|black)\b/);
  assert.ok(!quelle.includes(PROFIL_SEITE.headline), "Überschrift steht in der Komponente");
});

/* Die Fußzeile ist auf jeder Seite, in drei Sprachen. Der Link darf nur dort
   stehen, wo die Gruppe eine Route hat, und seine Beschriftung kommt aus der
   Registry, damit die Wörterbücher für en und ar kein totes Wort tragen. */
test("Profile: die Fußzeile verlinkt die Seite über die Registry", () => {
  const quelle = quelltext("../src/components/Footer.jsx");
  assert.match(quelle, /getGroupRoute\("links", locale\)/);
  assert.match(quelle, /to=\{profile\.path\}/);
  assert.match(quelle, /profile\.navLabel/);
  assert.ok(!quelle.includes("Alle Profile"), "Beschriftung steht in der Komponente");
});
