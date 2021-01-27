import './styles/scss/main.scss';
import { Pannel } from './ts/components/Panel/Panel';
import '../src/styles/images/background.jpg';

console.log('helooo');

const pannel = new Pannel();

pannel.position = 5;
console.log('pannel.position :>> ', pannel.position);
