interface ILessonSchedule {
  datetime: string; 
}

interface IScheduleContext {
  subject: string;
  teacher: string;
  lessons: ILessonSchedule[];
}


const SCHEDULE_CONTEXT: IScheduleContext[] = [
  {
    teacher: 'Тимофей Новиков',
    subject: 'Математика',
    lessons: [
      {datetime: '15 марта 2023 15:00'},
      {datetime: '30 марта 2023 15:00'},
      {datetime: '2 апреля 2023 15:00'},
      {datetime: '7 апреля 2023 15:00'},
      {datetime: '15 апреля 2023 15:00'},
    ]
  },
  {
    teacher: 'Николай Федотов',
    subject: 'Русский язык',
    lessons: [
      {datetime: '16 марта 2023 15:00'},
      {datetime: '29 марта 2023 15:00'},
      {datetime: '30 марта 2023 17:00'},
      {datetime: '3 апреля 2023 15:00'},
      {datetime: '10 апреля 2023 15:00'},
      {datetime: '12 апреля 2023 15:00'},
    ]
  }
]

function scheduleContextToPrompt(context: IScheduleContext[]): string {
  return context.map(x => {
    const lessons = x.lessons.map(y => y.datetime).join(',');
    return `У меня есть занятия по ${x.subject} у преподавателя ${x.teacher} ${lessons}`;
  }).join(', ');
}

function abandonedLessonsInThisMonthContextToPrompt(): string {
  return 'В этом месяце я уже отменял один урок';
}

function timeContextToPrompt(): string {
  return 'Сейчас 30 марта 16:00';
}

function getUserContextPromt() {
  return [
    timeContextToPrompt(),
    scheduleContextToPrompt(SCHEDULE_CONTEXT),
    abandonedLessonsInThisMonthContextToPrompt()
  ].join('. ');
}

export const USER_CONTEXT_PROMT = getUserContextPromt();