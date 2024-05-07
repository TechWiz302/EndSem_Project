import React from 'react'
import "./Blog.css"
import blog_1 from "../../assets/images/blog/blog-1.jpg"
import blog_2 from "../../assets/images/blog/blog-2.jpg"
import blog_3 from "../../assets/images/blog/blog-3.jpg"

const Blog = () => {
    return (
        <>
            <section className="blog-section pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h6 className="sub-title">Blog & News</h6>
                                <h2>Blog & Article</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="blog-single-item">
                                <div className="blog-image">
                                    <a href="single-blog.html">
                                        <img src={blog_1} alt="image" />
                                    </a>
                                </div>
                                <div className="blog-description">
                                    <ul className="blog-list">
                                        <li>
                                            <a href="#"><i className="fa-solid fa-tags"></i> Healthcare</a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fas fa-calendar-week"></i>  20 June 2023</a>
                                        </li>
                                    </ul>
                                    <div className="blog-content">
                                        <h3>
                                            <a href="single-blog.html">
                                                What to Know About Medicare and Weight Loss Programs
                                            </a>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor et dolore aliqua</p>
                                        <div className="blog-btn">
                                            <a href="single-blog.html" className="default-btn blog-btn-one">Read More <span></span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="blog-single-item">
                                <div className="blog-image">
                                    <a href="single-blog.html">
                                        <img src={blog_2} alt="image" />
                                    </a>
                                </div>
                                <div className="blog-description">
                                    <ul className="blog-list">
                                        <li>
                                            <a href="#"><i className="fa-solid fa-tags"></i> Healthcare</a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fas fa-calendar-week"></i> 20 June 2023</a>
                                        </li>
                                    </ul>
                                    <div className="blog-content">
                                        <h3>
                                            <a href="single-blog.html">
                                                Reading Blood Test Results: Tips, Advice, And More
                                            </a>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor et dolore aliqua</p>
                                        <div className="blog-btn">
                                            <a href="single-blog.html" className="default-btn blog-btn-one">Read More <span></span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="blog-single-item">
                                <div className="blog-image">
                                    <a href="single-blog.html">
                                        <img src={blog_3} alt="image" />
                                    </a>
                                </div>
                                <div className="blog-description">
                                    <ul className="blog-list">
                                        <li>
                                            <a href="#"><i className="fa-solid fa-tags"></i> Healthcare</a>
                                        </li>
                                        <li>
                                            <a href="#"><i className="fas fa-calendar-week"></i> 20 June 2023</a>
                                        </li>
                                    </ul>
                                    <div className="blog-content">
                                        <h3>
                                            <a href="single-blog.html">
                                                Learn How to Limit Screen Time With These Tips
                                            </a>
                                        </h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labor et dolore aliqua</p>
                                        <div className="blog-btn">
                                            <a href="single-blog.html" className="default-btn blog-btn-one">Read More <span></span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Blog