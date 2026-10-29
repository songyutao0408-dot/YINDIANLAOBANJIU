import React from 'react';
import {CharacterProps,stepped} from './types';
import {Art,Feather,Heart,Star} from './shared';
import {palette as p} from '../style/palette';
const Spiral=({x,y,f}:{x:number;y:number;f:number})=><g transform={`translate(${x} ${y}) rotate(${f*8})`}><path d="M0 0 C7 -8 15 2 9 10 C-5 25 -25 6 -15 -10 C0 -32 29 -15 25 9" fill="none" strokeWidth={3}/></g>;
export const OldDove:React.FC<CharacterProps>=({frame=0,expression='idle',pose='stand',blink=false})=>{
 const f=stepped(frame),phase=f/24*Math.PI*3;const sleeping=expression==='sleep'||pose==='doze';
 const bob=pose==='walk'?Math.abs(Math.sin(phase))*7:pose==='dance'?Math.sin(phase)*12:pose==='doze'?Math.sin(phase*.25)*2:0;
 const lean=pose==='dance'?Math.sin(phase)*9:pose==='walk'?Math.sin(phase)*3:0;
 const eye=(x:number,y:number)=>expression==='love'?<Heart x={x} y={y+12} s={.72}/>:expression==='dizzy'?<Spiral x={x} y={y} f={f}/>:sleeping||blink?<path d={`M${x-17} ${y}q17 13 34 0`} fill="none"/>:<><ellipse cx={x} cy={y} rx={22} ry={27} fill={p.cream}/><ellipse cx={x+5} cy={y+8} rx={6} ry={9} fill={p.ink} stroke="none"/>{expression==='idle'||expression==='hungry'?<path d={`M${x-21} ${y-5}q20 -31 42 0Z`} fill={p.dove}/>:null}{expression==='angry'?<path d={`M${x-24} ${y-18}l44 14`} fill="none" strokeWidth={7}/>:null}</>;
 return <Art><g transform={pose==='lie'?'translate(36 67) scale(.82) rotate(-75 150 180)':`translate(0 ${-bob}) rotate(${lean} 150 270) translate(150 300) scale(${1+(pose==='dance'?Math.sin(phase)*.025:0)} ${1-(pose==='dance'?Math.sin(phase)*.025:0)}) translate(-150 -300)`}>
 <path d="M78 218 Q31 196 38 225 L71 241 29 242 Q45 269 87 261" fill="#776B60"/>
 <g fill="#D7A44E"><path d={`M118 273v${24+Math.sin(phase)*(pose==='walk'?8:0)} l-21 7 33 0 9 -7 -10 -2v-23Z`}/><path d={`M177 274v${24-Math.sin(phase)*(pose==='walk'?8:0)} l-18 7 33 0 9 -7 -12 -3v-22Z`}/></g>
 <path d="M83 159 C64 182 59 239 83 268 C104 299 202 299 224 262 C247 226 226 175 206 151Z" fill={p.dove}/>
 <path d="M144 189 C177 170 224 187 226 231 C230 268 205 282 169 280 C139 277 123 220 144 189Z" fill={p.breast} stroke="none"/>
 <path d="M89 236q-16 17 3 26q20 2 25 -15M193 258q12 13 18 -1" fill="#C7B5A1" strokeWidth={2}/>
 <path d="M106 226l-5 8m13 -4 -3 9m-16 11 8 3" strokeWidth={2}/>
 <g transform={`rotate(${pose==='flap'?-45+Math.sin(phase)*50:pose==='dance'?-15:0} 98 193)`}><path d="M102 185 C56 185 56 225 79 241 Q87 254 92 234 Q105 254 108 229 Q127 234 123 212Z" fill="#897867"/><path d="m83 202 16 21m-7 -26 16 21" fill="none" strokeWidth={2}/></g>
 <path d="M105 162 C73 133 85 81 115 73 C146 49 202 67 214 102 C240 139 218 177 185 184 C153 197 122 184 105 162Z" fill={p.dove}/>
 <path d="M123 70Q103 47 117 39M139 65Q132 40 144 36M151 65Q164 44 173 52" fill="none" strokeWidth={4}/>
 <Feather x={104} y={88} angle={-23} s={.8}/>
 <path d="M89 101Q149 84 213 109L217 123Q151 102 89 115Z" fill={p.red}/>
 <path d="m111 103 9 -6 8 7 -8 6Z m35 1 9 -5 8 8 -9 5Z m35 6 9 -3 7 8 -9 5Z" fill={p.gold} stroke="none"/>
 {eye(143,134)}{eye(191,137)}
 {expression==='love'?<g fill="#CF7E81" stroke="none"><ellipse cx={119} cy={157} rx={14} ry={7}/><ellipse cx={215} cy={161} rx={12} ry={7}/></g>:null}
 <path d="M164 158Q186 145 218 163L204 180Q202 164 164 170Z" fill={p.gold}/>
 {expression==='talk'||expression==='sad'||expression==='dizzy'?<path d={`M174 172Q193 ${expression==='talk'?190+Math.sin(phase)*7:196} 207 173Z`} fill="#703B33"/>:<path d="M177 176q14 7 24 0" fill="none" strokeWidth={2}/>}
 <path d="M111 177Q143 213 201 185" fill="none" strokeWidth={3}/>{Array.from({length:8},(_,i)=><ellipse key={i} cx={119+i*10} cy={188+Math.sin(i/7*Math.PI)*13} rx={5} ry={7} fill={i%2?'#805237':'#B8834B'} strokeWidth={2}/>)}
 {expression==='sad'?<g fill="#9FC2C4"><path d="M127 155Q81 164 72 202Q92 181 129 169Z"/><path d="M206 157Q248 161 260 200Q239 181 205 170Z"/><ellipse cx={70} cy={217+f%12} rx={6} ry={10}/><ellipse cx={261} cy={217+f%14} rx={6} ry={10}/></g>:null}
 {expression==='hungry'?<><Star x={78} y={65} s={.7}/><Star x={234} y={91} s={.7}/><path d="M222 224q18 8 0 17m11 -24q23 16 0 30" fill="none" strokeWidth={3}/></>:null}
 {expression==='angry'?<><path d="M214 74q-22 -19 -5 -29q22 -6 10 -25" fill="none" stroke="#BBA796" strokeWidth={11}/><path d="m71 153 -17 -8m18 -6 -11 -14" fill="none"/></>:null}
 </g>
 {expression==='confused'?<text x={237} y={78} fontSize={57} fill={p.red} stroke="none">?</text>:null}
 {sleeping?<g fill={p.ink} stroke="none" fontFamily="serif" fontWeight="bold"><text x={232} y={112} fontSize={22}>z</text><text x={250} y={83} fontSize={30}>Z</text><text x={269} y={49} fontSize={37}>Z</text></g>:null}
 {expression==='talk'?<g><path d="M212 32Q209 9 235 10H277Q299 11 298 39Q297 60 267 56L244 70 249 54H231Q211 53 212 32Z" fill={p.cream}/><path d={`M229 33l8 ${Math.sin(phase)*9} 9 -9 9 13 9 -15 14 7`} fill="none" strokeWidth={3}/></g>:null}
 </Art>;
};
