let path = require('path');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let beautifulHtmlReporter = require('protractor-beautiful-reporter');
let currentDate = new Date();
var totalDateString = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + (currentDate.getYear() + 1900) + '-' + currentDate.getHours() + 'hrs-' + currentDate.getMinutes() + 'min-' + currentDate.getUTCSeconds() + 'sec';
let reportDirectorybeautiful = path.resolve(__dirname, '../reports/reportFolderbeautiful' + totalDateString);


module.exports = {
    directConnect: false,
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //seleniumArgs: ['-Dwebdriver.edge.driver=D:\\EdgeDrivers\\edge-81.0.416.77\\edgedriver_win64\\msedgedriver.exe'],
    seleniumArgs: ['-Dwebdriver.edge.driver=./../msedgedriver.exe'],
    capabilities: {
        browserName: 'MicrosoftEdge',
        loggingPrefs: {
            performance: 'ALL'
        },
        
     
    },
    framework: 'jasmine',
    //restartBrowserBetweenTests: true,
    getPageTimeout: 600000,
    allScriptsTimeout: 300000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 900000
    },
    

    onPrepare() {
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: false, // display stacktrace for each failed assertion
            displayFailuresSummary: true, // display summary of all failures after execution
            displaySuccessfulSpec: true, // display each successful spec
            displayFailedSpec: true, // display each failed spec
            displayPendingSpec: true, // display each pending spec
            displaySpecDuration: true, // display each spec duration
            displaySuiteNumber: true, // display each suite number (hierarchical)
            colors: {
                success: 'green',
                failure: 'red',
                pending: 'cyan'
            },
            prefixes: {
                success: '✓ ',
                failure: '✗ ',
                pending: '- '
            },
            customProcessors: []
        }));
        let originalJasmine2MetaDataBuilder = new beautifulHtmlReporter({
            'baseDirectory': './'
        })["jasmine2MetaDataBuilder"];

        jasmine.getEnv().addReporter(new beautifulHtmlReporter({
            baseDirectory: reportDirectorybeautiful,
            docTitle: 'HTML Report',
            docName: 'index.html',
            gatherBrowserLogs: true,
            showSummary: true,
            showQuickLinks: true,
            showConfiguration: true,
            screenshotsSubfolder: 'images',
            jsonsSubfolder: 'jsons',
            clientDefaults: {
                showTotalDurationIn: "header",
                totalDurationFormat: "h:m:s"
            },

            jasmine2MetaDataBuilder: function (spec, descriptions, results, capabilities) {
                //filter for pendings with pending() function and "unfail" them
                if (results && results.failedExpectations && results.failedExpectations.length > 0 && "Failed: => marked Pending" === results.failedExpectations[0].message) {
                    results.pendingReason = "Marked Pending with pending()";
                    results.status = "pending";
                    results.failedExpectations = [];
                }
                //call the original method after my own mods
                return originalJasmine2MetaDataBuilder(spec, descriptions, results, capabilities);
            },
            preserveDirectory: false
        }).getJasmine2Reporter());
        
        
        
    }
    

};