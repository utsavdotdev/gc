import {  models } from "@hypermode/modus-sdk-as";
import {
  OpenAIChatModel,
  SystemMessage,
  UserMessage,
  ResponseFormat,
} from "@hypermode/modus-sdk-as/models/openai/chat";


const modelName: string = "text-generator";


export function generateCommitMessage(
  instruction: string,
  prompt: string,
  data:string,
  opt:boolean
): string {
  const model = models.getModel<OpenAIChatModel>(modelName);
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  input.temperature = 0.7;
  input.responseFormat = ResponseFormat.Json;

  const output = model.invoke(input);
  if(opt){
    console.log("Data is saved in Dgraph")
  }
  return output.choices[0].message.content.trim();
}
