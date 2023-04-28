import { Configuration, OpenAIApi } from "https://esm.sh/openai";

interface ChatGPTResponse {
  text: string;
}

interface ChatGPTRequest {
  prompt: string;
  temperature: number;
  max_tokens: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  apiKey: string;
}

export default async function getChatGPTResponse(
  input: ChatGPTRequest,
): Promise<ChatGPTResponse> {
  const configuration = new Configuration({
    apiKey: input.apiKey,
  });

  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input.prompt,
      max_tokens: 2048,
      temperature: 0.7,
    });

    return {
      text: response.data.choices[0].text ?? "",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
