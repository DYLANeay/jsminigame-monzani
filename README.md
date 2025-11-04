# Histoire Interactive - Jeu Narratif Minimaliste

Un jeu narratif en 2D noir et blanc qui raconte l'histoire d'un débat écologique sur les livres papier vs Kindle, ponctué de 4 photos personnelles.

## 📁 Structure du Projet

```
jsgametest/
├── index.html              # Point d'entrée HTML
├── style.css               # Styles CSS minimalistes
├── images/                 # Photos personnelles (4 requis)
│   ├── photo1.jpg         # Pile de livres
│   ├── photo2.jpg         # Kindle allumé
│   ├── photo3.jpg         # Déchets électroniques
│   └── photo4.jpg         # Livre + Kindle ensemble
├── js/                     # Modules JavaScript
│   ├── main.js            # Point d'entrée principal
│   ├── config.js          # Configuration du jeu
│   ├── character.js       # Logique du personnage avec émotions
│   ├── camera.js          # Gestion de la caméra
│   ├── storyData.js       # 8 points d'histoire
│   ├── storyManager.js    # Gestion des points d'histoire
│   ├── renderer.js        # Rendu graphique
│   ├── input.js           # Gestion des entrées
│   └── decorations.js     # Décorations contextuelles + photos
└── README.md              # Ce fichier
```

## 📸 Photos Requises

Le jeu nécessite **4 photos personnelles** à placer dans `images/` :

### Photo 1 (`photo1.jpg`) - Zone des Livres Papier (position ~3000px)

- **Sujet** : Pile de 3-4 livres
- **Angle** : Vue de dessus à 45° (plongée)
- **Éclairage** : Lumière naturelle
- **Format** : Horizontal (400x300px recommandé)
- **Apparaît** : Chapitre 3 - "Les livres papier"

### Photo 2 (`photo2.jpg`) - Zone Kindle (position ~4300px)

- **Sujet** : Kindle avec écran allumé
- **Angle** : 3/4 (légèrement de côté)
- **Éclairage** : Lumière douce pour voir l'écran
- **Format** : Horizontal ou carré (400x300px)
- **Apparaît** : Chapitre 4 - "La liseuse électronique"

### Photo 3 (`photo3.jpg`) - Zone Déchets (position ~5400px)

- **Sujet** : Vieux appareils électroniques cassés
- **Angle** : Vue de dessus (plongée)
- **Éclairage** : Contraste élevé pour souligner l'aspect "déchet"
- **Format** : Horizontal (400x300px)
- **Apparaît** : Chapitre 5 - "Les déchets électroniques"

### Photo 4 (`photo4.jpg`) - Zone Conclusion (position ~8900px)

- **Sujet** : Main tenant un livre papier ET une Kindle côte à côte
- **Angle** : Vue frontale
- **Éclairage** : Équilibré sur les deux objets
- **Format** : Horizontal (400x300px)
- **Apparaît** : Chapitre 8 - "La conclusion harmonieuse"

> **Note** : Si une photo n'est pas trouvée, un placeholder avec bordure en pointillés s'affiche automatiquement.

## 🎮 Fonctionnalités

- ✅ Personnage en bâton avec **7 expressions faciales**
- ✅ Émotions qui changent selon l'histoire (curieux, neutre, pensif, inquiet, surpris, contemplatif, sage)
- ✅ Clignement automatique des yeux toutes les 3 secondes
- ✅ Architecture modulaire ES6
- ✅ 8 points d'histoire espacés de 1200px
- ✅ Caméra qui suit le personnage en douceur
- ✅ Décorations contextuelles (arbres, pluie, livres, Kindle, poubelles, etc.)
- ✅ **4 photos personnelles** intégrées dans le récit
- ✅ Mode auto-walk et contrôle manuel (flèches)

## 📝 Structure de l'Histoire

Le jeu comporte **8 chapitres** répartis sur 10 200 pixels :

1. **0-1200px** : Introduction - Achat de la Kindle (émotion: curieux)
2. **1200-2400px** : Question écologique (émotion: neutral)
3. **2400-3600px** : Les livres papier → **PHOTO 1**
4. **3600-4800px** : La liseuse électronique → **PHOTO 2**
5. **4800-6000px** : Les déchets électroniques → **PHOTO 3**
6. **6000-7200px** : Le point de bascule (nombres: 25, 50, 10 livres)
7. **7200-8400px** : La nuance (mix livres + Kindles)
8. **8400-9600px** : La conclusion → **PHOTO 4**

