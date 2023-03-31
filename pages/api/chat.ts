import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';
import { makeChain } from '@/utils/makechain';
import { pinecone } from '@/utils/pinecone-client';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { USER_CONTEXT_PROMT } from './context';
import { tryMapButtonToPrompt } from './button-handler';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  let raw_question = req.body.question;
  let history = req.body.history;


  let question = tryMapButtonToPrompt(raw_question);

  const commandWasHandled = question !== raw_question;

  if (!commandWasHandled) {
    question = `${USER_CONTEXT_PROMT} Зная это, ответь на вопрос: Я занимаюсь в Skyeng и хочу тебя спросить ${question}`
  }

  if (!question) {
    return res.status(400).json({ message: 'No question in the request' });
  }
  // OpenAI recommends replacing newlines with spaces for best results
  const sanitizedQuestion = question.trim().replaceAll('\n', ' ');


  const index = pinecone.Index(PINECONE_INDEX_NAME);

  /* create vectorstore*/
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({}),
    {
      pineconeIndex: index,
      textKey: 'text',
      namespace: PINECONE_NAME_SPACE,
    },
  );

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  });

  const sendData = (data: string) => {
    res.write(`data: ${data}\n\n`);
  };

  sendData(JSON.stringify({ data: '' }));

  //create chain
  const chain = makeChain(vectorStore, (token: string) => {
    sendData(JSON.stringify({ data: token }));
  });

  try {
    //Ask a question
    const response = await chain.call({
      question: sanitizedQuestion,
      chat_history: history || [],
    });

    console.log('response', response);
    sendData(JSON.stringify({ sourceDocs: response.sourceDocuments }));
  } catch (error) {
    console.log('error', error);
  } finally {
    sendData('[DONE]');
    res.end();
  }
}
