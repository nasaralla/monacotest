import { callGPT } from "../utils/chatgpt";
import { getDealInfo } from "../utils/pipedrive";

export async function GET() {
  try {
    const deal_prompt = await getDealInfo(83164);
    const response = await callGPT(deal_prompt);
    return Response.json({ response }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
