import classes from './Home.module.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className={classes.homeContainer}>
      <section className={classes.hero}>
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
            {/* Photo by <a href="https://unsplash.com/@caapece?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Danilo Capece</a> on <a href="https://unsplash.com/photos/NoVnXXmDNi0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */}

            <div className={classes.heroBtnContainer}>
              <Link className={classes.linkPlus} to='/products'></Link>
              <Link to='/products'>Explore More</Link>
            </div>
          </div>
        </div>
      </section>
      <section className={classes.ctaSection}>
        <div className={classes.ctaContainer}>
          <div className={classes.leftCta}>
            <img src='/shoes/blazerprm.png' alt='Nike Blazer' />
          </div>
          <div className={classes.rightCta}>
            <div>
              <h1>Get Your Shoes</h1>
              <h1>
                Now on <span>30%</span> Discount
              </h1>
            </div>
            <p>
              For a limited time only, enjoy an incredible 30% discount on all
              our sneakers. Don't miss out on this amazing offer - lace up and
              step into the world of fashionable footwear today!
            </p>
            <div className={classes.heroBtnContainer}>
              <Link className={classes.linkPlus} to='/products'></Link>
              <Link to='/products'>Explore More</Link>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className={classes.socials}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className={classes.socialLogo}
            aria-label='instagram logo'
            width='24px'
            viewBox='0 0 24 24'
            role='img'
          >
            <title>instagram</title>
            <path
              fill='#000'
              d='M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z'
            ></path>
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            aria-label='facebook logo'
            className={classes.socialLogo}
            role='img'
            width='24px'
          >
            <title>facebook</title>
            <path
              fill='#000'
              d='M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z'
            ></path>
          </svg>
          <svg
            viewBox='0 0 128 128'
            className={classes.socialLogo}
            aria-label='twitter logo'
            width='24px'
            role='img'
          >
            <path
              d='M40.254 127.637c48.305 0 74.719-48.957 74.719-91.403 0-1.39 0-2.777-.075-4.156 5.141-4.547 9.579-10.18 13.102-16.633-4.79 2.602-9.871 4.305-15.078 5.063 5.48-4.02 9.582-10.336 11.539-17.774-5.156 3.743-10.797 6.38-16.68 7.801-8.136-10.586-21.07-13.18-31.547-6.32-10.472 6.86-15.882 21.46-13.199 35.617C41.922 38.539 22.246 26.336 8.915 6.27 1.933 20.94 5.487 39.723 17.022 49.16c-4.148-.172-8.207-1.555-11.832-4.031v.41c0 15.273 8.786 28.438 21.02 31.492a21.596 21.596 0 01-11.863.543c3.437 13.094 13.297 22.07 24.535 22.328-9.305 8.918-20.793 13.75-32.617 13.72-2.094 0-4.188-.15-6.266-.446 12.008 9.433 25.98 14.441 40.254 14.422'
              fill='#000'
            ></path>
          </svg>
        </div>
        <div className={classes.infoContainer}>
          <h3>Lorem, ipsum dolor.</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            adipisci, omnis vero magnam cupiditate accusamus.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
