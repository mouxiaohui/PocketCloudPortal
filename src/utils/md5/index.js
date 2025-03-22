/**
 * Created by xiaohui on 2025/03/07.
 */

'use strict'

import sparkMD5 from 'spark-md5'

/**
 * 计算文件的MD5值
 * 
 * 该函数使用spark-md5库，将文件分块并行计算MD5，以提高大文件的处理效率
 * @param {File} file - 要计算MD5的文件对象
 * @param {Function} callback - 回调函数，接受两个参数：错误信息（无错误时为null）和计算出的MD5值
 */
export function MD5(file, callback) {
  // 获取文件切片方法，兼容不同浏览器
  var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
    file = file,
    chunkSize = Number(import.meta.env.VITE_CHUNK_SIZE), // 每个切片的大小
    chunks = Math.ceil(file.size / chunkSize), // 计算需要切分的块数
    currentChunk = 0, // 当前正在处理的块号
    spark = new sparkMD5.ArrayBuffer(), // 创建spark-md5实例，用于处理ArrayBuffer类型的MD5计算
    fileReader = new FileReader() // 创建FileReader实例，用于异步读取文件内容

  // 文件读取成功时的回调函数
  fileReader.onload = function (e) {
    spark.append(e.target.result) // 将读取到的文件块内容追加到spark-md5实例中
    currentChunk++ // 处理下一个块
    if (currentChunk < chunks) {
      loadNext() // 如果还有未处理的块，则加载下一个块
    } else {
      callback(null, spark.end()) // 所有块处理完毕，调用回调函数返回MD5值
    }
  }

  // 文件读取错误时的回调函数
  fileReader.onerror = function () {
    callback('oops, something went wrong.') // 发生错误，调用回调函数返回错误信息
  }

  // 加载下一个文件块的方法
  function loadNext() {
    var start = currentChunk * chunkSize, // 计算当前块的起始位置
      end = start + chunkSize >= file.size ? file.size : start + chunkSize // 计算当前块的结束位置
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end)) // 读取当前块的文件内容作为ArrayBuffer
  }

  loadNext() // 开始加载第一个文件块
}
