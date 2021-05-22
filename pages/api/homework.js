import { Client } from "@notionhq/client";

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const database_id = process.env.NOTION_DATABASE_ID;

export default async (req, res) => {
  const { results } = await notion.databases.query({
    database_id: database_id,
    filter: {
      and: [
        {
          property: "Finished",
          checkbox: {
            equals: false,
          },
        },
        {
          property: "Tags",
          multi_select: {
            does_not_contain: "Finished",
          },
        },
      ],
    },
  });

  // const content = meta.forEach(async (item) => {
  //   console.log(item.id);
  //   const { results } = await notion.blocks.children.list({
  //     block_id: item.id,
  //   });
  //   console.log(results, "results");
  // })
  


  const meta = await results.map((page) => {
    
    return {
      //   content: results[0].paragraph.text[0].plain_text,
      id: page.id,
      title: page.properties.Name.title[0].text.content,
      date_start: page.properties.Date.date.start,
      date_end: page.properties.Date.date.end,
      tag_name: page.properties.Tags.multi_select[0].name,
      tag_color: page.properties.Tags.multi_select[0].color,
    };
    
  });

  res.status(200).json(meta);
};
