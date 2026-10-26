# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versions selon [SemVer](https://semver.org/lang/fr/).

## [1.2.1] — à publier

### Supprimé
- **Thème Flaminet** : dossier [`flaminet/`](flaminet/) retiré du dépôt (thème, dashboard d'exemple et captures). Seul **`nuit_flat`** reste dans `themes/ha-themes.yaml`.

### Modifié
- Dashboard d'exemple [`nuit-flat-maison.yaml`](nuit-flat/dashboards/nuit-flat-maison.yaml) : `entity_id` et chemins de navigation remplacés par des noms neutres de démo (plus de noms évoquant l'installation d'origine).
- Légendes des captures PNG Nuit flat : chemin `themes-par-style/…` remplacé par `nuit-flat/nuit-flat.yaml`.
- [README](README.md), [hacs.json](hacs.json) et docs associées : retrait des références au style Flaminet.

## [1.2.0]

### Modifié
- **Réorganisation par thème** : un dossier par style, chacun avec son README (aperçu, prérequis, installation manuelle) :
  - [`nuit-flat/`](nuit-flat/) : thème `nuit-flat.yaml`, modèles `nf_*`, dashboard « Maison », snippets, `www/` (police Inter), `police-inter.md`, captures ;
  - [`flaminet/`](flaminet/) : thème `flaminet.yaml`, dashboard natif, captures ;
  - [`commun/`](commun/) : `configuration-frontend.yaml`, `champs-sombres-ha2026.yaml` et `cadre-sombre.yaml` (cadre card-mod rendu générique).
- [README](README.md) racine transformé en sommaire : une capture et un lien par style, plus l'installation rapide et HACS.
- `outils/assembler-themes.py` lit désormais `<dossier>/<dossier>.yaml`. [`themes/ha-themes.yaml`](themes/ha-themes.yaml) est régénéré ; c'est toujours le seul fichier installé par HACS. Contenu des thèmes inchangé, hors commentaires.

### Supprimé
- **Exemples MediaTracker retirés : ils vivent dans le projet MediaTracker.** Cela concerne les dashboards, les modèles `mt_*`, la carte `mt-console-card`, le style « console sombre » v5 et les captures associées.
- `themes-par-style/`, `button-card-templates/`, `dashboards/`, `snippets/`, `www/`, `docs/` à la racine (fichiers déplacés avec `git mv`).

## [1.1.0] — publiée

### Ajouté
- `nuit_flat` : variables de champs du frontend HA 2026, sur le modèle de `flaminet`, avec les couleurs Nuit flat :
  - `ha-color-form-background`, `-hover`, `-disabled` ;
  - `ha-color-border-neutral-quiet`, `-normal`, `-loud` ;
  - `wa-form-control-background-color`, `-value-color`, `-label-color`, `-placeholder-color`, `-border-color`, `-activated-color`.
  ⚠ **Non testées dans HA.** Le snippet [`commun/snippets/champs-sombres-ha2026.yaml`](commun/snippets/champs-sombres-ha2026.yaml) (chemin depuis la v1.2.0) reste la méthode testée.
- [CHANGELOG.md](CHANGELOG.md).

### Modifié
- `themes/ha-themes.yaml` régénéré avec `outils/assembler-themes.py`.
- `dashboards/nuit-flat-maison.yaml` et `dashboards/flaminet-natif.yaml` : libellés de marque de l’aspirateur remplacés par « Aspirateur ».
- `dashboards/nuit-flat-maison.yaml` : le nettoyage des noms de capteurs (`friendly_name.replace(...)`) est généralisé, avec un commentaire « À ADAPTER » au nom de ton appareil.

## [1.0.0] — publiée

### Ajouté
- Thèmes `nuit_flat` (complet, police Inter) et `flaminet` (HA natif sombre + champs sombres, non testé), fichier combiné pour HACS.
- Modèles button-card `nf_*` et `mt_*`, dashboards d'exemple, snippets card-mod, carte `mt-console-card`, captures fictives.
