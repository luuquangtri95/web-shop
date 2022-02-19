Run project:

- Step 1: npm i (yarn add)
- Step 2: npm start

```js
const filters = {
  salePrice_lte: '',
  salePrice_gte: '',
  category: '',
  ...
}
```

FILTER_LIST

- id: number
- getLabel (filters): function to build label
- isActive (filters): function to check active or not
- isVisible (filters): function handle visible or hidden
- isRemovable: boolean
- onRemove (filters): function handle click icon "X" in filter display
- onToggle (filters): function handle toggle field fixed
