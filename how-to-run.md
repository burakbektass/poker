# vue-cli

> Navigate to your Vue Project directory

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production
npm run build

## Common Issues and Solutions

### If You Get Permission Denied Error

1. Reinstall node modules:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

2. Install cross-env globally:
```bash
npm install -g cross-env
```

3. Fix permissions:
```bash
chmod -R 755 node_modules
```

Follow these steps in order. Usually one of these solutions will resolve the issue. If the problem persists, you can check your Node.js and npm versions:

```bash
node -v
npm -v
``` 