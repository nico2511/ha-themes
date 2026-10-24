#!/usr/bin/env python3
"""Assemble les thèmes des dossiers par style en un seul fichier themes/ha-themes.yaml.

Chaque style a son dossier à la racine du dépôt (nuit-flat/, flaminet/…) et
son thème dans <dossier>/<dossier>.yaml. HACS (catégorie Thème) ne gère
qu'UN fichier dans themes/ : les thèmes sont donc édités dans leur dossier
puis regroupés ici. Lancer depuis la racine du dépôt :
    python3 outils/assembler-themes.py
Un dossier sans <dossier>.yaml (ex. commun/) est ignoré.
"""
from pathlib import Path

import yaml

racine = Path(__file__).resolve().parent.parent
sources = sorted(
    d / f"{d.name}.yaml"
    for d in racine.iterdir()
    if d.is_dir() and not d.name.startswith(".") and (d / f"{d.name}.yaml").is_file()
)
if not sources:
    raise SystemExit("Aucun thème trouvé (<dossier>/<dossier>.yaml).")
rel = [s.relative_to(racine).as_posix() for s in sources]
morceaux = [
    "# ─────────────────────────────────────────────────────────────────────────────\n"
    "#  FICHIER GÉNÉRÉ par outils/assembler-themes.py — ne pas éditer à la main.\n"
    "#  Contient tous les thèmes du dépôt (HACS n'installe qu'un fichier).\n"
    "#  Sources : " + ", ".join(rel) + "\n"
    "# ─────────────────────────────────────────────────────────────────────────────\n"
]
noms = []
for s, r in zip(sources, rel):
    texte = s.read_text(encoding="utf-8")
    donnees = yaml.safe_load(texte)
    for nom in donnees:
        if nom in noms:
            raise SystemExit(f"Thème en double : {nom}")
        noms.append(nom)
    morceaux.append(f"\n# ════════ {r} ════════\n" + texte.rstrip() + "\n")

sortie = racine / "themes" / "ha-themes.yaml"
sortie.write_text("".join(morceaux), encoding="utf-8")
verif = yaml.safe_load(sortie.read_text(encoding="utf-8"))
assert list(verif) == noms, (list(verif), noms)
print(f"{sortie.relative_to(racine)} : {len(noms)} thèmes -> {', '.join(noms)}")
