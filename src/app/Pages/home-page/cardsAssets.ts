export const cardAssets:cardAsset[]= [
    {
        url:"https://res.cloudinary.com/storage-for-demo-apps/image/upload/v1662027135/constant%20site%20assets/BF2GG8-920x612_uikfmq.jpg",
        title:"avians",
        text:"Kings of the sky"
    },
    {
        url:"https://res.cloudinary.com/storage-for-demo-apps/image/upload/v1662026857/constant%20site%20assets/thumbbig-598768_x77ixf.webp",
        title:"mammalia",
        text:"Masters of the jungles and plains"
    },
    {
        url:"https://res.cloudinary.com/storage-for-demo-apps/image/upload/v1662026739/constant%20site%20assets/photo-1560275619-4662e36fa65c_wfsm8f.jpg",
        title:"aquatic",
        text:"Terrors of the deep"
    },
    {
        url:"https://res.cloudinary.com/storage-for-demo-apps/image/upload/v1662027238/constant%20site%20assets/anaconda_yuic53.webp",
        title:"reptilians",
        text:"Living dinosaurs"
    }
    
    
    // in the end I decided against using the text. 
]



export interface cardAsset{
    url:string,
    title:string,
    text:string
  
}

//unfortunately I couldn't think of a simple way to do this without hardcoding it,
// or adding "categories" as it's own db type, which makes little sense. 