const callouts = [
  {
    id: 1,
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-01.jpg',
    href: '#',
    prix:0
  },
  {
    id: 2,
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    href: '#',
    prix:76
  },
  {
    id: 2,
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    href: '#',
    prix:90
  },
  {
    id: 2,
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    href: '#',
    prix:65
  },
  {
    id: 2,
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    href: '#',
    prix:11
  },
  {
    id: 2,
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    href: '#',
    prix:12
  },
  {
    id: 2,
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    href: '#',
    prix:99
  },
  {
    id: 2,
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    href: '#',
    prix:45
  },
  {
    id: 2,
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-02.jpg',
    href: '#',
    prix:89
  },
  {
    id: 3,
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-edition-03.jpg',
    href: '#',
    prix:32
  },
]

import But from "./chop"
export default function Example() {
  return (
    <div className="bg-gray-100 min-h-screen center" style={{width:"100vw"}}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl font-bold text-gray-900 py-10">
          Collections
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{callouts.map((item, index) => (
  <But key={index} item={item} />
))}

        </div>
      </div>
    </div>
  )
}