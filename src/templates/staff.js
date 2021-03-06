import React from "react"
import Helmet from "react-helmet"
import { Layout } from "../components/layout"
import Img from 'gatsby-image'
import { StyledLink } from "../css/StyledLink.js"
import styled from "styled-components";

const StyledImage = styled(props => <Img {...props} />)`
overflow: visible !important;
`;

export const query = graphql`
query StaffTemplateQuery($slug: String!) {
    datoCmsStaffMember(slug: {eq: $slug}) {
      email
      bio
      name
      role
      slug
      major
      profilePhoto {
        fluid(maxWidth: 1000, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
      }
    }
    allDatoCmsBlogPost(filter: {author: {slug: {eq: $slug}}}) {
        edges {
          node {
            postSummary
            slug
            title
            id
            author {
              slug
              name
              id
            }
            meta {
              publishedAt(formatString: "MMMM Do, YYYY h:mma")
            }
          }
        }
      }
  }
`

const StaffTemplate = ({ data }) => (
    <div class="body">
        <Layout>
            <Helmet>
                <title>The Pub</title>
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta content="Webflow" name="generator" />
                <link href="css/normalize.css" rel="stylesheet" type="text/css" />
                <link href="css/webflow.css" rel="stylesheet" type="text/css" />
                <link href="css/the-pub-2.webflow.css" rel="stylesheet" type="text/css" />
                <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
                <script src="https://use.typekit.net/cwm8iqt.js" type="text/javascript"></script>
                <link href="images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
                <link href="images/webclip.png" rel="apple-touch-icon" />
                <link rel="stylesheet" href="https://use.typekit.net/ggb0fjm.css" />
            </Helmet>
            <div data-w-id="63b8498e-1639-aebb-9ce4-f79485e68895" class="page">
                <section class="page-section content no-space">
                    <div class="card issue template">
                        <StyledImage fluid={data.datoCmsStaffMember.profilePhoto.fluid} class="card-cover-image staff, staff-outline" />
                        <div id="w-node-b2ddda19fb07-ff869045" class="details">
                            <h1 class="title">{data.datoCmsStaffMember.name}</h1>
                            <div class="issue-info">
                                <div><strong>{data.datoCmsStaffMember.role}</strong></div>
                                <div class="contents">{data.datoCmsStaffMember.bio}</div>
                            </div>
                            <div class="issue-buttons bottom">
                                <a id="w-node-b2ddda19fb21-ff869045" href={`mailto:${data.datoCmsStaffMember.email}`} class="simple-button fill w-inline-block">
                                    <div>Email {data.datoCmsStaffMember.name}</div>
                                    <div></div>
                                </a>
                                <StyledLink to="/staff"><div class="simple-button _2nd w-inline-block">
                                    <div>Back to Staff</div>
                                </div>
                                </StyledLink>
                            </div>
                        </div>
                    </div>
                    <div class="further-reading staff">
                        <div class="staff-post-title">
                            <div class="small-subtiti"></div>
                            <div class="small-subtiti"><strong>{data.datoCmsStaffMember.name}&#x27;s Blog Posts</strong></div>
                        </div>
                        <div class="post-features">
                            <div class="collection-list-wrapper-2 staff w-dyn-list">
                                <div class="collection-list w-dyn-items">
                                    {data.allDatoCmsBlogPost.edges.map(({ node: post }) => (
                                        <div key={post.id} class="preview w-dyn-item">
                                            <div id="w-node-cfa85c07b166-8c3b2b8f" class="card">
                                                <div class="blog-post-link">
                                                    <StyledLink to={`/blog/${post.slug}`} class="link w-inline-block">
                                                        <h1 class="blog-post-title">{post.title}</h1>
                                                    </StyledLink>
                                                    <p class="post-summary">{post.postSummary}</p>
                                                    <div class="card-info blog">
                                                        <div class="author-info">
                                                            <div class="text-block-7">{post.meta.publishedAt}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    </div>
)

export default StaffTemplate