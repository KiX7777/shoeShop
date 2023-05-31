import classes from './Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className={classes.homeContainer}>
      <section id='hero'>
        <div className={classes.heroContainer}>
          <div className={classes.left}>
            <h1>
              Explore N<span>ew</span> Things
            </h1>
            <p>
              Our selection features an extensive range of the most sought-after
              sneakers, including limited editions and rare finds. From the
              iconic Air Jordan 1 with its rich heritage and legendary
              silhouette, to the Adidas Superstar that epitomizes effortless
              cool, we offer the best of both worlds. Experience the thrill of
              browsing through our carefully curated collection, where each shoe
              tells a story and carries a legacy.
            </p>
            <div className={classes.heroBtnContainer}>
              <Link className={classes.linkPlus} to='/products'></Link>
              <Link to='/products'>Explore More</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