## ⚙️ Configuration

Éditez `js/config.js` pour modifier :

```javascript
export const CONFIG = {
  characterSpeed: 3, // Vitesse du personnage
  storyInterval: 1200, // Distance entre chapitres
  worldLength: 10200, // Longueur totale du monde
};
```

## 🚀 Lancer le Jeu

1. Ajoutez vos 4 photos dans le dossier `images/`
2. Ouvrez `index.html` dans un navigateur moderne
3. Utilisez les **flèches** ou le bouton **Auto-Walk** pour avancer

## 🎨 Style Minimaliste

- **Couleurs** : Noir et blanc uniquement
- **Police** : Courier New (monospace)
- **Esthétique** : Bâton, sans bordures arrondies
- **Arrière-plan** : Blanc pur (#ffffff)

## 🛠️ Développement

### Modifier les Émotions du Personnage

Éditez `js/character.js` - méthode `drawFace(emotion)` :

```javascript
case 'happy':
  // Dessiner expression heureuse
  break;
```

### Ajouter des Décorations

Éditez `js/decorations.js` - méthode `draw()` :

```javascript
if (characterX > 5000 && characterX < 6000) {
  this.drawCustomDecoration(ctx, x, y);
}
```

### Modifier l'Histoire

Éditez `js/storyData.js` :

```javascript
export const STORY_POINTS = [
  {
    position: 1200,
    text: 'Nouveau chapitre',
    emotion: 'surprised',
  },
];
```

## 📚 Sources

Les informations sur l'impact écologique des livres papier vs liseuses électroniques proviennent des sources suivantes :

### Articles et Analyses

1. **L'Avenir du Bon** - Liseuse vs livre papier : qui va gagner le combat écologique ?
   - [https://www.laveniradubon.fr/culture-loisirs/liseuse-vs-livre-papier-qui-va-gagner-le-combat-ecologique](https://www.laveniradubon.fr/culture-loisirs/liseuse-vs-livre-papier-qui-va-gagner-le-combat-ecologique)

2. **Mavana** - Liseuse ou livre papier : impacts environnementaux
   - [https://mavana.earth/liseuse-livre-papier-impacts-environnementaux/](https://mavana.earth/liseuse-livre-papier-impacts-environnementaux/)

3. **ENAP** - Bibliothèque - Lecture et environnement
   - [https://bibliotheque.enap.ca/fr/lectureNouvelle.aspx?idNews=14275](https://bibliotheque.enap.ca/fr/lectureNouvelle.aspx?idNews=14275)

4. **CIRAIG** - Quelle est l'option la plus environnementale pour lire un livre ?
   - [https://ciraig.org/index.php/fr/blogue/quelle-est-loption-la-plus-environnementale-pour-lire-un-livre/](https://ciraig.org/index.php/fr/blogue/quelle-est-loption-la-plus-environnementale-pour-lire-un-livre/)

5. **Librinova** - Produire un eBook est-il plus écologique qu'imprimer un livre papier ?
   - [https://www.librinova.com/blog/produire-un-ebook-est-il-plus-ecologique-quimprimer-un-livre-papier/](https://www.librinova.com/blog/produire-un-ebook-est-il-plus-ecologique-quimprimer-un-livre-papier/)

6. **Greenweez** - Livre vs liseuse : que privilégier entre écologie et rémunération de l'auteur ?
   - [https://www.greenweez.com/magazine/livre-vs-liseuse-que-privilegier-ecologie-et-remuneration-de-lauteur-48403/](https://www.greenweez.com/magazine/livre-vs-liseuse-que-privilegier-ecologie-et-remuneration-de-lauteur-48403/)

### Études Scientifiques (Springer)

7. **Life cycle assessment of a book and an e-book** (2017)
   - [https://link.springer.com/article/10.1007/s11367-017-1417-5](https://link.springer.com/article/10.1007/s11367-017-1417-5)

8. **Life cycle assessment of e-book reading devices** (2011)
   - [https://link.springer.com/article/10.1007/s11367-011-0254-1](https://link.springer.com/article/10.1007/s11367-011-0254-1)

9. **Life cycle assessment of an e-reader and a conventional book** (2011)
   - [https://link.springer.com/article/10.1007/s11367-011-0255-0](https://link.springer.com/article/10.1007/s11367-011-0255-0)

> Les sources sont également affichées à la fin du parcours dans le jeu (position ~9800px).
