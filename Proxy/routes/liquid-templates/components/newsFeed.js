const proxyRoute = process.env.PROXY_ROUTE;

exports.newsFeed = ({shop, blogs}) => {
    const showLoadedBlogs = () => {
        return blogs.map((blog, i) => `
                <div class="pure-u-1">
                    <div class="l-box community-card">
                        <div class="community-author">Posted by ${blog.postedBy.name}</div>
                        <h3><a href="${proxyRoute}/blog/${blog.slug}">${blog.title}</a></h3>
                        ${blog.coverMedia ? "<img src='"+blog.coverMedia+"'/>" : '<br/>'}
                        <p>${blog.mdesc}</p>
                        <div class="community-card-comments">3 comments</div>
                        <a href='https://${shop.shopify_domain+proxyRoute}/user/profile?slug=${blog.slug}&email={{ customer.email }}&name={{ customer.name }}&hash={{ customer.email | append: "somecrazyhash" | md5 }}#/add-comment'>
                            <input type="text" class="community-instant-post" placeholder="Add Comment" />
                        </a>
                     </div>
                </div>
            `).join('');
    };

    return `
        <div class="pure-u-2-3">
            <div class="community-pad-20">
                <div class="community-card">
                    <div class="community-card-body">
                        <a href='https://${shop.shopify_domain+proxyRoute}/user/profile?email={{ customer.email }}&name={{ customer.name }}&hash={{ customer.email | append: "somecrazyhash" | md5 }}'>
                            <input type="text" class="community-instant-post" placeholder="Create Post" />
                        </a>
                    
                    </div>
                </div>
                <div class="pure-g">${showLoadedBlogs()}</div>
            </div>
        </div>
        `
};


