import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import Trending from '../components/home/Trending'
import FlashDeals from '../components/home/FlashDeals'
import Brands from '../components/home/Brands'
import Reviews from '../components/home/Reviews'
import AIPicks from '../components/home/AIPicks'
import Newsletter from '../components/home/Newsletter'

export default function Home() {
    return (
        <>
            <Hero />
            <Categories />
            <Trending />
            <FlashDeals />
            <Brands />
            <Reviews />
            <AIPicks />
            <Newsletter />
        </>
    )
}