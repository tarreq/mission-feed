import { FeedItem as FeedItemType } from './Types'
import FeedItem from "./FeedItem"

type props = {
    date: string
    missions: FeedItemType[]
    lastElementRef: any
}

const FeedDay = ({date, missions, lastElementRef}: props) => {
    return (
        <div>
          <div className="mb-4 text-xl">
            <span>{date}</span>
          </div>
          {missions.map((mission, index) => (
            <FeedItem key={index} mission={mission} itemRef={missions.length === index + 1 ? lastElementRef : undefined} />
          ))}
        </div>
    )
}

export default FeedDay