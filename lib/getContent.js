import { Client } from "@notionhq/client"


const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export default async function getContent(id) {
  const block_id = id;
  const res = await notion.blocks.children.list({
    block_id: block_id,
  })

  console.log("res", res)
}
