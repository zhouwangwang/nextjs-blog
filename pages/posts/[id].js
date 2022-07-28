import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostsData} from "../../lib/post";
import utilStyles from  '../../styles/utils.module.css';

import { useRouter } from "next/router";

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths, 
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostsData(params.id);

    return {
        props: {
            postData
        }
    }
}

export default function Post({ postData }) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>読み込み中...</div>;
    }

    return (
        <Layout>
            <Head>
                <title>{ postData.title }</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>{postData.date}</div>
                <div dangerouslySetInnerHTML={{__html: postData.htmlContent}}/>
            </article>
        </Layout>
    );
}