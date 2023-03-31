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
    default:
      return value;
  }
}