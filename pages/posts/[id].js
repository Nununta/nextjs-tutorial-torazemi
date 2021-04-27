import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'



export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      </Layout>
    )
  }

//getStaticPathsはNEXT.lsが用意したメソッド。
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths, //取得したオブジェクトの配列が入っている。
      fallback: false//falseを指定すると指定バス以外なら404を返す。 fallbackは指定以外のURLにアクセスがあった時の挙動を決める値
    }
  }

  export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }