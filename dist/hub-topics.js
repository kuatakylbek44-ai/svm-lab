(() => {
  'use strict';

  const { lang, lectures, practice, labels } = window.COURSE_DATA;
  const languageIndex = { kk: 0, ru: 1, en: 2 }[lang];
  const suffix = lang === 'kk' ? '' : `.${lang}`;
  const topicIdsByWeek = {
    1: ['intro'],
    2: ['pandas'],
    3: ['visualization'],
    4: ['preprocessing'],
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

  const starterTopics = [
    { id: 'intro', english: 'MACHINE LEARNING', tags: ['Classification', 'Accuracy'] },
    { id: 'pandas', english: 'PYTHON & PANDAS', tags: ['DataFrame', 'Filter'] },
    { id: 'visualization', english: 'DATA VISUALIZATION', tags: ['Scatter', 'Correlation'] },
    { id: 'preprocessing', english: 'DATA PREPROCESSING', tags: ['Missing values', 'Min–max'] }
  ];
  const axes = '<path d="M42 24v116h240" fill="none" stroke="#8c9c91" stroke-width="2"/>';
  const starterPlots = {
    intro: axes + '<path class="topic-mark" d="M155 25v114" stroke="#7654aa" stroke-width="3" stroke-dasharray="6 5"/>'
      + [67, 91, 118, 138, 179, 203, 235, 264].map((x, i) => `<circle class="topic-mark" cx="${x}" cy="${100 - i * 7 + (i % 2) * 17}" r="7" fill="${i < 4 ? '#7654aa' : '#207d65'}"/>`).join(''),
    pandas: '<rect x="42" y="30" width="236" height="108" rx="9" fill="#fcfdf8"/>'
      + [41, 64, 87, 110].map((y, i) => `<rect class="topic-mark" x="53" y="${y}" width="214" height="17" rx="4" fill="${i === 0 ? '#207d65' : '#b5d6c6'}"/><path d="M111 ${y}v17m78-17v17" stroke="#fcfdf8" stroke-width="2"/>`).join(''),
    visualization: axes + [24, 47, 75, 62, 104].map((h, i) => `<rect class="topic-mark" x="${60 + i * 45}" y="${139 - h}" width="28" height="${h}" rx="4" fill="${i % 2 ? '#7654aa' : '#207d65'}"/>`).join(''),
    preprocessing: '<path d="M147 82h29m-9-8 9 8-9 8" fill="none" stroke="#207d65" stroke-width="3"/>'
      + [38, 62, 86, 110].map((y, i) => `<rect class="topic-mark" x="42" y="${y}" width="89" height="15" rx="5" fill="${i === 1 ? 'none' : '#b4a1d3'}" stroke="#7654aa"/><rect class="topic-mark" x="189" y="${y}" width="${[44, 61, 76, 89][i]}" height="15" rx="5" fill="#207d65"/>`).join('')
  };

  window.renderHubTopics = (topics, renderCard) => {
    const lectureByWeek = new Map(lectures.map(lecture => [lecture.n, lecture]));
    const starters = starterTopics.map((topic, index) => {
      const week = index + 1;
      const lecture = lectureByWeek.get(week);
      return {
        ...topic,
        name: lecture.title[languageIndex],
        desc: lecture.summary[languageIndex],
        label: topic.english,
        lab: labels[lang].practiceLab,
        href: page('practice', week)
      };
    });
    const topicById = new Map([...starters, ...topics].map(topic => [topic.id, topic]));
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
          <div class="topic-grid">${cards.map(topic => renderCard(topic, starterPlots[topic.id])).join('')}</div>
        </section>`;
    });
    const host = document.getElementById('topicCards');
    host.innerHTML = sections.join('');
    host.querySelectorAll('.topic-group-links').forEach((links, index) => {
      const ids = topicIdsByWeek[practice[index].n];
      links.append(window.TOPIC_GUIDE.button(ids.map(id => topicById.get(id))));
    });
    return orderedTopics;
  };
})();
