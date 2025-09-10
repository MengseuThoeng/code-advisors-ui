'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryCard } from "@/components/card-component/history-card/history-card"
import { getReadingHistory, HistoryItem, getSearchTags, type SearchTag } from "@/lib/reading"
import { SearchTags } from "@/components/card-component/history-card/search-tags"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react'

function groupByDate(items: HistoryItem[]) {
  const groups: { [key: string]: HistoryItem[] } = {
    'ថ្ងៃនេះ': [],
    'ម្សិលមិញ': [],
    '១០ តុលា ២០២៤': []
  }

  const today = new Date()
  const yesterday = new Date(Date.now() - 86400000)

  items.forEach(item => {
    const itemDate = new Date(item.date)
    if (itemDate.toDateString() === today.toDateString()) {
      groups['ថ្ងៃនេះ'].push(item)
    } else if (itemDate.toDateString() === yesterday.toDateString()) {
      groups['ម្សិលមិញ'].push(item)
    } else {
      groups['១០ តុលា ២០២៤'].push(item)
    }
  })

  return groups
}

export default function ReadingHistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTags, setSearchTags] = useState<SearchTag[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      const [historyData, tagsData] = await Promise.all([
        getReadingHistory(),
        getSearchTags()
      ])
      setHistory(historyData)
      setSearchTags(tagsData)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const handleBookmark = (id: number) => {
    console.log('Bookmark:', id)
  }

  const handleRemove = (id: number) => {
    setHistory(history.filter(item => item.id !== id))
  }     

  const handleShare = (id: number) => {
    console.log('Share:', id)
  }

  const handleTagClick = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  const handleClearHistory = () => {
    setSelectedTags([])
    // Additional clear history logic here
  }

  const groupedHistory = groupByDate(history)

  return (
    <div className="flex gap-6 mb-5 pt-[80px] lg:pl-[364px]   ">
      <div className='w-[800px] p-2'>
     <Tabs defaultValue="reading" className="">
          <TabsList className="w-full flex justify-between items-center mb-4 text-primary">
            <div>
              <TabsTrigger value="reading">Reading history</TabsTrigger>
              <TabsTrigger value="search">Search history</TabsTrigger>
            </div>
            <TabsContent value="search" className="m-0">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearHistory}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TabsContent>
          </TabsList>
          
          <TabsContent value="reading" className="space-y-6 ml-1">
            <Input
              type="search"
              placeholder="Search reading history"
              className="max-w-4xl border-gray-300"
            />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              Object.entries(groupedHistory).map(([date, items]) => 
                items.length > 0 && (
                  <div key={date} className="space-y-4 text-primary">
                    <h2 className="text-sm font-semibold">{date}</h2>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <HistoryCard
                          key={item.id}
                          {...item}
                          onBookmark={() => handleBookmark(item.id)}
                          onRemove={() => handleRemove(item.id)}
                          onShare={() => handleShare(item.id)}
                        />
                      ))}
                    </div>
                  </div>
                )
              )
            )}
          </TabsContent>

          
          <TabsContent value="search" className="space-y-6">
            <div className="space-y-4">
              <SearchTags
                tags={searchTags}
                selectedTags={selectedTags}
                onTagClick={handleTagClick}
              />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="space-y-4">
                  {selectedTags.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Select tags above to filter your search history
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {/* Search results would go here */}
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        </div>
    </div>
 ) }