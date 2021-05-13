import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import marked from "marked";

const Post = ({ htmlString, data }) => {
  console.log(htmlString);
  return (
    <div style={{ margin: 10 }}>
      <Head>
        <title>{data.title}</title>
        <meta title="description" content={data.description} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      <img src={data.thumbnail} alt="thumbnail-img" />
    </div>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("post");

  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("post", slug + ".md"))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);

  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
