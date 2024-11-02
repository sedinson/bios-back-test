## Actividad

Intentar cambiar el id actual que se genera con el length del array y crearlo usando la libreria de [uuid](https://www.npmjs.com/package/uuid)

Reemplazar este codigo:
```javascript
const user = { ...req.body, id: users.length + 1 };
```

Y usar algo como:
```javascript
const user = { ...req.body, id: uuidV4() };
```

Recuerda que la idea es que en el proceso de instalacion la libreria quede en el package.json