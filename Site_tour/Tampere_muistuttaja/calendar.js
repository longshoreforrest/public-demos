// ============================================================
// calendar.js - .ics calendar file generation
// Tampere Muistuttaja - RFC 5545 compliant
// ============================================================

const CalendarGenerator = {
  /**
   * Generate a single VEVENT string
   */
  createEvent(task, personName) {
    const uid = `${task.id}@tampere-muistuttaja`;
    const now = this.formatDate(new Date());
    const deadlineDate = new Date(task.deadline + 'T09:00:00');
    const dtstart = this.formatDate(deadlineDate);
    const dtend = this.formatDate(new Date(deadlineDate.getTime() + 30 * 60000)); // 30 min

    const summary = this.escapeICS(task.description);
    const description = this.escapeICS(
      task.friendlyReminder + '\\n\\n' +
      (getLang() === 'fi' ? 'Vastuuhenkilö' : 'Assigned to') + ': ' + personName
    );

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtstart}`,
      `DTEND:${dtend}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `ORGANIZER;CN=Lempeä Muistuttaja:MAILTO:muistuttaja@example.com`,
      `STATUS:${task.status === 'done' ? 'COMPLETED' : 'CONFIRMED'}`,
      // Reminder 1 day before
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      `DESCRIPTION:${this.escapeICS(task.friendlyReminder)}`,
      'END:VALARM',
      // Reminder 1 hour before
      'BEGIN:VALARM',
      'TRIGGER:-PT1H',
      'ACTION:DISPLAY',
      `DESCRIPTION:${this.escapeICS(task.friendlyReminder)}`,
      'END:VALARM',
      'END:VEVENT'
    ].join('\r\n');
  },

  /**
   * Wrap events in a VCALENDAR
   */
  createCalendar(events) {
    const header = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Tampere Muistuttaja//Lempeä Muistuttaja//FI',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      `X-WR-CALNAME:${getLang() === 'fi' ? 'Lempeä Muistuttaja' : 'Gentle Reminder'}`,
    ].join('\r\n');

    const footer = 'END:VCALENDAR';

    return header + '\r\n' + events.join('\r\n') + '\r\n' + footer;
  },

  /**
   * Download a single task as .ics
   */
  downloadTask(task, personName) {
    const event = this.createEvent(task, personName);
    const cal = this.createCalendar([event]);
    this.triggerDownload(cal, `muistutus-${this.slugify(personName)}-${task.id}.ics`);
  },

  /**
   * Download all tasks for a person as .ics
   */
  downloadPersonTasks(tasks, personName) {
    if (tasks.length === 0) return;
    const events = tasks.map(task => this.createEvent(task, personName));
    const cal = this.createCalendar(events);
    this.triggerDownload(cal, `muistutukset-${this.slugify(personName)}.ics`);
  },

  /**
   * Download all tasks as .ics
   */
  downloadAllTasks(tasks, people) {
    if (tasks.length === 0) return;
    const events = tasks.map(task => {
      const person = people.find(p => p.id === task.personId);
      return this.createEvent(task, person ? person.name : 'Unknown');
    });
    const cal = this.createCalendar(events);
    this.triggerDownload(cal, 'muistutukset-kaikki.ics');
  },

  /**
   * Trigger browser download
   */
  triggerDownload(content, filename) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Format Date to iCalendar format (UTC)
   */
  formatDate(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  },

  /**
   * Escape special characters for iCalendar text
   */
  escapeICS(text) {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  },

  /**
   * Create URL-safe slug from name
   */
  slugify(text) {
    return text.toLowerCase()
      .replace(/[äå]/g, 'a')
      .replace(/ö/g, 'o')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
};
