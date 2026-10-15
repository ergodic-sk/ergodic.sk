/**
 * Runs before first paint (see the locale layout): marks the page so reveal styles apply.
 * If RevealObserver never mounts, the mark is removed after 3 s so content can't stay hidden.
 */
export const revealBootScript = `(function(){var d=document.documentElement;d.setAttribute("data-motion","");setTimeout(function(){if(!window.__reveal)d.removeAttribute("data-motion")},3000)})()`

/** Inline style for a reveal delay in ms; --d adds to the block's --base. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

/** Inline style for a block's base delay, used to stagger cards. */
export const base = (ms: number) => ({ "--base": `${ms}ms` }) as React.CSSProperties
