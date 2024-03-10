import HeroOneComponent from "@/components/sections/HeroComponents/heroOne";
import HeroTwoComponent from "@/components/sections/HeroComponents/heroTwo";

export const CategoryComponentsList = [
    {
        id: "1-1",//1:homepage,1:Hero section
        name: "hero",
        components: [
            { id: "1-1-1", name: "one", thumbnail: "", component: HeroOneComponent },
            { id: "1-1-2", name: "two", thumbnail: "", component: HeroTwoComponent },
        ]
    }
]


