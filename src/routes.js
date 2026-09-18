import Home from './components/Home';
import FirstPost from './posts/first-post';
import SecondPost from './posts/second-post';
import MoondreamVisualPrompting from './posts/moondream-visual-prompting';
import AssistantAxisDecisionDetector from './posts/assistant-axis-decision-detector';
import Shillm from './posts/shillm';

// Single source of truth for the site's routes. App.js renders these, and
// scripts/prerender.js walks the same list to decide which pages to emit at
// build time, so adding a page here is all that's needed for both.
export const routes = [
    { path: '/', Component: Home },
    { path: '/blog/notebook-copilot', Component: FirstPost },
    { path: '/blog/tamagotchi-rl-slitherio', Component: SecondPost },
    { path: '/blog/moondream-visual-prompting', Component: MoondreamVisualPrompting },
    { path: '/blog/assistant-axis-decision-detector', Component: AssistantAxisDecisionDetector },
    { path: '/blog/shillm', Component: Shillm },
];
