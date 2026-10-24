# Police Inter (style Nuit flat)

Le thème `nuit_flat` utilise la police **Inter** (variable). Aucun fichier de police
n'est fourni dans ce dépôt : télécharge-la depuis la source officielle.

- Site : <https://rsms.me/inter/>, ou les versions publiées sur GitHub : <https://github.com/rsms/inter/releases>
- Licence : **SIL Open Font License 1.1 (OFL)**. Redistribution et usage libres ;
  garde le fichier de licence à côté des polices.

## Installation

1. Télécharge l'archive Inter (version 4.x) et extrais :
   - `InterVariable.woff2`
   - `InterVariable-Italic.woff2`
   - `LICENSE.txt` (à renommer en `Inter-LICENSE.txt`)
2. Copie-les dans `/config/www/fonts/` :

   ```text
   /config/www/fonts/InterVariable.woff2
   /config/www/fonts/InterVariable-Italic.woff2
   /config/www/fonts/Inter-LICENSE.txt
   ```

3. Copie `nuit-flat/www/nuit-flat/inter-local.js` (dossier de ce dépôt) dans `/config/www/nuit-flat/inter-local.js`.
   Ce script déclare les `@font-face` qui pointent vers `/local/fonts/…`.
4. Ajoute `/local/nuit-flat/inter-local.js` dans `frontend: extra_module_url:`
   (voir [`commun/snippets/configuration-frontend.yaml`](../commun/snippets/configuration-frontend.yaml)), puis redémarre Home Assistant.

Sans la police, le thème reste utilisable : il retombe sur les polices système
(`system-ui`, `Segoe UI`, `Roboto`…).
