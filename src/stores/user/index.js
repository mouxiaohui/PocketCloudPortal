/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: -1,
      username: '',
      email: '',
    }
  },
})
