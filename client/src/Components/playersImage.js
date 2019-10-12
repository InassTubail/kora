import person1 from '../assets/1.png';
import person2 from '../assets/2.png';
import person3 from '../assets/3.png';
import person4 from '../assets/4.png';
import person5 from '../assets/5.png';
import person6 from '../assets/6.png';
import person11 from '../assets/11.png';
import person12 from '../assets/12.png';
import person13 from '../assets/13.png';
import person14 from '../assets/14.png';

export const images = [
  { id: 1, src: person1, title: 'foo', description: 'bar' },
  { id: 2, src: person2, title: 'foo', description: 'bar' },
  { id: 3, src: person3, title: 'foo', description: 'bar' },
  { id: 4, src: person4, title: 'foo', description: 'bar' },
  { id: 5, src: person5, title: 'foo', description: 'bar' },
  { id: 6, src: person6, title: 'foo', description: 'bar' },

  { id: 7, src: person11, title: 'foo', description: 'bar' },
  { id: 8, src: person12, title: 'foo', description: 'bar' },
  { id: 9, src: person13, title: 'foo', description: 'bar' },
  { id: 10, src: person14, title: 'foo', description: 'bar' },
];

function imageLoader() {
  return images;
}
export function person(id) {
  let src;
  images.map((el)=>{
    if(el.id == id){
      src = el.src 
    }
    return el;
  })
  return src;
}
export default imageLoader;
