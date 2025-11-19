import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
    const posts = [
        {
            id: 'notebook-copilot',
            title: 'Cursor’s Tab Model Was Failing Me in Jupyter Notebooks — So I Made My Own',
            date: new Date().toLocaleDateString(),
            excerpt:
                "I've been using Cursor's Tab model, but it doesn't work as well as I'd like for how I start my data science flows. Here's what I did to make my life easier.",
        },
    ];

    return (
        <section id="blog" className="py-32">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center tracking-tight">Blog</h2>
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <Link 
                            key={post.id} 
                            to={`/blog/${post.id}`} 
                            className="block group"
                        >
                            <article className="border border-border bg-card rounded-lg p-8 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                    <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h3>
                                    <span className="text-sm text-muted-foreground shrink-0 mt-2 md:mt-0 md:ml-4">
                                        {post.date}
                                    </span>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="mt-4 text-sm font-medium text-primary flex items-center opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                                    Read more →
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
