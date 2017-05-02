var jsonfile = require('jsonfile')
const webdriver = require('selenium-webdriver')

const driver = new webdriver.Builder()
  // The "9515" is the port opened by chrome driver.
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      // Here is the path to your Electron binary.
      binary: '/Applications/Brave.app/Contents/MacOS/Brave'
    }
  })
  .forBrowser('electron')
  .build()


var file = './alexa_10000.json'
domains=jsonfile.readFileSync(file)
//console.dir(jsonfile.readFileSync(file))
console.log(domains.length)
var startTime = Date.now()
for (var i = 0; i < domains.length; i++){
  var startDomain = Date.now()
  console.log(domains[i])
  driver.get(domains[i])
  driver.wait(() => {
    return driver.getTitle().then((title) => {
      console.log(title)
      var endDomain = Date.now()
      domainTime = endDomain - startDomain
      console.log('Domain Time : ' + domainTime)
    })
  }, 1000)
}
driver.quit()
var endTime = Date.now()

var totalTime = endTime - startTime
console.log('Total time : ' + totalTime)
