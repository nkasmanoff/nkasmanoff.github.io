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
        <section id="blog" className="py-16">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Blog</h2>
                <div className="grid gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="border border-border/40 rounded-lg p-6 hover:border-primary/50 transition-colors"
                        >
                            <Link to={`/blog/${post.id}`} className="block">
                                <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                                <p className="text-muted-foreground mb-4">{post.date}</p>
                                <p className="text-muted-foreground">{post.excerpt}</p>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
