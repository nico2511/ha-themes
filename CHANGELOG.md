# Changelog

Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), versions selon [SemVer](https://semver.org/lang/fr/).

## [1.1.0]

### Ajouté
- `nuit_flat` : variables de champs du frontend HA 2026, sur le modèle de `flaminet`, avec les couleurs Nuit flat :
  - `ha-color-form-background`, `-hover`, `-disabled` ;
  - `ha-color-border-neutral-quiet`, `-normal`, `-loud` ;
  - `wa-form-control-background-color`, `-value-color`, `-label-color`, `-placeholder-color`, `-border-color`, `-activated-color`.
  ⚠ **Non testées dans HA.** Le snippet `snippets/champs-sombres-ha2026.yaml` reste la méthode testée.
- `CHANGELOG.md`.

### Modifié
- `themes/ha-themes.yaml` régénéré avec `outils/assembler-themes.py`.
- `dashboards/nuit-flat-maison.yaml` et `dashboards/flaminet-natif.yaml` : libellés de marque de l’aspirateur remplacés par « Aspirateur ».
- `dashboards/nuit-flat-maison.yaml` : le nettoyage des noms de capteurs (`friendly_name.replace(...)`) est généralisé, avec un commentaire « À ADAPTER » au nom de ton appareil.

## [1.0.0] — publiée

### Ajouté
- Thèmes `nuit_flat` (complet, police Inter) et `flaminet` (HA natif sombre + champs sombres, non testé), fichier combiné pour HACS.
- Modèles button-card `nf_*` et `mt_*`, dashboards d'exemple, snippets card-mod, carte `mt-console-card`, captures fictives.
