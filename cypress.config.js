const { defineConfig } = require('cypress');
const MailSlurp = require('mailslurp-client').default;

const apiKey = 'Your_API';
const mailslurp = new MailSlurp({ apiKey });

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async createInbox() {
          const inbox = await mailslurp.createInbox();
          return inbox;
        },
        async waitForOTP(inboxId) {
          const email = await mailslurp.waitForLatestEmail(inboxId, 60000, true);
          
          console.log('=== EMAIL DEBUG ===');
          console.log('Subject:', email.subject);
          
          let content = email.body || '';
          
          let otpMatch = content.match(/<p[^>]*letter-spacing[^>]*>\s*(\d{6})\s*<\/p>/i);
          if (otpMatch) {
            console.log('Found OTP in styled p tag:', otpMatch[1]);
            return otpMatch[1];
          }
          
          otpMatch = content.match(/>\s*(\d{6})\s*</);
          if (otpMatch) {
            console.log('Found OTP between tags:', otpMatch[1]);
            return otpMatch[1];
          }
          
          const textContent = content.replace(/<[^>]*>/g, ' ');
          otpMatch = textContent.match(/(?<![a-zA-Z0-9-])(\d{6})(?![a-zA-Z0-9-])/);
          if (otpMatch) {
            console.log('Found standalone OTP:', otpMatch[1]);
            return otpMatch[1];
          }
          
          console.log('No OTP found!');
          return null;
        }
      });
    },
  },
});