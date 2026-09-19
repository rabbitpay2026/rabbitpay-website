import { DOCS_PATH, SHARED_ROOT_NAMESPACES } from "@/lib/documentation/paths";

/**
 * The addresses the server cannot reach.
 *
 * `upstream.ts` translates every address that travels through this proxy — the
 * markup, the React payload, the Markdown sources. That covers everything the
 * documentation *sends us*. It does not cover everything the documentation
 * *shows*, and the gap is search.
 *
 * Mintlify's search is not served by the documentation deployment. The bundle
 * posts directly to `leaves.mintlify.com` from the browser, and renders the
 * results it gets back into links. Those links are written in the
 * documentation's own address space — `/product/checkout-flow`,
 * `/getting-started/one-click-checkout` — and they never pass through this
 * origin, so nothing on the server ever sees them. Left alone, a click on a
 * search result leaves `/documentation` entirely: `/integrations` and `/support`
 * are real marketing pages on this domain, so the visitor lands silently on the
 * wrong content rather than on a 404.
 *
 * The same is true of any other address the documentation computes in the
 * browser rather than receiving from its server.
 *
 * So the last step of the translation happens where those addresses appear: in
 * the page. This script is injected into every proxied document and applies the
 * same rule `toSitePath` applies on the server.
 *
 * Three mechanisms, and the first is the one that actually matters:
 *
 *  - A `fetch` wrapper over the search response. Each result carries a `page`
 *    field — `"product/checkout-flow"`, no leading slash — and the search
 *    component navigates from *that*, not from the anchor it rendered. Fixing
 *    the field is therefore the only fix that changes where a click goes;
 *    correcting the anchor alone leaves the component pushing the old address.
 *  - A MutationObserver, which fixes links as they are inserted, so the address
 *    is right before it is used: the status bar on hover, "copy link address"
 *    and the router's prefetch all agree with where the click will go.
 *  - A capture-phase click listener, as a last line for any link that appears
 *    and is clicked between observer callbacks.
 *
 * All three are idempotent and all three leave alone anything already correct,
 * which is every link the server rewrote. External links, fragment links and
 * relative links are untouched, and a response this script cannot parse is
 * passed through exactly as it arrived.
 */

/**
 * Built rather than written as a literal so the prefix and the shared-root
 * namespaces cannot drift from the server's copy of the same rule.
 */
export const CLIENT_LINK_SCRIPT = `(function(){
var P=${JSON.stringify(DOCS_PATH)},R=${JSON.stringify(SHARED_ROOT_NAMESPACES)};
function root(p){for(var i=0;i<R.length;i++){if(p===R[i]||p.indexOf(R[i]+"/")===0)return true}return false}
function site(p){if(p===P||p.indexOf(P+"/")===0)return p;if(root(p))return p;if(p==="/")return P;return P+p}
function fix(a){var raw=a.getAttribute("href");
if(!raw||raw.charAt(0)!=="/"||raw.charAt(1)==="/")return;
var tail="",i=raw.search(/[?#]/);if(i!==-1){tail=raw.slice(i);raw=raw.slice(0,i)}
var next=site(raw);if(next!==raw)a.setAttribute("href",next+tail)}
function sweep(n){if(!n||n.nodeType!==1)return;
if(n.tagName==="A")fix(n);
if(n.querySelectorAll){var l=n.querySelectorAll("a[href]");for(var i=0;i<l.length;i++)fix(l[i])}}
function onClick(e){var t=e.target;if(!t)return;var a=t.closest?t.closest("a[href]"):null;if(a)fix(a)}
document.addEventListener("click",onClick,true);
document.addEventListener("auxclick",onClick,true);
if(typeof MutationObserver==="function"){
new MutationObserver(function(rs){for(var i=0;i<rs.length;i++){var a=rs[i].addedNodes;
for(var j=0;j<a.length;j++)sweep(a[j])}}).observe(document.documentElement,{childList:true,subtree:true})}
var B=P.slice(1)+"/";
function page(v){return typeof v==="string"&&v!==P.slice(1)&&v.indexOf(B)!==0
?B+v.replace(/^\\//,""):v}
if(typeof window.fetch==="function"){var F=window.fetch;
window.fetch=function(input,init){
var u=typeof input==="string"?input:(input&&input.url)||"";
var p=F.apply(this,arguments);
if(!/\\/api\\/search\\//.test(u))return p;
return p.then(function(res){
if(!res||!res.ok)return res;
return res.clone().json().then(function(d){
if(!d||!Array.isArray(d.results))return res;
var moved=false;
for(var i=0;i<d.results.length;i++){var r=d.results[i];
if(r&&typeof r.page==="string"){var n=page(r.page);if(n!==r.page){r.page=n;moved=true}}}
if(!moved)return res;
return new Response(JSON.stringify(d),{status:res.status,statusText:res.statusText,
headers:{"content-type":"application/json"}})
}).catch(function(){return res})})}}
})();`;

/**
 * Put the script into a proxied document, as early as the document allows.
 *
 * Immediately after the opening `<head>` so the listeners exist before the
 * documentation's own bundle runs and before any click can be made. If the
 * document has no `<head>` — which no Mintlify page does, but a proxied error
 * body might — it is returned unchanged rather than guessed at.
 */
export function injectClientLinkScript(html: string): string {
  const head = /<head(\s[^>]*)?>/i.exec(html);
  if (!head) return html;

  const at = head.index + head[0].length;
  return `${html.slice(0, at)}<script>${CLIENT_LINK_SCRIPT}</script>${html.slice(at)}`;
}
