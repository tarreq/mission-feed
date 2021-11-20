import { FeedItem as FeedItemType } from './Types'
import FeedItem from "./FeedItem"

type props = {
    date: string
    missions: FeedItemType[]
}

const FeedDay = ({date, missions}: props) => {
    return (
        <div>
          <div className="mb-4 text-xl"><span>{date}</span></div>
          {missions.map((mission, index) => (
            <FeedItem key={index} mission={mission} />
          ))}
        </div>
    )
}

export default FeedDay