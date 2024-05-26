import { useParams } from "react-router"


export default function Post() {
    const{id} = useParams();

  return (
    <div>
      <h1>this is post : {id}</h1>
    </div>
  )
}
