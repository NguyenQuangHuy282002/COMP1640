import { Http } from 'next/api/http'

export const likeHandler = async id => {
  try {
    await Http.put('/api/v1/idea/like', { ideaId: id })
  } catch (e) {
    console.error(e)
  }
}

export const omitHandler = async id => {
  try {
    await Http.put('/api/v1/idea/omitVote', { ideaId: id })
  } catch (e) {
    console.error(e)
  }
}

export const disLikeHandler = async id => {
  try {
    await Http.put('/api/v1/idea/dislike', { ideaId: id })
  } catch (e) {
    console.error(e)
  }
}
