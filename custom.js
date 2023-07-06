import { useState ,useEffect} from "react"


const useFetch = (url) => {
    const [data, setdata] = useState(null)
    
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch(url)
                if (!res.ok) {
                    throw new Error("somthing is wrong")
                }
                const data = await res.json()
                setdata(data)
            } catch (err) {
                console.log(err)
            }       
        }       
        fetchdata()
    },[url])
    return {data}
}

export default useFetch;