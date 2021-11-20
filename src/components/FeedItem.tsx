import { useTranslation } from 'react-i18next'
import { FeedItem as FeedItemType } from './Types'

type FeedItemProps = {
  mission: FeedItemType
  itemRef: any
}

const FeedItem = ({mission, itemRef}: FeedItemProps) => {
  const { t } = useTranslation()
    return (
        <div className="relative bg-gray-100 shadow-md rounded-lg mb-8 flex flex-col h-80 font-roboto">
          <div className="h-4/6 bg-cover" style={"image" in mission ? {backgroundImage: `url(${mission.image.src})`} : undefined}>
            <div className="absolute top-2 right-2 bg-gray-100 rounded-md px-1 text-sm flex align-center space-x-1 z-50">
              <span>{t('cash')}</span>
              <span className="text-xxs">&#9679;</span>
              <img src={`/icons/${mission.__typename === 'FBPostMission' ? 'fb' : 'ig'}.svg`} alt="icon" />
            </div>
            {"video" in mission && 
              <div className="relative z-10">
                <video controls className="object-cover h-52 w-full">
                  <source src={mission.video.src} type="video/mp4" />
                </video>
              </div>
            }
          </div>
          <div className="h-2/6 rounded-b-lg flex flex-col justify-between">
            <div className="text-xl mx-2 my-1">
              {mission.title}
            </div>
            <div ref={itemRef || undefined} className="text-lg mx-2 my-1 flex justify-center bg-white rounded-md p-2 mb-2">
              <img className="mr-1" src="/icons/gift.svg" alt="icon" />
              <span className="mr-1 text-sm font-semibold">{t('reward')}</span>
              <span className="text-sm">$ {mission.cashReward}</span>
            </div>
          </div>
        </div>
    )
}

export default FeedItem
