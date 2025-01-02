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
          我是 Wayne，平时会对 Crypto 的内容做一些追踪和研究，有时间的时候会写一点东西。这里就是我写东西发布的地方。
        </p>
        <p>
          毕业之后，因为巧合，我很快就进入 Crypto 这个行业，并且加入了数据分析公司 TokenInsight。
        </p>
        <p>
          2024 年，我现在已经从 TokenInsight 离开。
        </p>
        <p>
          如果你想和我取得联系，你可以通过以下方式：
          <ul>
            <li><a href='https://twitter.com/0xwayne_z' target='_blank'>X (Twitter)</a></li>
            <li><a href='https://t.me/narrative_tracking' target='_blank'>Telegram</a></li>
            <li><a href='mailto:zwzwkl@hotmail.com' target='_blank'>Email</a></li>
          </ul>
        </p>
      </div>
    </Layout>
  );
}