import React from 'react';
import {HumanBase} from './HumanBase';
import {CharacterProps} from './types';
export const Shaman:React.FC<CharacterProps>=(props)=><HumanBase {...props} role="shaman"/>;
