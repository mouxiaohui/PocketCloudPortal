<template>
  <div class="w-full h-full flex items-center">
    <div v-show="router.currentRoute.value.meta.collapse">
      <search />
    </div>
  </div>
</template>

<script setup>
import Search from '@/components/search/index.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped></style>
