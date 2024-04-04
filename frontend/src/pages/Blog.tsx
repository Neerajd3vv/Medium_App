//atomfamilies/ selectorfamilies
import {useBlogbyId}  from "../Hooks/Bloghook"
import ParticularBlog from "../components/ParticularBlog"
import { useParams } from "react-router-dom"

function Blog() {
  const {id} =  useParams()
    const {loading , blogById} = useBlogbyId({
      id: id || ""
    })
    if (loading) {
      return <div>
        loading...
      </div>
    }
  return (
    <div>
        <ParticularBlog blogById={blogById}/>
    </div>
  )
}

export default Blog 