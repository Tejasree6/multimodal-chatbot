// lib/tools.ts
import { z } from 'zod';

export const getCurrentTime = {
  name: 'getCurrentTime',
  description: 'Gets the current time for a given timezone.',
  parameters: z.object({
    timezone: z.string().describe('The timezone to get the current time for, e.g., "America/New_York"'),
  }),
  execute: async ({ timezone }: { timezone: string }) => {
    try {
      const now = new Date();
      const options = { timeZone: timezone, hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const formatter = new Intl.DateTimeFormat('en-US', options as any);
      return `The current time in ${timezone} is ${formatter.format(now)}.`;
    } catch (error) {
      return 'Sorry, I could not find the time for that timezone.';
    }
  },
};