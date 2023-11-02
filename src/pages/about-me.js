// 新增的 aboutme 也没，url 是 /about-me
import React from 'react';
import Layout from '@theme/Layout';
import styles from './about-me.module.css';


export default function Hello() {
  return (
    <Layout title="about me" description="Hello React Page">
      <div className={styles.aboutMeIntro}>
        <h1>about me</h1>
        <p>
          I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. I am Wayne. 
        </p>
      </div>
    </Layout>
  );
}