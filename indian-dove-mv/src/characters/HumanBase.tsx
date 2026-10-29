import React from 'react';import {Art,Eye,Feather,Hat} from './shared';import {CharacterProps,stepped} from './types';
export const HumanBase:React.FC<CharacterProps & {role:'cowboy'|'warrior'|'shaman'|'chief'}>=({role,frame=0,blink=false})=>{
const chief=role==='chief',shaman=role==='shaman',cowboy=role==='cowboy';const f=stepped(frame);
return <Art><g transform={`translate(0 ${shaman?Math.sin(f/10)*3:0})`}>
{(chief||shaman)&&[...Array(chief?9:5)].map((_,i)=><Feather key={i} x={150+(i-(chief?4:2))*9} y={103} angle={(i-(chief?4:2))*16} s={chief?.68:.6}/>)}
<path d="M116 226l-10 65 -17 9h39l15 -65 12 0 15 65h42l-20 -12 -6 -63Z" fill={cowboy?'#68564E':'#A36D3D'}/>
<path d="M116 145Q145 131 179 147l30 94q-57 20 -113 0Z" fill={shaman?'#68564E':cowboy?'#C1502E':'#C49A65'}/>
{shaman?<path d="M116 139 77 220l20 -6 8 25 18 -11 16 17 16 -17 18 16 12 -24 18 8 18 -21 -38 -66Z" fill="#817565"/>:<path d="m113 188 9 8 10 -10 10 12 10 -12 11 10 10 -12 10 9" fill="none" stroke="#E9C48F" strokeWidth={7}/>}
<path d="M123 151v-25h48v28" fill="#BE8B65"/>
<path d="M113 76Q149 51 181 80l5 44q-13 34 -38 34q-30 -3 -38 -36Z" fill="#BE8B65"/>
<path d="M110 93q-17 -23 8 -37q36 -20 61 7q18 10 10 39l-17 -19 -30 5 -25 -6Z" fill="#49362C"/>
{!cowboy&&!shaman?<><path d="M112 98 104 171l16 5 9 -64m52 -13 12 72 -17 7 -12 -58" fill="#49362C"/><path d="m119 118 17 4m32 1 16 -4" stroke="#C1502E" strokeWidth={6}/></>:null}
{shaman?<><path d="M110 89 149 78 189 92 180 142 151 163 119 143Z" fill="#B29C76"/><path d="m117 103 25 9 -19 12m59 -21 -24 9 19 12" fill="#3A2418"/><path d="m149 111 -7 29 17 -3Z" fill="#C1502E"/><path d="m131 144 14 4m13 0 12 -6" fill="none"/></>:<><Eye x={133} y={108} r={6} blink={blink}/><Eye x={168} y={108} r={6} blink={blink}/><path d="m149 113 -5 17 11 1m-21 12h29" fill="none" strokeWidth={3}/></>}
{cowboy?<><Hat x={150} y={82} s={.91}/><path d="M148 133q-23 -8 -34 15q22 9 36 -7q17 17 37 5q-14 -21 -39 -13" fill="#49362C"/><path d="m122 167 27 16 26 -18 -24 -5Z" fill="#E6B74E"/><path d="M109 217h86v14h-87Z" fill="#503C30"/><rect x={143} y={216} width={20} height={16} rx={3} fill="#D6B066"/><path d="M186 227l-3 35 18 2 4 -39Z" fill="#503C30"/><path d="m190 229 1 -19 18 1" fill="none" stroke="#706E70" strokeWidth={8}/></>:null}
{chief?<><path d="M112 162q-31 23 23 44l52 -23 -5 -16 -45 20 -14 -11" fill="#BE8B65"/><path d="M184 162q31 27 -17 42l-51 -22 7 -17 42 21 10 -9" fill="#BE8B65"/></>:<><path d="M111 161 91 207l-14 -6m105 -40 28 39 15 -8" fill="none" stroke="#BE8B65" strokeWidth={15}/>{shaman?<><path d="m223 251 8 -131" stroke="#805237" strokeWidth={8}/><path d="m213 131 31 -9m-30 18 30 -7" stroke="#F6E7C8" strokeWidth={7}/><circle cx={228} cy={106} r={14} fill="#F6E7C8"/><path d="m219 104 5 4m9 -6 5 4" strokeWidth={4}/><path d="M244 107q26 -31 5 -49m-10 20q-18 -25 0 -40" fill="none" stroke="#9C7E9B" strokeWidth={8} opacity={.6}/></>:!cowboy?<><path d="M228 119q57 73 0 142L228 119" fill="none" stroke="#805237" strokeWidth={5}/><path d="M231 120v141" strokeWidth={2}/><path d="m210 186 73 0 -12 -7m12 7 -12 7" fill="none" strokeWidth={3}/><Feather x={115} y={81} angle={-24} s={.7}/></>:null}</>}
</g></Art>;
};
