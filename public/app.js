
/*
import ломал выполнение всего скрипта 
пока ты не сделал так:
export {hello};
так:
<script type="module" src="/app.js"></script>
и не написал .js url ниже: ./units/hello.js
*/

import {hello} from './units/hello.js';
hello();