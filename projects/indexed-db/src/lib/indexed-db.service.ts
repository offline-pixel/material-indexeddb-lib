import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  fetchDbData: any = [ ];
  constructor() { }
  stream(res): any {
    return new Promise((resolve, reject) => {
      if ( window.indexedDB ){
        let openDb: any;
        const main = window.indexedDB.open(res.name, 1);
        main.onerror = (event) => {
          reject(0);
        };
        main.onsuccess = (event: any) => {
          openDb = event.target.result;
          openDb.onerror = (dbEvent) => {
            reject(0);
          };
          const getTrans = openDb.transaction(res.store);
          const getStore = getTrans.objectStore(res.store);
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
          const upgradeStore = upgradeDb.createObjectStore(res.store);
          // upgradeStore.createIndex('key', 'key', { unique: true });
          upgradeStore.transaction.oncomplete = (transactionEvent: any) => {
            const fetchObjectStore = upgradeDb.transaction(res.store, 'readwrite')
            .objectStore(res.store);
            this.fetchDbData.forEach((el) => {
              fetchObjectStore.add(el);
            });
          };
        };
      } else {
        reject(0);
      }
    });
  }

  updateDB(res){
    return new Promise((resolve, reject) => {
      if ( window.indexedDB ){
        let openDb: any;
        const main = window.indexedDB.open(res.name, 1);
        main.onerror = (me: any) => {
          reject(0);
        };
        main.onsuccess = (me: any) => {
          openDb = main.result;
          const addreq = openDb.transaction([res.store], 'readwrite')
          .objectStore(res.store)
          .put(res.data, res.key);
          addreq.onerror = (ce: any) => {
            reject(0);
          };
          addreq.onsuccess = (ce: any) => {
            resolve(1);
          };
        };
      } else {
        reject(0);
      }
    });
  }

  deleteId(res): any {
    return new Promise((resolve, reject) => {
      if ( window.indexedDB ){
        let openDb: any;
        const main = window.indexedDB.open(res.name, 1);
        main.onerror = (me: any) => {
          reject(0);
        };
        main.onsuccess = (me: any) => {
          openDb = main.result;
          const deleteReq = openDb.transaction([res.store], 'readwrite')
          .objectStore(res.store)
          .delete(res.key);
          deleteReq.onerror = (ce: any) => {
            reject(0);
          };
          deleteReq.onsuccess = (ce: any) => {
            resolve(1);
          };
        };
      } else {
        reject(0);
      }
    });
  }
}
