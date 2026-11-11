(() => {
  'use strict';

  const { lang, lectures, practice, labels } = window.COURSE_DATA;
  const languageIndex = { kk: 0, ru: 1, en: 2 }[lang];
  const suffix = lang === 'kk' ? '' : `.${lang}`;
  const topicIdsByWeek = {
    5: ['linear'],
    6: ['logistic'],
    7: ['evaluation', 'knn'],
    8: ['svm'],
    9: ['penguins', 'autompg'],
    10: ['unsupervised', 'imbalanced'],
    11: ['neural']
  };
  const number = week => String(week).padStart(2, '0');
  const page = (name, week) => `${name}${suffix}.html?n=${week}`;

  window.renderHubTopics = (topics, renderCard) => {
    const topicById = new Map(topics.map(topic => [topic.id, topic]));
    const lectureByWeek = new Map(lectures.map(lecture => [lecture.n, lecture]));
    const orderedTopics = [];
    const sections = practice.map(week => {
      const lecture = lectureByWeek.get(week.n);
      const title = (lecture || week).title[languageIndex];
      const cards = (topicIdsByWeek[week.n] || []).map(id => topicById.get(id));
      cards.forEach(topic => {
        topic.num = number(week.n);
        orderedTopics.push(topic);
      });

      const lectureLink = lecture
        ? `<a href="${page('lecture', week.n)}">${labels[lang].lecture} →</a>`
        : '';
      const practiceLink = cards.some(topic => topic.href === page('practice', week.n))
        ? ''
        : `<a href="${page('practice', week.n)}">${labels[lang].practice} →</a>`;
      return `
        <section class="topic-group" aria-labelledby="topic-group-${week.n}">
          <div class="topic-group-heading">
            <h3 id="topic-group-${week.n}"><span>${number(week.n)}</span> ${title}</h3>
            <div class="topic-group-links">${lectureLink}${practiceLink}</div>
          </div>
          ${cards.length ? `<div class="topic-grid">${cards.map(renderCard).join('')}</div>` : ''}
        </section>`;
    });
    document.getElementById('topicCards').innerHTML = sections.join('');
    return orderedTopics;
  };
})();
