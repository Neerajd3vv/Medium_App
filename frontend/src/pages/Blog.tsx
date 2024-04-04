//atomfamilies/ selectorfamilies
import {useBlogbyId}  from "../Hooks/Bloghook"
import ParticularBlog from "../components/ParticularBlog"
import { useParams } from "react-router-dom"
import { ParticularBlogSkeleton } from "../components/Skeleton"
import AppBar from "../components/AppBar"

function Blog() {
  const {id} =  useParams()
    const {loading , blogById} = useBlogbyId({
      id: id || ""
    })
    if (loading) {
      return <div>
        <AppBar/>
      <ParticularBlogSkeleton/>
      </div>
    }
  return (
    <div>
        <ParticularBlog blogById={blogById}/>
    </div>
  )
}

export default Blog 