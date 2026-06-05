import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { blogPosts } from "./Blog";
import "./blog.css";

// Simple markdown to HTML converter
function parseMarkdown(md) {
  if (!md) return "";
  return md
    .trim()
    // H2
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    // H3
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Unordered list items
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    // Wrap consecutive <li> in <ul>
    .replace(/(<li>.*<\/li>\n?)+/g, m => `<ul>${m}</ul>`)
    // Table rows (basic)
    .replace(/^\|(.+)\|$/gm, row => {
      const cells = row.split("|").filter(c => c.trim());
      const isSep = cells.every(c => /^[-:]+$/.test(c.trim()));
      if (isSep) return "";
      const tag = "td";
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join("")}</tr>`;
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, m => `<table>${m}</table>`)
    // Internal links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="blogInlineLink">$1</a>')
    // Horizontal rule
    .replace(/^---$/gm, "<hr/>")
    // Paragraphs — wrap lines not already in tags
    .replace(/^(?!<[a-z]).+$/gm, p => `<p>${p}</p>`)
    // Clean extra blank lines
    .replace(/\n{2,}/g, "\n");
}

function BlogPost() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const post       = blogPosts.find(p => p.slug === slug);
  const related    = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="blogNotFound">
        <h2>Article nahi mila 😕</h2>
        <p>Yeh article exist nahi karta.</p>
        <Link to="/blog" className="backToBlog">← Blog par wapas jao</Link>
      </div>
    );
  }

  return (
    <div className="blogPostPage">

      {/* Back button */}
      <Link to="/blog" className="blogBackBtn">← Blog</Link>

      {/* Article header */}
      <div className="blogPostHeader">
        <div className="blogPostMeta">
          <span className="blogPostTag">{post.tag}</span>
          <span className="blogPostDate">📅 {post.date}</span>
          <span className="blogPostRead">⏱ {post.readTime} read</span>
        </div>
        <h1 className="blogPostTitle">
          {post.emoji} {post.title}
        </h1>
        <p className="blogPostDesc">{post.desc}</p>
      </div>

      {/* Article content */}
      <div
        className="blogPostContent"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
      />

      {/* CTA Banner */}
      <div className="blogCTA">
        <div className="blogCTALeft">
          <h3>🧠 MindCare App Try Karo — Free!</h3>
          <p>Anxiety tracker, mood tracker, breathing exercises aur AI chatbot — sab free mein.</p>
        </div>
        <Link to="/" className="blogCTABtn">Get Started Free →</Link>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="blogRelated">
          <h3>Related Articles</h3>
          <div className="blogRelatedGrid">
            {related.map(r => (
              <Link to={`/blog/${r.slug}`} key={r.slug} className="blogRelatedCard">
                <span className="blogRelatedEmoji">{r.emoji}</span>
                <div>
                  <p className="blogRelatedTitle">{r.title}</p>
                  <span className="blogRelatedRead">{r.readTime} read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="blogPostFooter">
        <Link to="/blog" className="blogBackBtn">← Back to Blog</Link>
      </div>

    </div>
  );
}

export default BlogPost;
