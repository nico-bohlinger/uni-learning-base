# uni-learning-base

## Setup
### Initialize node modules
Run "npm install"

### Project name
Change all occurences of the name foo123 to the new project name in the following files:
- .firebaserc
- package-lock.json
- package.json
- public/index.html
- public/manifest.json
- src/components/app/App.tsx

### Version number
Reset the version number in src/components/app/App.tsx

### Color
Run "cd src/style"
Run "python calc-colors.py '#......'" with the desired main color in hex

### Logo
Replace favicon.ico, logo192.png and logo512.png in /public

### Initialize Firebase
- Todo


## Workflow
1. Set PRODCUTION in src/components/app/App.tsx to false
2. Run "npm start"
3. Add chapters, questions and corresponding pictures in /src/data
4. Stop "npm start"
5. Increment version number in src/components/app/App.tsx
6. Set PRODCUTION in src/components/app/App.tsx to true
7. Run "npm run build"
8. Optional: Check run "firebase serve"
9. Run "firebase deploy"
