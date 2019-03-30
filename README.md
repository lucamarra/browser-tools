# browser-tools
Collection of bookmarklets in one greasemonkey / userscript addon

## What does it do?

Adds a popup menu of browser tools, collected from various bookmarklets, to all websites.

### Contained tools

* Navigate
  * 1 Level Up
  * Top
  * Duplicate Tab
  * Increment URL
  * Decrement URL
  * List all Links
  * Linkify URLs
  * Un-redirect Links
  * Open all Links 
  * Show Anchor URLs
* Find / Overview
  * Tech Stack
  * Google within Site
  * Open Links in Frames
  * Wayback-Machine
  * Google-Cache
  * Google-Translate URL
* SEO
  * Google Site Index
  * Google Page Speed Insights
  * Show robots.txt
* Restore
  * Restore Right-Click
  * Restore console.log
  * Restore Select Text
  * Restore Link Underlines
* JavaScript
  * View Scripts
  * View Variables
  * console.log Method Calls
  * Inject jQuery
  * onerror: alert
  * onerror: display in status bar
* DOM
  * Unhide all
  * Show Comments
  * Remove sticky Elements
  * Remove Elements
  * Remove Bloat
  * Make editable
  * &lt;ul&gt; to &lt;ol&gt;s
* Forms
  * Show Password
  * Unrestrict Form
  * Show hidden Fields
  * Fill all Fields w/ asdf
  * Generic Site Password
* Cookies
  * Show Cookies
  * Remove Cookies
* CSS
  * Debug Styles
  * Reload Styles every 2 Seconds
  * Find Body-Overlays
  * Zap Styles
  * Show WebColors
  * Test Google Fonts
* Media / Export
  * Site to PDF
  * View Images
  * Extract SVGs
 

## Installation

Install browser-tools.js using greasemonkey on firefox or tampermonkey on chrome browser.

### Disable Cross Origin Request Security

**Warning:** Disabling CORS security settings does pose a security risk, do this only on your own responsibility 
and when you understand the security implications.

To allow script injection/execution on websites that disallow this via CORS header:

* Open browser settings via URL: ``about:config``
* Search for: ``origin``
* Set ``security.fileuri.strict_origin_policy`` to false

## Authors and License

The collected scripts were written by various authors, no particular license given.
