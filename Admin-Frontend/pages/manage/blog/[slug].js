import Link from 'next/link';
import dynamic from 'next/dynamic'

const BlogUpdate = dynamic(
  () => import('../../../components/blog/BlogUpdate'),
  { ssr: false }
)

const Blog = (props) => {
    props = JSON.parse(JSON.stringify(props))
    console.log('props in blog[Slug].js function: ',props);

    return (
        <BlogUpdate shop={props}/>
    );
};

export default Blog;