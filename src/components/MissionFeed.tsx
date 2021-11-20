import { useEffect, useState, useRef, useCallback } from "react"
import { FeedItem } from './Types'
import i18n from 'i18next'

import FeedDay from "./FeedDay"
import {
  useQuery,
  gql
} from "@apollo/client"
import LanguageSelector from "./LanguageSelector"

export default function MissionFeed() {

  const pageSize = 4
  const [missions, setMissions] = useState<FeedItem[]>([])
  const [offset, setOffset] = useState<number>(0)
  const [hasNext, setHasNext] = useState<boolean>(true)
  const [dates, setDates] = useState<string[]>([])
  const [currentLang, setCurrentLang] = useState<string>(i18n.language)

  // Infinite scroll observer
  const observer = useRef<IntersectionObserver>()
  const lastMissionElementRef= useCallback(node => {
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting) {
        fetchNext()
      }
    })
    if(node) observer.current.observe(node)
  },[missions])

  // gql getMissions query
  const getMissions = gql`
  query {
    getFeed(input: {limit: ${pageSize}, offset: ${offset} }) {
      items{
      __typename
        ... on IGStoryMission {
          date
          title
          video {
            alt
            src
          }
          cashReward
        }
        ... on FBPostMission {
          date
          title
          image {
            alt
            src
          }
          cashReward
        }
      },
      hasNextPage
    }
  }
  `
  const { loading, error, data } = useQuery(getMissions, {skip: !hasNext})

  useEffect(() => {
    if(data) {
      setMissions([...missions, ...data?.getFeed?.items])
      setHasNext(data?.getFeed?.hasNextPage)
    }
  }, [data])

  // For every fetch patch, get unique dates to group missions by
  useEffect(() => {
    const allDates = missions.map(mission => {
      const date = new Date(mission.date)
      return date.toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' })
    })
    setDates(Array.from(new Set(allDates)))
  }, [missions])

  const fetchNext = () => {
    setOffset(missions?.length)
  }

  if(error) {
    console.log("Error occured!", error)
  }

  const metas = Array.from(document.getElementsByTagName("meta"))
  const metaData: FeedItem = missions[missions.length - 1] 
  if(metaData) {
    metas.find(meta => meta.getAttribute('property') === 'og:title')?.setAttribute("content", metaData?.title || "")
    metas.find(meta => meta.getAttribute('property') === 'og:description')?.setAttribute("content", metaData?.title || "")
    metas.find(meta => meta.getAttribute('property') === 'og:image')?.setAttribute("content", "image" in metaData ? metaData.image.src : "")
    metas.find(meta => meta.getAttribute('name') === 'twitter:title')?.setAttribute("content", metaData?.title || "")
    metas.find(meta => meta.getAttribute('name') === 'twitter:description')?.setAttribute("content", metaData?.title || "")
    metas.find(meta => meta.getAttribute('name') === 'twitter:image')?.setAttribute("content", "image" in metaData ? metaData.image.src : "")
  }
  

  return (
    <div className="min-h-screen py-6 flex flex-col justify-start sm:py-12">
      <LanguageSelector currentLang={currentLang} setCurrentLang={setCurrentLang} />
      {dates.map((day, index) => {
        const dayMissions = missions.filter(mission => new Date(mission.date)
          .toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' }) === day)
        return <FeedDay 
          key={index} 
          date={day} 
          missions={dayMissions} 
          lastElementRef={lastMissionElementRef}
          />
      })}
      { loading && 
      <div className="flex justify-center">
        <img style={{width: "35px", height: "35px"}} src="/images/spinner.gif" alt="spinner" />
      </div>
      }
    </div>
  )
}
