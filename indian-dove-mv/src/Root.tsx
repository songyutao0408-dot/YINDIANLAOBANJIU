import {CastSheet, ExpressionSheet, PoseSheet, CharacterMotion} from './CharacterSheets';
import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Composition, staticFile, useCurrentFrame, delayRender, continueRender, cancelRender} from 'remotion';
import {manifest,sectionAt,lyricAt} from './timeline';
// Technical timing slate only. Final illustrated scenes begin after character approval.
const TimingSlate:React.FC = () => {
 const [handle]=useState(()=>delayRender('Load local font'));
 useEffect(()=>{ const font=new FontFace('ZCOOL', `url(${staticFile('fonts/ZCOOLKuaiLe-Regular.ttf')})`); font.load().then(f=>{document.fonts.add(f);continueRender(handle);}).catch(cancelRender); },[handle]);
 const frame=useCurrentFrame(); const s=sectionAt(frame); const lyric=lyricAt(frame/24);
 return <AbsoluteFill style={{background:'#3A2418',color:'#F6E7C8',fontFamily:'ZCOOL, sans-serif',padding:100}}>
  <Audio src={staticFile(manifest.audioFile)}/>
  <div style={{fontSize:28,letterSpacing:6}}>CHECKPOINT 01 / TIMING SLATE</div>
  <h1 style={{fontSize:80}}>{s?.id} · {s?.name}</h1>
  <div style={{fontSize:40}}>{(frame/24).toFixed(2)} s / {manifest.duration.toFixed(3)} s</div>
  <div style={{height:10,marginTop:70,background:'#70533e'}}><div style={{height:10,width:`${100*frame/manifest.durationInFrames}%`,background:'#F0A15E'}}/></div>
  <div style={{fontSize:48,marginTop:120}}>{lyric?.text ?? '♪'}</div>
  <div style={{fontSize:24,position:'absolute',bottom:80}}>技术校验画面 · 非最终视觉效果</div>
 </AbsoluteFill>;
};
export const Root:React.FC=()=> <><Composition id="IndianDoveMV" component={TimingSlate} width={1920} height={1080} fps={24} durationInFrames={manifest.durationInFrames}/><Composition id="CastSheet" component={CastSheet} width={2400} height={1800} fps={24} durationInFrames={240}/><Composition id="ExpressionSheet" component={ExpressionSheet} width={1920} height={1800} fps={24} durationInFrames={240}/><Composition id="PoseSheet" component={PoseSheet} width={2400} height={850} fps={24} durationInFrames={240}/><Composition id="CharacterMotion" component={CharacterMotion} width={1920} height={1080} fps={24} durationInFrames={240}/></>;
