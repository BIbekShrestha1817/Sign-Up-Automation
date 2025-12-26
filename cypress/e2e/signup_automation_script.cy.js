describe("Sign up automation", () => {

  it("signup automation", () => {
      cy.visit('https://authorized-partner.vercel.app/register');
      
      cy.task('createInbox').then((inbox) => {
      const testEmail = inbox.emailAddress;
      const inboxId = inbox.id;
      
      cy.log(`Using MailSlurp email: ${testEmail}`);
      

      cy.get('button[role="checkbox"]').click();
      cy.get('button').contains('Continue').click();


      cy.get('input[name="firstName"]').type('Testaa');
      cy.get('input[name="lastName"]').type('Testaa');
      cy.get('input[name="email"]').type(testEmail);
      cy.get('input[name="phoneNumber"]').type('98670000024');
      cy.get('input[name="password"]').type('Test@123');
      cy.get('input[name="confirmPassword"]').type('Test@123');
      cy.get('button').contains('Next').click();
      
      cy.task('waitForOTP', inboxId).then((otp) => {
        expect(otp).to.not.be.null;
        cy.log(`Received OTP: ${otp}`);
        cy.get('input[data-input-otp="true"]').type(otp, { force: true });
        cy.get('button').contains('Verify').click();

      cy.get('input[name="agency_name"]').type('Test Agency');
      cy.get('input[name="role_in_agency"]').type('Manager');
      cy.get('input[name="agency_email"]').type('test@gmail.com');
      cy.get('input[name="agency_website"]').type('www.testagency.com');
      cy.get('input[name="agency_address"]').type('Kathmandu, Nepal');
      
      cy.get('button[role="combobox"]').first().click();
      cy.get('div.cursor-pointer').first().click();
      cy.get('button').contains('Next').click();

      cy.get('input[name="number_of_students_recruited_annually"]').type('10');
      cy.get('input[name="focus_area"]').type('Test Focus Area');
      cy.get('input[name="success_metrics"]').type('20');
      cy.get('button[role="checkbox"]').first().click();
      cy.get('button').contains('Next').click();
      
      });
    });
  });
});