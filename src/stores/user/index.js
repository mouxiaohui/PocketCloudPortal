/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const username = ref('')
    const email = ref('')

    function setUsername(newUsername) {
      username.value = newUsername
    }

    function setEmail(newEmail) {
      email.value = newEmail
    }

    function clear() {
      username.value = ''
      email.value = ''
    }

    return {
      username,
      email,
      setUsername,
      setEmail,
      clear,
    }
  },
  {
    persist: true, // 持久化
  }
)
