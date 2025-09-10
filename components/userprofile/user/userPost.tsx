import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/userprofile/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/userprofile/select";
import { Command } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { CardForumComponent } from "@/components/userprofile/user/CardForumComponent";
import { CardsData } from "@/lib/userProfile/information";
import EmptyCard from "./EmptyCardComponent";

export default function UserPost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Fetch data from CardsData
  const { forumData, loading, error } = CardsData();

  useEffect(() => {
    // Update filtered data whenever `forumData` changes
    if (forumData) {
      setFilteredData(forumData);
    }
  }, [forumData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter data based on the search query
    if (forumData) {
      const filtered = forumData.filter(
        (card: any) =>
          card.title.toLowerCase().includes(query.toLowerCase()) || 
          card.content.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mt-[95px]">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">មាតិការបស់អ្នក</TabsTrigger>
          <TabsTrigger value="password">សំនួររបស់អ្នក</TabsTrigger>
        </TabsList>
        <div className="flex items-center w-[680px] space-x-3 pt-1 pb-0.5">
        <Command className="border h-9 rounded-lg flex justify-center">
        <Input
          type="text"
          placeholder="ស្វែងរកតាមចំណងជើង"
          className="h-9 px-4 text-sm border rounded-md w-full"
          value={searchQuery}
          onChange={handleSearch}
        />
      
      </Command>
          <Select>
            <SelectTrigger className="w-[300px] text-start h-9 bg-white rounded-lg">
              <SelectValue placeholder="កាលបរិច្ឆេទ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="rounded-sm">
                <SelectItem value="1">៧ ថ្ងៃមុន</SelectItem>
                <SelectItem value="2">១ ខែមុន</SelectItem>
                <SelectItem value="3">២ ខែមុន</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="account">
          <div className="grid grid-cols-1 w-[680px] gap-2 max-w-7xl mx-auto">
          {filteredData && filteredData.length > 0 ? (
        filteredData.map((card: any) => (
          <CardForumComponent
            key={card.id}
            timestamp={card.timestamp}
            title={card.title}
            content={card.content}
            views={card.views}
            comments={card.comments}
            upvotes={card.upvotes}
          />
        ))
      ) : (
        <EmptyCard />
      )}
          </div>
        </TabsContent>
        <TabsContent value="password">
          <EmptyCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
