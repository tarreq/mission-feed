type Image = {
    alt: string
    src: string
    }
  
  type Video = {
  alt: string
  src: string
  }
  
  export type IGStoryMission = {
    date: string
    title: string
    video: Video
    cashReward: number
    __typename: string
  }
  
  export type FBPostMission = {
    date: string
    title: string
    image: Image
    cashReward: number
    __typename: string
  }
  
  export type FeedItem = IGStoryMission | FBPostMission