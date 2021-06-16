import { useState } from 'react'

const ImageComponents = () => {
  const [imgUrl, setImgUrl] = useState('')
  const [dirText, setDirText] = useState('')
  const [dirHandle, setDirHandle] = useState(null)

  async function openDir() {
    try {
      const handle = await window.showDirectoryPicker()
      setDirHandle(handle)
      setDirText(handle.name)
    } catch (e) {}
  }

  async function saveImg() {
    if (!imgUrl) return false
    if (dirHandle) {
      save(imgUrl, '')
      // const INIT = 0
      // const MAX = 1000
      // const CHUNK = 100
      // let promises = []

      // console.log(`開始時間 ${new Date()}`)
      // for (let index = INIT; index < MAX; index++) {
      //   promises.push(save(imgUrl, index))

      //   if ((index + 1) % CHUNK === 0) {
      //     await Promise.all(promises)
      //     promises = []
      //   }
      // }
      // console.log(`終了時間時間 ${new Date()}`)
    } else {
      alert('保存先を選択してください')
    }
  }

  async function save(url, num) {
    const fileHandle = await dirHandle.getFileHandle(`test${num}.png`, {
      create: true,
    })
    const writable = await fileHandle.createWritable()
    const response = await fetch(url)
    await response.body.pipeTo(writable)
  }

  const onChangeImgUrl = (e) => {
    setImgUrl(e.target.value)
  }

  return (
    <div>
      <button className="directory" type="button" onClick={openDir}>
        Open directory
      </button>
      <pre className="directory">{dirText}</pre>
      <br />
      <input type="url" value={imgUrl} onChange={onChangeImgUrl} />
      <button onClick={saveImg}>保存</button>
      <br />
      {imgUrl && <img src={imgUrl} alt="" id="img" />}
    </div>
  )
}

export default ImageComponents
