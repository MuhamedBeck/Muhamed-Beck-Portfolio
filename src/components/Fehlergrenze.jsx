import { Component } from "react";
import { localeFromPath, pick } from "../i18n";
import fehler from "../i18n/dict/fehler";

/**
 * A page that failed to load shows a way out instead of a blank screen.
 *
 * The usual cause is a deploy: the hashed chunks of the previous build are
 * gone, and a tab opened before it cannot load its next page. main.jsx reloads
 * once in that case; this is what is left when even that did not help, or
 * when a page threw while rendering. A new address clears it, so navigating
 * on works without a reload.
 */
export class Fehlergrenze extends Component {
  state = { fehler: null, ort: this.props.ort };

  static getDerivedStateFromError(fehler) {
    return { fehler };
  }

  static getDerivedStateFromProps(props, state) {
    return props.ort !== state.ort ? { fehler: null, ort: props.ort } : null;
  }

  render() {
    if (!this.state.fehler) return this.props.children;
    const t = pick(fehler, localeFromPath(window.location.pathname)).ladefehler;
    return (
      <div className="flex min-h-[100dvh] flex-col justify-center bg-ink px-4 text-paper">
        <div className="mx-auto w-full max-w-6xl">
          <h1 className="headline max-w-[22ch]">{t.titel}</h1>
          <p className="intro mt-7 max-w-[52ch]">{t.text}</p>
          <a href={window.location.href} className="btn-ghost btn-accent mt-10">
            {t.neuLaden}
          </a>
        </div>
      </div>
    );
  }
}
