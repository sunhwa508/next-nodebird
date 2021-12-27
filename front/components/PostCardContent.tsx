import React from "react";
import Link from "next/link";
import shortid from "shortid";
interface Props {
  postData: string;
}
const PostCardContent = ({ postData }: Props) => (
  <div>
    {/* regexr */}
    {postData?.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} key={shortid.generate()}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

export default PostCardContent;
