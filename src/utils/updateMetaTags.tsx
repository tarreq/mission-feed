import { FeedItem } from "../components/Types"

const updateMetaTags = (mission: FeedItem) => {
    const metas = Array.from(document.getElementsByTagName("meta"))
    if(mission) {
      metas.find(meta => meta.getAttribute('property') === 'og:title')?.setAttribute("content", mission?.title || "")
      metas.find(meta => meta.getAttribute('property') === 'og:description')?.setAttribute("content", mission?.title || "")
      metas.find(meta => meta.getAttribute('property') === 'og:image')?.setAttribute("content", "image" in mission ? mission.image.src : "")
      metas.find(meta => meta.getAttribute('name') === 'twitter:title')?.setAttribute("content", mission?.title || "")
      metas.find(meta => meta.getAttribute('name') === 'twitter:description')?.setAttribute("content", mission?.title || "")
      metas.find(meta => meta.getAttribute('name') === 'twitter:image')?.setAttribute("content", "image" in mission ? mission.image.src : "")
    }
}

export default updateMetaTags