import HeroOneComponent from "@/components/sections/HeroComponents/heroOne";
import HeroTwoComponent from "@/components/sections/HeroComponents/heroTwo";
import ImageMedia from "@/components/sections/MediaComponents/ImageMedia";
import VideoMedia from "@/components/sections/MediaComponents/VideoMedia";

export const CategoryComponentsList = [
    {
        id: "1-1",//1:homepage,1:Hero section
        name: "Navigation",
        components: [
            { id: "1-1-1", name: "one", thumbnail: "", component: HeroOneComponent },
            { id: "1-1-2", name: "two", thumbnail: "", component: HeroTwoComponent },
        ]
    },
    {
        id: "2-1",//1:media,1:Image section
        name: "Media",
        components: [
            { id: "2-1-1", name: "Image", thumbnail: "", component: ImageMedia },
            { id: "2-1-2", name: "Video", thumbnail: "", component: VideoMedia },
        ]
    },
    {
        id: "3-1",//1:homepage,1:Hero section
        name: "Hero",
        components: [
            { id: "1-1-1", name: "one", thumbnail: "", component: HeroOneComponent },
            { id: "1-1-2", name: "two", thumbnail: "", component: HeroTwoComponent },
        ]
    },
]


