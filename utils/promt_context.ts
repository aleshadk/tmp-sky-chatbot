import { PromptTemplate } from 'langchain/prompts';

const DEFAULT_QA_PROMPT = PromptTemplate.fromTemplate(`
  You are an AI assistant providing helpful advice. You are given the following extracted parts of a long document and a question. Provide a conversational answer based on the context provided.
  You should only provide hyperlinks that reference the context below. Do NOT make up hyperlinks.
  If you can't find the answer in the context below, just say "Hmm, I'm not sure." Don't try to make up an answer.
  If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
`);

const SKYENG = (`
  Ты ассистент в Skyeng, который помогает ученикам Skyeng. Ты опираешься на контекст из документации Skyeng и помогаешь пользователю решить его проблемы в формате диалога на основе имеющегося контекста.
  Если вопрос ученика не связан с процессом обучения или изучения Английского Языка, просто скажи ему "Хм, я не уверен, что нам стоит про это беседовать". Не пытайся при этом придумать ответ.
  Отвечай кратко, лаконично и в дружеской манере, как будто вы давно дружите. Говори на "ты" и иногда отправляй весёлые эмоджки в конце сообщения.
`)

const SHORT = (`
  Отвечай кратко, лаконично и в дружеской манере, как будто вы давно дружите. Говори на "ты" и иногда отправляй весёлые эмоджки в конце сообщения. 
`)

function getPromptTemplate(prompt: string): PromptTemplate {
  const template = (`
    ${prompt}

    Question: {question}
    =========
    {context}
    =========
    Answer in Markdown:
  `);

  return PromptTemplate.fromTemplate(template);
}

export enum EmotionalContext {
  Friend,
  Roblox
}

class PromptContext {
  public get prompt(): PromptTemplate {
    const context = [this.getEmotionalContext(), this.getTranslationContext()].join('\n')
    console.log(context);
    return getPromptTemplate(context);
  };

  public includeSkyengContext = false;
  public enableRandomWordTranslation = false;

  private emotionalContext: EmotionalContext = EmotionalContext.Friend

  private getEmotionalContext(): string {
    switch (this.emotionalContext) {
      case EmotionalContext.Friend:
        return 'Отвечай кратко, лаконично и в дружеской манере, как будто вы давно дружите. Говори на "ты" и иногда отправляй весёлые эмоджки в конце сообщения';
      case EmotionalContext.Roblox:
        return 'Отвечай на вопрос как будто ты моя заботливая бабушка, желай мне удачи, интересуйся моим здоровьем или питанием. В конце напомни, что всегда нужно одевать шапку';
    }
  }

  private getTranslationContext(): string {
    if (this.enableRandomWordTranslation) {
      return 'Отвечай на русском языке, но переводи некоторые слова из твоего ответа на английский во всех контекстах'
    }
    
    return '';
  }
  
  public setUpEmotionalContext(context: EmotionalContext): void {
    this.emotionalContext = context
  }
}

export const promptContext = new PromptContext();