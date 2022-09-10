import React from 'react';
import StoryCard from './StoryCard';

const stories = [
    {
        name:'Elon Musk',
        src:'https://www.pngpix.com/wp-content/uploads/2021/06/PNGPIX-COM-Elon-Musk-PNG-Transparent-Image-1.png',
        profile:'https://www.pngpix.com/wp-content/uploads/2021/06/PNGPIX-COM-Elon-Musk-PNG-Transparent-Image-1.png',
    },
    {
        name:'Jeff Bezos',
        src:'https://www.theladders.com/wp-content/uploads/Untitled-design-4-21.png',
        profile:'https://www.theladders.com/wp-content/uploads/Untitled-design-4-21.png',
    },
    {
        name:'Bill Gates',
        src:'https://www.pngmart.com/files/17/Bill-Gates-PNG-Transparent-Image.png',
        profile:'https://www.pngmart.com/files/17/Bill-Gates-PNG-Transparent-Image.png',
    },
    {
        name:'Einstein',
        src:'https://mir-s3-cdn-cf.behance.net/project_modules/fs/31293288672571.5ddd670f1c63d.png',
        profile:'https://mir-s3-cdn-cf.behance.net/project_modules/fs/31293288672571.5ddd670f1c63d.png',
    },
    {
        name:'Jack Maa',
        src:'https://www.medadmbjmc.in/wp-content/uploads/2022/05/Jack-Ma.png',
        profile:'https://www.medadmbjmc.in/wp-content/uploads/2022/05/Jack-Ma.png',
    },
];
const Stories = () => {
  return (
    <div className='flex rounded-xl p-1 justify-center mx-auto'>
        {stories.map(story =>(
            <StoryCard key={story.src} name={story.name} profile={story.profile} src={story.src}/>
        ))}
    </div>
  )
}

export default Stories;