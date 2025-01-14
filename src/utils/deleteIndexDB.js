export const deleteIndexedDB = (databaseName) => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(databaseName);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event) => {
        console.error(`Error deleting database '${databaseName}':`, event.target.error);
        reject(event.target.error);
      };
  
      request.onblocked = () => {
        console.warn(`Database deletion is blocked. Ensure no open connections.`);
      };
    });
};