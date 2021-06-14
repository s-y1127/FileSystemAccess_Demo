import { useState } from 'react'

const ImageComponents = () => {
  const [url, setUrl] = useState('')

  const save = () => {
    const img = document.getElementById('img')

    const canvas = document.createElement('canvas')
    canvas.width = img.clientWidth
    canvas.height = img.clientHeight

    const context = canvas.getContext('2d')

    context.drawImage(img, 0, 0)

    saveImage(canvas.toBlob)
  }

  async function saveImage(ImageData) {
    // const options = {
    //   type: 'saveFile', // セーブモード
    //   accepts: [
    //     {
    //       mimeTypes: ['image/png'],
    //     },
    //   ],
    // }
    const handle = await window.showSaveFilePicker()
    const writer = await handle.createWritable()
    await writer.write(0, ImageData)
    await writer.close()
  }

  return (
    <div>
      URLを指定してください
      <br />
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <br />
      <button onClick={save}>保存</button>
      <br />
      {url ? <img src={url} alt="" id="img" /> : false}
    </div>
  )
}

export default ImageComponents
