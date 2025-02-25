/**
 * Created by xiaohui on 2025/02/25.
 */

'use strict'

import useUserStore from './user/index'

export default function useStore() {
  return {
    userStore: useUserStore(),
  }
}
