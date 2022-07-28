/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout'
import utilStyle from  '../styles/utils.module.css'
import { getAllPostsData } from '../lib/post'

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getAllPostsData();

  return {
    props: {
      allPostsData
    }
  };
}

// // SSRの場合
// export async function getServerSideProps(context) {
  
//   return {
//     props: {

//     }
//   }
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{ siteTitle }</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          私はNext.jsエンジニアです/好きなフレームワークはNext.jsです
        </p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={thumbnail} className={styles.thumbnailImage} alt="" />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
