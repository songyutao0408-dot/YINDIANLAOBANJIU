import manifest from '../public/manifest.json';
import lyrics from '../public/lyrics.json';
import beats from '../public/beats.json';
export {manifest, lyrics, beats};
export const sectionAt = (frame:number) => manifest.sections.find(s=>frame>=s.fromFrame && frame<s.endFrame);
export const poseFrame = (frame:number) => Math.floor(frame/2)*2;
export const lyricAt = (time:number) => lyrics.find(e=>e.kind==='lyric' && time>=e.time && time<e.end);
export const nearestBeat = (time:number) => beats.times.reduce((best,t)=>Math.abs(t-time)<Math.abs(best-time)?t:best, beats.times[0] ?? time);
