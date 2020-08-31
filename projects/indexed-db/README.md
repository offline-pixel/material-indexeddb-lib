# IndexedDb | Angular
It is one of the lightweight(packed:~28KB) and fastest NPM without any dependencies. A developer can use it for implementing CRUD operations with indexedDb. It is not only fast and lightweight, It is easiest to implement in angular projects. It returns a promise either will resolve or reject. Any issue's/suggestion's can be raised via [github](https://github.com/offline-pixel/idb-lib).

## Future releases
Future releases of this library will include some out-of-the-box implementation and right now, we are looking for funding. Without funding our major builds are getting delayed.

## Installation
```
    npm i idb-lib
```

## Usage
in your ```*.module.ts``` file
```javascript
    import { IndexedDbService } from 'indexed-db';
    @NgModule({
    ...
        providers: [
            IndexedDbService
        ],
    ...
    })
```

#### 1. Create/Register/Fetch in indexedDb
in your ```*.component.ts``` file with ``` this.idb.stream() ```

```javascript
    import { IndexedDbService } from 'indexed-db';
    export class *Component {
        res = {
            name: 'main',
            store: 'child'
        }
        constructor( private idb: IndexedDbService ) {
            this.idb.stream(this.res).then(data => {
                if ( data === undefined || data.length === 0 ) {
                    // Do something
                    return;
                }
                // Do something
            });
        }
    }
```

#### 2. Add/Update record in indexedDb
in your ```*.component.ts``` file with ``` this.idb.updateDB() ```

```javascript
    import { IndexedDbService } from 'indexed-db';
    export class *Component {
        res = {
            name: 'main',
            store: 'child',
            key: 'uniqueValue',
            data: yourData // { name, email, mob } ref: destructuring
        }
        constructor( private idb: IndexedDbService ) {
            this.idb.updateDB(this.res).then(data => {
                if ( data === undefined || data.length === 0 ) {
                    // Do something
                    return;
                }
                // Do something
            });
        }
    }
```

#### 3. Delete a record in indexedDb
in your ```*.component.ts``` file with ``` this.idb.deleteId() ```

```javascript
    import { IndexedDbService } from 'indexed-db';
    export class *Component {
        res = {
            name: 'main',
            store: 'child',
            key: 'uniqueValue'
        }
        constructor( private idb: IndexedDbService ) {
            this.idb.deleteId(this.res).then(data => {
                if ( data === undefined || data.length === 0 ) {
                    // Do something
                    return;
                }
                // Do something
            });
        }
    }
```


#### Note: **It rejects whenever an operation fails and returns an empty array without any error messages. However, ERP can requests for the same. Also, peerDependencies and devDependencies are listed in package.json**

<!-- ## License(V0.0.2) -->
<!-- Proprietary licence: Traditional use of copyright; no rights need be granted. -->
## Donation
Keep this account funded for open-source contributions and it will fasten our processes for other libraries/project as well.

```paypal.me/dranolia```
Be a [patreon](https://www.patreon.com/deepak_ranolia)
