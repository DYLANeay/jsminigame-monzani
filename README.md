# Histoire Interactive - Jeu Narratif Minimaliste

## 📁 Structure du Projet

```
jsgametest/
├── index.html              # Point d'entrée HTML
├── style.css               # Styles CSS
├── back.jpg                # Image de fond (existante)
├── images/                 # Dossier pour vos images d'histoire
│   └── (placez vos images ici)
├── js/                     # Modules JavaScript
│   ├── main.js            # Point d'entrée principal
│   ├── config.js          # Configuration du jeu
│   ├── character.js       # Logique du personnage
│   ├── camera.js          # Gestion de la caméra
│   ├── storyData.js       # Données des histoires
│   ├── storyManager.js    # Gestion des points d'histoire
│   ├── renderer.js        # Rendu graphique
│   └── input.js           # Gestion des entrées
└── README.md              # Ce fichier
```

## 🎮 Fonctionnalités

- ✅ Personnage en bâton **avec visage** (yeux et sourire)
- ✅ **Plus grand** et mieux animé
- ✅ Architecture modulaire et extensible
- ✅ Points d'histoire (texte et images)
- ✅ Caméra qui suit le personnage
- ✅ Mode automatique et manuel

## 📝 Comment Ajouter du Contenu

### Ajouter une Histoire (Texte)

Éditez `js/storyData.js` :

```javascript
{
  position: 7200,  // Position dans le monde
  type: 'text',
  title: 'Nouveau Chapitre',
  content: 'Votre texte ici...'
}
```

### Ajouter une Image

1. Placez votre image dans le dossier `images/`
2. Éditez `js/storyData.js` :

```javascript
{
  position: 3000,
  type: 'image',
  title: 'Mon Image',
  imageSrc: 'images/mon-image.jpg',
  content: 'Description optionnelle'
}
```

## ⚙️ Configuration

Éditez `js/config.js` pour modifier :

- `characterSpeed` : Vitesse du personnage
- `storyInterval` : Distance entre les histoires
- `worldLength` : Longueur totale du monde

## 🚀 Lancer le Jeu

Ouvrez simplement `index.html` dans votre navigateur !

## 🎨 Personnalisation

### Modifier le Personnage

Éditez `js/character.js` - méthode `draw()`

### Modifier l'Arrière-plan

Éditez `js/renderer.js` - méthode `drawBackground()`

### Ajouter des Éléments Visuels

Créez une nouvelle classe dans `js/` et importez-la dans `main.js`
