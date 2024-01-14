import { type Hls } from 'hls.js';

declare global {
    interface Window {
        Hls: Hls;
    }
}
