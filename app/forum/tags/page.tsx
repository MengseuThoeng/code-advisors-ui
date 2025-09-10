import React from "react";

type Keyword = {
  label: string;
  value: string;
};

const TechAndKeywordList: React.FC = () => {
  const technology1: string[] = [
    "javascript",
    "spring-boot",
    "css",
    "self-hosting",
    "frontend",
    "career",
    "security",
    "typescript",
    "performan",
    "ui-design",
  ];

  const technology2: string[] = [
    "javascript",
    "spring-boot",
    "css",
    "self-hosting",
    "frontend",
    "career",
    "security",
    "typescript",
    "performan",
    "ui-design",
  ];

  const keywords: Keyword[] = [
    { label: "app-development", value: "app-development" },
    { label: "architecture", value: "architecture" },
    { label: "automation", value: "automation" },
    { label: "aws", value: "aws" },
    { label: "api development", value: "api development" },
    { label: "agile methodology", value: "agile methodology" },
    { label: "algorithms", value: "algorithms" },
    { label: "analytics", value: "analytics" },
    { label: "augmented reality", value: "augmented reality" },
    { label: "backend", value: "backend" },
    { label: "bigdata", value: "bigdata" },
    { label: "blockchain", value: "blockchain" },
    { label: "business", value: "business" },
    { label: "blogging", value: "blogging" },
    { label: "branding", value: "branding" },
    { label: "budgeting", value: "budgeting" },
    { label: "biotech", value: "biotech" },
    { label: "books", value: "books" },
    { label: "cloudcomputing", value: "cloudcomputing" },
    { label: "cybersecurity", value: "cybersecurity" },
    { label: "contentcreation", value: "contentcreation" },
    { label: "cryptocurrency", value: "cryptocurrency" },
    { label: "creativity", value: "creativity" },
    { label: "climatechange", value: "climatechange" },
    { label: "career", value: "career" },
    { label: "cinematography", value: "cinematography" },
    { label: "community", value: "community" },
  ];

  // Group keywords by the first letter
  const groupedKeywords: Record<string, string[]> = keywords.reduce(
    (acc, keyword) => {
      const firstLetter = keyword.label[0].toLowerCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(keyword.label);
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div className="container mx-auto w-[800px] mt-[80px] my-[25px]">
      <div className="bg-white rounded-md shadow-md h-[53px] flex items-center px-4 mb-2">
        <p className="text-secondary font-bold text-[20px]">ស្លាក #</p>
      </div>

      <div className="bg-white rounded-md shadow-md p-6">
        <div className="flex space-x-8">
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-4 text-secondary">
              ស្លាកពេញនិយម
            </h2>
            <ul className="list-disc pl-14 space-y-1">
              {technology1.map((tech, index) => (
                <li key={index} className="text-sm pb-2">
                  <a
                    href={`/content/tags/${tech}`}
                    className="hover:underline hover:text-primary"
                  >
                    {" "}
                    {tech}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-4 text-secondary">
              ស្លាកល្បីៗ
            </h2>
            <ul className="list-disc pl-14 space-y-1">
              {technology2.map((tech, index) => (
                <li key={index} className="text-sm pb-2">
                  <a
                    href={`/content/tags/${tech}`}
                    className="hover:underline hover:text-primary"
                  >
                    {" "}
                    {tech}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-2 bg-white rounded-md shadow-md p-6">
        <h2 className="text-lg font-bold mb-4 text-secondary">ពាក្យគន្លឹះ</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(groupedKeywords).map(([letter, items]) => (
            <div key={letter}>
              <h3 className="text-md font-bold text-secondary mb-2">
                {letter.toUpperCase()}
              </h3>
              <ul className="list-disc pl-4 space-y-1">
                {items.map((item, index) => (
                  <li key={index} className="text-sm pb-2">
                    <a href={`/content/tags/${item}`} className="hover:underline hover:text-primary"> {item} </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechAndKeywordList;
