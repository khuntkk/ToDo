// IndexedDB helper class
export default class TodoDB {
    constructor() {
      this.dbName = 'TodoApp'
      this.version = 1
      this.storeName = 'todos'
      this.db = null
    }
  
    async init() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version)
  
        request.onerror = () => reject(request.error)
        request.onsuccess = () => {
          this.db = request.result
          resolve()
        }
  
        request.onupgradeneeded = (event) => {
          const db = event.target.result
          if (!db.objectStoreNames.contains(this.storeName)) {
            const store = db.createObjectStore(this.storeName, { keyPath: 'id' })
            store.createIndex('completed', 'completed')
          }
        }
      })
    }
  
    async getAllTodos() {
      const transaction = this.db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      return new Promise((resolve, reject) => {
        const request = store.getAll()
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      })
    }
  
    async addTodo(todo) {
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      return new Promise((resolve, reject) => {
        const request = store.add(todo)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    }
  
    async updateTodo(todo) {
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      return new Promise((resolve, reject) => {
        const request = store.put(todo)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    }
  
    async deleteTodo(id) {
      const transaction = this.db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      return new Promise((resolve, reject) => {
        const request = store.delete(id)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
    }
  }