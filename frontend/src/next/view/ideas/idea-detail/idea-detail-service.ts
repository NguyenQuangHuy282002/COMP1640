import { Http } from 'next/api/http'

export const likeHandler = async id => {
  try {
    const result = await Http.put('/api/v1/idea/like', { ideaId: id })
    console.log(result)
  } catch (e) {
    console.error(e)
  }
}

export const disLikeHandler = async id => {
  try {
    const result = await Http.put('/api/v1/idea/dislike', { ideaId: id })
    console.log(result)
  } catch (e) {
    console.error(e)
  }
}
