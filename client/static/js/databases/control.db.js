const db = {
    connect: {
        name: 'dmp',
        db: undefined,
        isdbavailable: false
    },

    open: async function () {
        let opendb = window.indexedDB.open(this.connect.name);
        opendb.onsuccess = () => {
            let onsuccessdb = opendb.result;
            this.connect.db = onsuccessdb
            this.connect.isdbavailable = true

            if (!onsuccessdb.objectStoreNames.contains('music')) {
                onsuccessdb.createObjectStore('music', {});
            }
        };

        opendb.onupgradeneeded = () => {
            let onsuccessdb = opendb.result;
            if (!onsuccessdb.objectStoreNames.contains('music')) {
                onsuccessdb.createObjectStore('music', {});
            }
        };
    },
    
    insert: async function (key, object) {
        let transaction = this.connect.db.transaction("music", "readwrite");
        let objectStore = transaction.objectStore("music")

        let request = objectStore.add(object, key)

        request.onsuccess = function() { 
            console.log("Saved");
        };
        
        request.onerror = function() {
            console.log("Error");
        };
    },
    
    select: async function (key) {
        let transaction = this.connect.db.transaction("music", "readwrite");
        let objectStore = transaction.objectStore("music")
        let request = objectStore.get(key)

        const data = await new Promise((resolve, reject) => {
            request.onsuccess = function(e) {
                resolve(e.target.result)
            };
        })
        
        return data

    }
}



export default db