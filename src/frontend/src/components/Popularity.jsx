function Popularity() {
    const [popularity, setPopularity] = useState([])

    useEffect(() => {
        async function fetchData() {
            const popularityResponse = await fetch('http://localhost:3000/api/blog')
            const popularityData = await popularityResponse.json()
            setPopularity(popularityData)
        }
        fetchData()
    }, [])
    return (
        <div>Popularity</div>
    )
}

export default Popularity