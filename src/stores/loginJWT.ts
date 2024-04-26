import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoginJWT = defineStore('loginJWT', () => {
  const jwt = ref('')
  const refresh_jwt = ref('')

  

  return { jwt, refresh_jwt }
})
