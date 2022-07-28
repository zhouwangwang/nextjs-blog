import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getAllPostsData() {
    const fileNames = fs.readdirSync(postDirectory);
    const allPostData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, "");

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContent);

        // idとメタデータを返す
        return {id, ...matterResult.data};
    });

    return allPostData;
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postDirectory);
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, "")
            }
        }
    });
}

// IDを基づいてブログ投稿データを返す
export async function getPostsData(id) {
    const filePath = path.join(postDirectory, `${id}.md`);
    const file = matter(fs.readFileSync(filePath, "utf8"));
    const content = await remark().use(html).process(file.content);
    const htmlContent = content.toString();

    return {id, htmlContent, ...file.data }
}