<template>
  <div class="w-full h-full">
    <div class="w-[800px] mx-auto mt-24">
      <APlayer ref="playerRef" :audio="audio" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import fileService from '@/api/file'
import { getToken } from '@/utils/cookie'
// TODO 换一个播放器库
import APlayer from '@worstone/vue-aplayer'

const route = useRoute()

// 音频列表
const audio = ref([])

const playerRef = ref(null)

const addMusic = (fileList) => {
  let audioList = []
  let url = import.meta.env.VITE_BASE_URL_API + '/file/preview?fileId='
  const token = getToken()

  audioList.push({
    title: route.params.filename,
    url: url + route.params.fileId + '&Authorization=' + token,
  })

  for (const item of fileList) {
    audioList.push({
      title: item.filename,
      url: url + encodeURIComponent(item.id) + '&Authorization=' + token,
    })
  }

  audio.value = audioList
}

onMounted(() => {
  fileService.list(
    {
      parentId: route.params.parentId,
      fileTypes: '8',
    },
    (res) => {
      addMusic(res.data)
    },
    (res) => {
      ElMessage.error(res.msg)
    }
  )
})
</script>

<style scoped></style>
