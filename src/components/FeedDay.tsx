import { FeedItem as FeedItemType } from './Types'
import { useTranslation } from 'react-i18next'
import FeedItem from "./FeedItem"

type props = {
    date: string
    missions: FeedItemType[]
    lastElementRef: any
}

const FeedDay = ({date, missions, lastElementRef}: props) => {
  
  const [day, month, year] = date.split("/")
  const { t } = useTranslation()

    return (
        <div>
          <div className="mb-4 text-xl">
            <span>{day + " " + t(`months.${month}`) + " " + year}</span>
          </div>
          {missions.map((mission, index) => (
            <FeedItem key={index} mission={mission} itemRef={missions.length === index + 1 ? lastElementRef : undefined} />
          ))}
        </div>
    )
}

export default FeedDay