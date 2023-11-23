import {Link} from 'react-router-dom';

const Post = ({ post }) => {
    return(
        <article className="pl-8 p-2 flex flex-col gap-4 border-b-4 border-indigo-500 ">
            <Link to={`/post/${post.id}`}>
                <h2 className="text-2xl hover:text-cyan-500 ">{post.title}</h2>
                <p className="italic text-sm hover:text-cyan-500">{post.datetime}</p>
            </Link>
            <p className="pb-4">
                {
                    (post.body).length <= 50 
                        ? post.body 
                        : `${(post.body).slice(0,50)}...`
                }
            </p>
        </article>
    )
}

export default Post;