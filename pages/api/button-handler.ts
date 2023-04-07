import { EmotionalContext, promptContext } from '@/utils/promt_context';

const EMOTIONAL_CONTEXT_CHANGE_ANSWER = 'Просто напиши в ответ "Хорошо" и ничего более'

export function tryMapButtonToPrompt(value: string): string {
  switch (value) {
    case 'CREATE_TEST':
      return 'Придумай мне тест на знание английских слов на тему "кулинария". В тесте должно быть 3 вопросf, для каждого четыре варианта ответа и только один правильный'
    case 'EMOTIONAL_CONTEXT_FRIEND':
      promptContext.setUpEmotionalContext(EmotionalContext.Friend)
      return EMOTIONAL_CONTEXT_CHANGE_ANSWER;
    case 'EMOTIONAL_CONTEXT_ROBLOX':
        promptContext.setUpEmotionalContext(EmotionalContext.Roblox)
        return EMOTIONAL_CONTEXT_CHANGE_ANSWER;
    case 'SWITCH_SKYENG_CONTEXT':
        promptContext.includeSkyengContext = !promptContext.includeSkyengContext;
        return EMOTIONAL_CONTEXT_CHANGE_ANSWER;
    case 'SWITCH_TRANSLATION_CONTEXT':
        promptContext.enableRandomWordTranslation = !promptContext.enableRandomWordTranslation;
        return EMOTIONAL_CONTEXT_CHANGE_ANSWER;
    case 'MARKDOWN_TEST':
      return 'Предложи мне отменить свой урок через ссылку в формате markdown с текстом "отменить" и "ссылкой" https://student.skyeng.ru/chat/cancel-lesson/123'
    default:
      return value;
  }
}