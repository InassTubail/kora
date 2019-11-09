export const images = [
  { id: 1, src: 'https://user-images.githubusercontent.com/30325727/68527261-abbcc000-02ed-11ea-9b23-4ae3b5c7c212.png', title: 'foo', description: 'bar' },
  { id: 2, src: 'https://user-images.githubusercontent.com/30325727/68527269-b5debe80-02ed-11ea-863f-d8aecda09cf6.png', title: 'foo', description: 'bar' },
  { id: 3, src: 'https://user-images.githubusercontent.com/30325727/68527272-bd05cc80-02ed-11ea-9552-0f91622331b9.png', title: 'foo', description: 'bar' },
  { id: 4, src: 'https://user-images.githubusercontent.com/30325727/68527273-c0995380-02ed-11ea-82ad-63e42390f67b.png', title: 'foo', description: 'bar' },
  { id: 5, src: 'https://user-images.githubusercontent.com/30325727/68527278-c4c57100-02ed-11ea-90c9-6e05004372ae.png', title: 'foo', description: 'bar' },
  { id: 6, src: 'https://user-images.githubusercontent.com/30325727/68527358-96946100-02ee-11ea-9050-3611e8eb1d7e.png', title: 'foo', description: 'bar' },

  { id: 7, src: 'https://user-images.githubusercontent.com/30325727/68527365-a744d700-02ee-11ea-8391-aa477e0d2dab.png', title: 'foo', description: 'bar' },
  { id: 8, src: 'https://user-images.githubusercontent.com/30325727/68527364-a3b15000-02ee-11ea-81af-f28607ed3070.png', title: 'foo', description: 'bar' },
  { id: 9, src: 'https://user-images.githubusercontent.com/30325727/68527368-b0ce3f00-02ee-11ea-8940-6d09f5c28a03.png', title: 'foo', description: 'bar' },
  { id: 10, src: 'https://user-images.githubusercontent.com/30325727/68527371-b88de380-02ee-11ea-8878-9fa5e1e98445.png', title: 'foo', description: 'bar' },
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
