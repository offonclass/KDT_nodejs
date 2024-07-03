import abc from './module3.js';
const result = abc();
console.log(result);

/* 
import {add, subtract, multiply} from './module4.js';

console.log(add(4,2));
console.log(subtract(4,2));
console.log(multiply(6,2));
 */

import cal from './module4.js';
console.log(cal.add(4,2));
console.log(cal.subtract(4,2));
console.log(cal.multiply(6,2));

