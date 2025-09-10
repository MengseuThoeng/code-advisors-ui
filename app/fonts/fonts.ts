import {Roboto, Koh_Santepheap} from 'next/font/google'


export const roboto = Roboto({
	weight: ["100","300","400", "500"], // you can pass multiple weights
	subsets : ["latin"], 
	display: "swap", // swap means font will be displayed immediately. 
    variable: "--font-roboto", // you can pass custom css variable name
});

export const koh_Santepheap = Koh_Santepheap({
	weight: ["400", "700"], // you can pass multiple weights
	subsets : ["khmer"], 
	display: "swap", // swap means font will be displayed immediately. 
    variable: "--font-koh", // you can pass custom css variable name
});