export type Expression='idle'|'hungry'|'dizzy'|'sad'|'angry'|'love'|'talk'|'confused'|'sleep';
export type Pose='stand'|'walk'|'doze'|'flap'|'lie'|'dance';
export interface CharacterProps {frame?:number; expression?:Expression; pose?:Pose; blink?:boolean; variant?:'normal'|'cowboy';}
export const expressions:Expression[]=['idle','hungry','dizzy','sad','angry','love','talk','confused','sleep'];
export const poses:Pose[]=['walk','doze','flap','lie','dance'];
export const stepped=(frame=0)=>Math.floor(frame/2)*2;
