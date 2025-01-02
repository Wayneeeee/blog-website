import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';


import Heading from '@theme/Heading';
import styles from './index.module.css';

// function HomepageHeader() {
//   const {siteConfig} = useDocusaurusContext();
//   return (
//     <header className={clsx('hero hero--primary', styles.heroBanner)}>
//       <div className="container">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link
//             className="button button--secondary button--lg"
//             to="/blog">
//             文章列表 🚀
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }







export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      // title={`${siteConfig.title}`}
      title='Wayne'
      description="写点和 Crypto 有关的东西">
      {/* <HomepageHeader /> */}
      <header>
        <div className={clsx('homepagetitle', styles.homepagetitle)}>
          {/* <img src="https://pmcrypto.xyz/img/wayne.png" alt="wayne"></img> */}
        <h1>
          片面 Crypto
        </h1>
        
        <Link className={clsx('articlelistbutton', styles.articlelistbutton)}
            to="/blog">
            文章列表
          </Link>
          <Link className={clsx('articlelistbutton', styles.articlelistbutton)}
            to="/nt/2025">
            Narrative Tracking 
          </Link>


        </div>

      </header>
      <main>
        <div className={styles.quote}>
          <p></p>
        </div>
        <div className={styles.statement}>
          <p>
            made by <a href="https://pmcrypto.xyz/about-me" color='rgb(189, 164, 164)'>wayne</a> 
            </p>
        </div>
        <div className={styles.bottomtwitter}>
            <p>
              <a href="https://twitter.com/0xwayne_z">x (twitter)</a>
              <a href="mailto:zwzwkl@hotmai.com">email</a>
            </p>
          </div>
      </main>

    </Layout>
  );
}
