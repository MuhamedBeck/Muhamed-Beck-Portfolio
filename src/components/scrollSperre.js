/**
 * One scroll lock for the whole page, shared by the mobile menu and the splash
 * screen.
 *
 * Both used to set `document.body.style.overflow` themselves, and neither held:
 * since html carries `overflow-x: clip`, body's overflow no longer propagates to
 * the viewport, so `hidden` on body locked nothing and the page scrolled on
 * behind the open menu (measured 07.11.2026: 600 px under one wheel turn). They
 * also undid each other, because the menu wrote "" on every mount and so lifted
 * the splash's lock the moment the homepage rendered. The lock now sits on the
 * root element, which is the one that scrolls, and a counter keeps one
 * component from releasing a lock that another still needs.
 *
 * @returns {() => void} releases this lock
 */
let offeneSperren = 0;

export const sperreScrollen = () => {
  offeneSperren += 1;
  if (offeneSperren === 1) document.documentElement.style.overflow = "hidden";
  let freigegeben = false;
  return () => {
    if (freigegeben) return;
    freigegeben = true;
    offeneSperren -= 1;
    // "" rather than "auto": the stylesheet's overflow-x: clip has to apply
    // again, and an inline value would override it.
    if (offeneSperren === 0) document.documentElement.style.overflow = "";
  };
};
