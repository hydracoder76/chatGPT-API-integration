import { Request, Response } from "express";
import fs from "fs"
import axios from "axios";
import {
  ChatBlock,
  ChatBlockParams,
  WorkflowParams,
  Source,
} from "../model/model";

export async function chatWithGPT(req: Request, res: Response): Promise<void> {
  try {
    const apiKey = process.env.API_KEY;
    const { prompt, actions }: any = req?.body;
    const responseFromOpenAI = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: prompt,
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const generatedResponse = responseFromOpenAI.data.choices[0].text.trim();

    const chatBlockParamsUser = new ChatBlockParams(
      "USER",
      prompt,
      Date.now(),
      "usageId",
      true,
      [
        new Source(
          "Summarize layup demo script.doc",
          "https://docs.google.com/document/d/sample-url1"
        ),
      ]
    );

    const chatBlockParamsAssistant = new ChatBlockParams(
      "ASSISTANT",
      generatedResponse,
      Date.now(),
      "usageId",
      true,
      []
    );

    const chatBlock = new ChatBlock(
      1,
      chatBlockParamsUser,
      chatBlockParamsAssistant,
      new WorkflowParams("WORKFLOW", Date.now()),
      new WorkflowParams("WORKFLOW", Date.now(), generatedResponse)
    );

    const jsonResponse = JSON.stringify(chatBlock);

    fs.writeFile('response.json', jsonResponse, (err) => {
      if (err) {
        console.error('Failed to write JSON response to file:', err);
      } else {
        console.log('JSON response has been written to file successfully');
      }
    });

    if (actions) {
      const recipients = actions['share/drive'];
      if (recipients && recipients.length > 0) {
        console.log(`Shared with: ${recipients.join(', ')}`);
      }
    }

    res.status(200).json(chatBlock);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
}


