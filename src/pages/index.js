import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
// import HomepageFeatures from '@site/src/components/HomepageFeatures';


import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/blog">
            文章列表 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="这里是我写东西的地方 <head />">
      <HomepageHeader />
      <main>
        <div className={styles.quote}>
          <blockquote>失败总是贯穿人生始终，这就是人生。</blockquote>
          <cite> --- DWG.ShowMaker</cite>
        </div>
        <div className={styles.statement}>
          <p>
            made by wayne
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
