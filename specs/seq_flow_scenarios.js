const { browser } = require('protractor');


beforeEach(async () => {
    await browser.waitForAngularEnabled(false);
});

describe('First Run test', () => {
    
    it('test google',async()=>{
        await browser.get("https://google.com");

    })
    
});