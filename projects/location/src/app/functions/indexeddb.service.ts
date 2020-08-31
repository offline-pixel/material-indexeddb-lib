import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexeddbService {
  locationData: any = [ ];
  constructor() { }

  createOrRetreive(): any {
    return new Promise((resolve, reject) => {
      if ( window.indexedDB ){
        let openDb: any;
        const main = window.indexedDB.open('qssTechnosoft', 1);
        main.onerror = (event) => {
          reject(0);
        };
        main.onsuccess = (event: any) => {
          openDb = event.target.result;
          openDb.onerror = (dbEvent) => {
            reject(0);
          };
          const getTrans = openDb.transaction(['location']);
          const getStore = getTrans.objectStore('location');
          const getAllReq = getStore.getAll();
          getAllReq.onerror = (getAllEvent: any) => {
            reject(0);
          };
          getAllReq.onsuccess = (getAllEvent: any) => {
            resolve(getAllReq.result);
          };
        };
        main.onupgradeneeded = (event: any) => {
          const upgradeDb = event.target.result;
          const upgradeStore = upgradeDb.createObjectStore('location');
          // upgradeStore.createIndex('mobilenumber', 'mobilenumber', { unique: true });
          upgradeStore.transaction.oncomplete = (transactionEvent: any) => {
            const locationObjectStore = upgradeDb.transaction('location', 'readwrite').objectStore('location');
            this.locationData.forEach((location) => {
              locationObjectStore.add(location);
            });
          };
        };
      }
    });
  }

  addToStore(loc){
    return new Promise((resolve, reject) => {
      if ( window.indexedDB ){
        let openDb: any;
        const main = window.indexedDB.open('qssTechnosoft', 1);
        main.onerror = (me: any) => {
          reject(0);
        };
        main.onsuccess = (me: any) => {
          openDb = main.result;
          const addreq = openDb.transaction(['location'], 'readwrite')
          .objectStore('location')
          .put(loc.data, loc.mob);
          addreq.onerror = (ce: any) => {
            reject(0);
          };
          addreq.onsuccess = (ce: any) => {
            resolve(1);
          };
        };
      }
    });
  }

  deleteId(d): any {
    return new Promise((resolve, reject) => {
      let openDb: any;
      const main = window.indexedDB.open('qssTechnosoft', 1);
      main.onerror = (me: any) => {
        reject(0);
      };
      main.onsuccess = (me: any) => {
        openDb = main.result;
        const deleteReq = openDb.transaction(['location'], 'readwrite')
        .objectStore('location')
        .delete(d.mobilenumber);
        deleteReq.onerror = (ce: any) => {
          reject(0);
        };
        deleteReq.onsuccess = (ce: any) => {
          localStorage.setItem('c', '1');
          resolve(1);
        };
      };
    });
  }


}
