import { Client } from "@notionhq/client";

// Init client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
