<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | LexScribe Chambers — Advocate Muhammad Zafar Iqbal</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style type="text/css">
          body { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; background: #04170E; color: #f3f4f6; margin: 0; padding: 32px 16px; line-height: 1.6; }
          .wrap { max-width: 960px; margin: 0 auto; background: #052014; border: 1px solid rgba(212,175,55,0.4); border-radius: 16px; padding: 32px; box-shadow: 0 20px 50px rgba(0,0,0,0.6); }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 999px; background: rgba(212,175,55,0.15); border: 1px solid rgba(212,175,55,0.45); color: #F5D77F; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
          h1 { font-family: Georgia, serif; color: #FFFFFF; font-size: 28px; margin: 12px 0 6px; }
          p { color: #cbd5e1; font-size: 14px; margin: 0 0 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
          th { text-align: left; padding: 12px 14px; border-bottom: 2px solid rgba(212,175,55,0.45); color: #F5D77F; text-transform: uppercase; font-size: 11px; letter-spacing: 0.08em; }
          td { padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.08); }
          tr:hover td { background: rgba(212,175,55,0.06); }
          a { color: #F5D77F; text-decoration: none; font-weight: 600; }
          a:hover { text-decoration: underline; }
          .prio { display: inline-block; padding: 2px 8px; border-radius: 6px; background: #0A3822; border: 1px solid rgba(212,175,55,0.35); color: #F5D77F; font-weight: 700; font-size: 12px; }
          .foot { margin-top: 24px; font-size: 12px; color: #94a3b8; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        </style>
      </head>
      <body>
        <div class="wrap">
          <span class="badge">LexScribe Chambers • Sovereign XML Sitemap</span>
          <h1>Official Search &amp; AI Crawler Sitemap</h1>
          <p>Verified directory of High Court legal advisory pages directed by <strong>Advocate Muhammad Zafar Iqbal (High Court, Est. 2004)</strong>. Total indexed endpoints: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>.</p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th>Priority</th>
                <th>Change Freq</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td><a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a></td>
                  <td><span class="prio"><xsl:value-of select="sitemap:priority"/></span></td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="foot">
            <span>Canonical Origin: https://lexscribepk.vercel.app</span>
            <span>Robots &amp; LLM Index: /robots.txt • /llms.txt</span>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
