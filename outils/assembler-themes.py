#!/usr/bin/env python3
"""Assemble themes-par-style/*.yaml en un seul fichier themes/ha-themes.yaml.

HACS (catégorie Thème) ne gère qu'UN fichier dans themes/. Les thèmes sont
donc édités dans themes-par-style/ puis regroupés ici. Lancer depuis la racine
du dépôt :  python3 outils/assembler-themes.py
"""
from pathlib import Path

import yaml

racine = Path(__file__).resolve().parent.parent
sources = sorted((racine / "themes-par-style").glob("*.yaml"))
morceaux = [
    "# ─────────────────────────────────────────────────────────────────────────────\n"
    "#  FICHIER GÉNÉRÉ par outils/assembler-themes.py — ne pas éditer à la main.\n"
    "#  Contient tous les thèmes du dépôt (HACS n'installe qu'un fichier).\n"
    "#  Sources : " + ", ".join("themes-par-style/" + s.name for s in sources) + "\n"
    "# ─────────────────────────────────────────────────────────────────────────────\n"
]
noms = []
for s in sources:
    texte = s.read_text(encoding="utf-8")
    donnees = yaml.safe_load(texte)
    for nom in donnees:
        if nom in noms:
            raise SystemExit(f"Thème en double : {nom}")
        noms.append(nom)
    morceaux.append(f"\n# ════════ {s.name} ════════\n" + texte.rstrip() + "\n")

sortie = racine / "themes" / "ha-themes.yaml"
sortie.write_text("".join(morceaux), encoding="utf-8")
verif = yaml.safe_load(sortie.read_text(encoding="utf-8"))
assert list(verif) == noms, (list(verif), noms)
print(f"{sortie.relative_to(racine)} : {len(noms)} thèmes -> {', '.join(noms)}")
