import BestSeller from "../components/BestSeller"
import Hero from "../components/Hero"
import LatestCollecton from "../components/LatestCollecton"
import NewsLetterBox from "../components/NewsLetterBox"
import OurPolicy from "../components/OurPolicy"
// import NavBar from "../components/NavBar"

function Home() {
    return (
        <div>
            {/* <NavBar /> */}
            <Hero />
            <LatestCollecton />
            <BestSeller />
            <OurPolicy />
            <NewsLetterBox />
        </div>
    )
}

export default Home

