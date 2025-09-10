export interface HistoryItem {
    id: number
    title: string
    thumbnail: string
    readTime: string
    upvotes: string
    date: string
  }
  
  const mockData: HistoryItem[] = [
    {
      id: 1,
      title: "Top 5 JavaScript Features You're Not Using Enough",
      thumbnail: "https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcvo8xtbof98uagmy959j.png",
      readTime: "3m read time",
      upvotes: "123 upvotes",
      date: new Date().toISOString() // Today
    },
    {
      id: 2,
      title: "Advanced TypeScript Techniques for Better Code",
      thumbnail: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
      readTime: "5m read time",
      upvotes: "87 upvotes",
      date: new Date().toISOString() // Today
    },
    {
      id: 3,
      title: "Building Responsive Layouts with CSS Grid",
      thumbnail: "https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcvo8xtbof98uagmy959j.png",
      readTime: "4m read time",
      upvotes: "105 upvotes",
      date: new Date().toISOString() // Today
    },
    {
      id: 4,
      title: "React Hooks: A Comprehensive Guide",
      thumbnail: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
      readTime: "6m read time",
      upvotes: "142 upvotes",
      date: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
    {
      id: 5,
      title: "Optimizing Performance in Next.js Applications",
      thumbnail: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
      readTime: "4m read time",
      upvotes: "98 upvotes",
      date: new Date(Date.now() - 86400000).toISOString() // Yesterday
    },
    {
        id: 6,
        title: "Optimizing Performance in Next.js Applications",
        thumbnail: "https://images.shiksha.com/mediadata/images/articles/1706432309php43BZoB.jpeg",
        readTime: "4m read time",
        upvotes: "98 upvotes",
        date: new Date('2024-10-10T00:00:00Z').toISOString() // 10 October 2024
    },
    {
        id: 7,
        title: "Top 5 JavaScript Features You're Not Using Enough",
        thumbnail: "https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcvo8xtbof98uagmy959j.png",
        readTime: "3m read time",
        upvotes: "123 upvotes",
        date: new Date('2024-10-10T00:00:00Z').toISOString() // 10 October 2024
      }

  ]
  
  export async function getReadingHistory(): Promise<HistoryItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockData
  }

  // Add these types and data to the existing api.ts file

export interface SearchTag {
  id: string
  label: string
}

export const searchTags: SearchTag[] = [
  { id: 'java', label: 'java' },
  { id: 'javascript', label: 'javascript' },
  { id: 'spring-boot', label: 'Spring boot' },
  { id: 'microservice', label: 'Microservice' },
  { id: 'python', label: 'python' },
  { id: 'backend', label: 'Backend' },
  { id: 'programming', label: 'Programming' },
  { id: 'big-data', label: 'Big data' },
  { id: 'devops', label: 'DevOps' }
]

export async function getSearchTags(): Promise<SearchTag[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  return searchTags
}
  
  