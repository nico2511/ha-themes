/* mt-console-card — vanilla JS, sans dépendance.
   Appelle uniquement hass.callService (scripts HA). Aucune clé API ici.
   Toute saisie est non fiable : rendu via textContent, jamais innerHTML. */
const MT_COMMANDES = [
  { nom: "/suivre", aide: "/suivre <id TMDB> [film|serie] — ajouter un média" },
  { nom: "/file", aide: "/file — afficher la file" },
  { nom: "/statut", aide: "/statut — état du service" },
];

class MtConsoleCard extends HTMLElement {
  constructor() {
    super();
    this._idx = -1;
    this._sugg = [];
    this.attachShadow({ mode: "open" });
  }

  setConfig(config) {
    this._config = config || {};
    this._build();
  }

  getCardSize() { return 4; }

  set hass(hass) {
    this._hass = hass;
    if (!this._sortie) return;
    const c = this._config;
    const etat = (e) => (e && hass.states[e] ? hass.states[e].state : "indisponible");
    this._info.textContent =
      "File : " + etat(c.file_entity) + " · Statut : " + etat(c.statut_entity);
    if (c.message_entity && hass.states[c.message_entity] && !this._local) {
      this._sortie.textContent = hass.states[c.message_entity].state;
    }
  }

  _build() {
    const s = this.shadowRoot;
    while (s.firstChild) s.removeChild(s.firstChild);
    const style = document.createElement("style");
    style.textContent = `
      :host { display:block; }
      .carte { background:#181c23; color:#e6e9ef; border-radius:4px; padding:16px;
        font-family:system-ui,sans-serif; box-sizing:border-box; }
      h2 { margin:0 0 4px; font-size:1.1rem; font-weight:600; color:#b9e5d3; }
      .info { color:#a9b4c6; font-size:.85rem; margin-bottom:12px; }
      .ligne { display:flex; gap:8px; position:relative; }
      input { flex:1; background:#20252e; color:#e6e9ef; border:1px solid #2b313c;
        border-radius:4px; padding:10px; font-size:1rem; min-width:0; }
      button { background:#2b313c; color:#e6e9ef; border:1px solid #2b313c;
        border-radius:4px; padding:10px 14px; cursor:pointer; font-size:.95rem; }
      button.envoi { background:#b9e5d3; color:#181c23; }
      button:hover { background:#353c49; } button.envoi:hover { background:#a6d6c2; }
      input:focus-visible, button:focus-visible { outline:2px solid #b8c4f0; outline-offset:2px; }
      ul { list-style:none; margin:4px 0 0; padding:0; background:#20252e;
        border:1px solid #2b313c; border-radius:4px; position:absolute;
        top:100%; left:0; right:0; z-index:5; }
      ul[hidden] { display:none; }
      li { padding:8px 10px; cursor:pointer; color:#e6e9ef; }
      li[aria-selected="true"] { background:#2b313c; color:#f6c9a8; }
      .raccourcis { display:flex; gap:8px; margin-top:12px; flex-wrap:wrap; }
      .sortie { margin-top:12px; background:#20252e; border-radius:4px; padding:10px;
        min-height:1.4em; white-space:pre-wrap; border-left:3px solid #9ec5e8; }
      .sortie.erreur { border-left-color:#f6c9a8; color:#f6c9a8; }
      @media (prefers-reduced-motion: no-preference) {
        button { transition:background-color .12s; }
      }
      @media (prefers-reduced-motion: reduce) { * { transition:none !important; animation:none !important; } }
    `;
    const carte = document.createElement("div");
    carte.className = "carte";
    const h = document.createElement("h2");
    h.textContent = this._config.title || "Console MediaTracker";
    this._info = document.createElement("div");
    this._info.className = "info";
    const ligne = document.createElement("div");
    ligne.className = "ligne";
    const inp = document.createElement("input");
    inp.type = "text";
    inp.maxLength = 120;
    inp.autocomplete = "off";
    inp.placeholder = "Tapez / pour voir les commandes";
    inp.setAttribute("aria-label", "Commande MediaTracker");
    inp.setAttribute("role", "combobox");
    inp.setAttribute("aria-expanded", "false");
    inp.setAttribute("aria-controls", "mt-sugg");
    const ul = document.createElement("ul");
    ul.id = "mt-sugg";
    ul.setAttribute("role", "listbox");
    ul.hidden = true;
    const btn = document.createElement("button");
    btn.className = "envoi";
    btn.type = "button";
    btn.textContent = "Lancer la commande";
    ligne.append(inp, btn, ul);
    const rac = document.createElement("div");
    rac.className = "raccourcis";
    for (const [lib, cmd] of [["Voir la file", "/file"], ["Voir le statut", "/statut"]]) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = lib;
      b.addEventListener("click", () => this._executer(cmd));
      rac.append(b);
    }
    this._sortie = document.createElement("div");
    this._sortie.className = "sortie";
    this._sortie.setAttribute("role", "status");
    carte.append(h, this._info, ligne, rac, this._sortie);
    s.append(style, carte);
    this._inp = inp; this._ul = ul;

