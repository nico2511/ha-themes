# HA Thèmes : Nuit flat & Flaminet

Thèmes, modèles button-card, extraits card-mod et dashboards d'exemple pour **Home Assistant 2026**.
Tout est en YAML lisible. Aucun secret, aucune IP : les entités des exemples sont génériques, remplace-les par les tiennes.

**Un dossier par style.** Chaque dossier contient son thème, ses modèles, ses dashboards, ses snippets, ses captures et un README (aperçu, prérequis, installation manuelle).

---

## Les styles

### [Nuit flat](nuit-flat/) : `nuit_flat`
Thème sombre et plat pour **tout HA** : palette pastel, police Inter, arrondis de 4 px, sans ombre. Modèles `nf_*`, dashboard « Maison ».
✔ Utilisé au quotidien (HA 2026.10). Champs sombres HA 2026 ajoutés en v1.1.0, **non testés dans HA**.

[![Nuit flat, bureau](nuit-flat/captures/nuit-flat-desktop.png)](nuit-flat/)

→ [Lire le README Nuit flat](nuit-flat/README.md)

### [Flaminet](flaminet/) : `flaminet`
Apparence **native** de HA en sombre, avec des champs de formulaire sombres. Dashboard d'exemple en cartes natives.
Dashboards ✔ utilisés · **thème : nouveau, non testé**.

[![Flaminet, bureau](flaminet/captures/flaminet-desktop.png)](flaminet/)

→ [Lire le README Flaminet](flaminet/README.md)

### [Commun](commun/)
Extraits valables pour tous les styles : bloc `frontend:` de `configuration.yaml`, correctif des champs sombres HA 2026 (card-mod, ✔ testé) et cadre sombre autour de plusieurs cartes.
→ [Lire le README Commun](commun/README.md)

> Les captures sont des **rendus HTML fidèles aux variables des thèmes**, pas des captures de HA. La maison, les pièces et les appareils sont fictifs.

---

## Arborescence

```text
themes/ha-themes.yaml     tous les thèmes en un fichier (installé par HACS) — GÉNÉRÉ
nuit-flat/                thème nuit_flat, modèles nf_*, dashboard, snippets, www/, captures/
flaminet/                 thème flaminet, dashboard natif, captures/
commun/                   snippets communs (configuration-frontend, champs-sombres-ha2026, cadre-sombre)
outils/assembler-themes.py   régénère themes/ha-themes.yaml depuis <style>/<style>.yaml
hacs.json · CHANGELOG.md · LICENSE
```

---

## Installation rapide

### 1. Activer les thèmes dans `configuration.yaml`

```yaml
frontend:
  themes: !include_dir_merge_named themes
```

Pour Nuit flat, ajoute aussi `extra_module_url` (card-mod et police Inter) : voir [commun/snippets/configuration-frontend.yaml](commun/snippets/configuration-frontend.yaml) et le [README Nuit flat](nuit-flat/README.md). Redémarre ensuite Home Assistant.

### 2a. Via HACS (dépôt personnalisé)

1. HACS → ⋮ → **Dépôts personnalisés**.
2. URL : `https://github.com/nico2511/ha-themes`, type **Thème** → Ajouter.
3. Cherche « HA Thèmes » → Télécharger.
4. Outils de développement → Actions → `frontend.reload_themes` (ou redémarre).

HACS ne gère qu'**un** fichier de thème par dépôt, dans `themes/`. Il installe donc `themes/ha-themes.yaml`, qui contient **tous** les thèmes (`nuit_flat` et `flaminet`).
Les autres fichiers (`www/`, modèles, dashboards) ne sont **pas** copiés par HACS : copie-les à la main, comme indiqué dans le README de chaque style.

### 2b. Installation manuelle

Copie le thème voulu (`nuit-flat/nuit-flat.yaml` ou `flaminet/flaminet.yaml`) dans `/config/themes/`. Tu peux aussi copier `themes/ha-themes.yaml` pour tout avoir.
⚠ N'installe pas les deux à la fois, ni en plus de la version HACS : les thèmes seraient en double.

### 3. Activer un thème

- **Profil** (en bas de la barre latérale) → **Thème** : `nuit_flat` ou `flaminet`, mode **sombre**. Ce réglage vaut par utilisateur et par appareil.
- Pour l'imposer partout : action `frontend.set_theme` avec `name: nuit_flat` et `mode: dark`.
- Un dashboard peut aussi forcer son thème : clé `theme:` de la vue (le dashboard Nuit flat le fait).
- Appli Companion : vide le cache du frontend si l'ancien thème persiste.

### 4. Importer un dashboard

1. Paramètres → Tableaux de bord → **Ajouter** → « Nouveau tableau de bord vide ».
2. Ouvre-le → ✎ → ⋮ → **Éditeur de configuration brute**.
3. Colle le fichier `<style>/dashboards/…yaml` voulu, puis enregistre.
4. Remplace les `entity_id` par les tiens.
5. Adapte les `navigation_path` et `back_path` à l'URL de **ton** dashboard. Les exemples supposent `/dashboard-maison`.

Les modèles button-card sont déjà inclus dans chaque dashboard. Les fichiers `<style>/button-card-templates/` servent à les réutiliser ailleurs : colle-les sous la clé `button_card_templates:`.

---

## Contribuer / modifier un thème

Édite `<style>/<style>.yaml` (par exemple `nuit-flat/nuit-flat.yaml`), puis régénère le fichier HACS :

```bash
python3 outils/assembler-themes.py
```

Le script prend chaque dossier racine qui contient `<dossier>/<dossier>.yaml`. Historique : [CHANGELOG.md](CHANGELOG.md).

## Licence

[MIT](LICENSE). La police Inter n'est pas incluse ; elle est sous licence SIL OFL 1.1.