    inp.addEventListener("input", () => this._maj());
    inp.addEventListener("keydown", (e) => this._touche(e));
    inp.addEventListener("blur", () => setTimeout(() => this._fermer(), 120));
    btn.addEventListener("click", () => this._executer(inp.value));
    if (this._hass) this.hass = this._hass;
  }

  _maj() {
    const v = this._inp.value;
    if (!v.startsWith("/") || v.includes(" ")) return this._fermer();
    this._sugg = MT_COMMANDES.filter((c) => c.nom.startsWith(v.toLowerCase()));
    if (!this._sugg.length) return this._fermer();
    this._idx = 0;
    this._dessiner();
  }

  _dessiner() {
    while (this._ul.firstChild) this._ul.removeChild(this._ul.firstChild);
    this._sugg.forEach((c, i) => {
      const li = document.createElement("li");
      li.setAttribute("role", "option");
      li.setAttribute("aria-selected", String(i === this._idx));
      li.textContent = c.aide;
      li.addEventListener("mousedown", (e) => { e.preventDefault(); this._choisir(i); });
      this._ul.append(li);
    });
    this._ul.hidden = false;
    this._inp.setAttribute("aria-expanded", "true");
  }

  _fermer() {
    this._ul.hidden = true;
    this._sugg = [];
    this._idx = -1;
    this._inp.setAttribute("aria-expanded", "false");
  }

  _choisir(i) {
    const c = this._sugg[i];
    if (!c) return;
    this._inp.value = c.nom + (c.nom === "/suivre" ? " " : "");
    this._fermer();
    this._inp.focus();
  }

  _touche(e) {
    const ouvert = !this._ul.hidden;
    if (e.key === "ArrowDown" && ouvert) {
      e.preventDefault(); this._idx = (this._idx + 1) % this._sugg.length; this._dessiner();
    } else if (e.key === "ArrowUp" && ouvert) {
      e.preventDefault(); this._idx = (this._idx - 1 + this._sugg.length) % this._sugg.length; this._dessiner();
    } else if (e.key === "Tab" && ouvert) {
      e.preventDefault(); this._choisir(this._idx);
    } else if (e.key === "Escape" && ouvert) {
      e.preventDefault(); this._fermer();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (ouvert && this._inp.value !== this._sugg[this._idx].nom) this._choisir(this._idx);
      else this._executer(this._inp.value);
    }
  }

  _afficher(texte, erreur) {
    this._local = true;
    this._sortie.textContent = texte;
    this._sortie.classList.toggle("erreur", !!erreur);
  }

  /* Analyse stricte : retourne {service, data} ou {erreur}. */
  _analyser(brut) {
    const parts = String(brut).trim().split(/\s+/).filter(Boolean);
    const cmd = (parts[0] || "").toLowerCase();
    if (!cmd) return { erreur: "Saisie vide. Essayez /file, /statut ou /suivre 12345." };
    if (cmd === "/file" || cmd === "/statut") {
      if (parts.length > 1) return { erreur: cmd + " n'accepte aucun paramètre." };
      return { service: cmd === "/file" ? "mt_file" : "mt_statut", data: {} };
    }
    if (cmd === "/suivre") {
      if (parts.length < 2) return { erreur: "/suivre : il manque l'ID TMDB (entier). Ex. /suivre 12345" };
      if (parts.length > 3) return { erreur: "/suivre : trop de paramètres." };
      if (!/^[0-9]{1,10}$/.test(parts[1])) return { erreur: "/suivre : l'ID TMDB doit être un entier positif." };
      const id = Number.parseInt(parts[1], 10);
      if (!Number.isSafeInteger(id) || id <= 0) return { erreur: "/suivre : l'ID TMDB doit être supérieur à 0." };
      const t = (parts[2] || "film").toLowerCase();
      const types = { film: "movie", movie: "movie", serie: "tv", série: "tv", tv: "tv" };
      if (!(t in types)) return { erreur: "/suivre : type inconnu. Utilisez film ou serie." };
      return { service: "mt_suivre", data: { tmdb_id: id, type: types[t] } };
    }
    return { erreur: "Commande inconnue. Disponibles : /suivre, /file, /statut." };
  }

  async _executer(brut) {
    this._fermer();
    const r = this._analyser(brut);
    if (r.erreur) return this._afficher(r.erreur, true);
    if (!this._hass) return this._afficher("Home Assistant n'est pas prêt.", true);
    try {
      this._afficher("Envoi en cours…", false);
      await this._hass.callService("script", r.service, r.data);
      this._local = false;
      this._inp.value = "";
      this.hass = this._hass;
    } catch (err) {
      this._afficher("Échec de l'appel du script « " + r.service + " ». Vérifiez qu'il existe dans Home Assistant.", true);
    }
  }
}

customElements.define("mt-console-card", MtConsoleCard);
window.customCards = window.customCards || [];
window.customCards.push({ type: "mt-console-card", name: "Console MediaTracker", description: "Commandes /suivre /file /statut" });
