var casper = require("casper").create();

    viewport = {'width': 1366, 'height': 785},
    pause_time = 200000,
    page_login_url = "https://mdashboard.telkom.co.id/indihome/#!/login",
    account_username = "", //isi dengan username
    account_password = ""; //isi dengan password

var links = [
  'https://mdashboard.telkom.co.id/indihome/#!/fibershareKB',
  'https://mdashboard.telkom.co.id/indihome/#!/newsalesR6',
  'https://mdashboard.telkom.co.id/assurance/#!/witel_tot_cons',
  'https://mdashboard.telkom.co.id/maintenance/#!/witel_odpusia',
  'https://mdashboard.telkom.co.id/maintenance/#!/witel_underspec'
];

var currentLink = 0;

// Return text content from the last 'h1'
function get_page_title(){
    return jQuery("h1").last().text();
}

/*
 * Open the page and set the viewport
 */
casper.start(page_login_url, function(response) {
    var title = casper.evaluate(get_page_title);
    this.echo("Page title: "+title, 'INFO');
    this.viewport(viewport.width, viewport.height);
    this.echo("Fixed viewport to: "+viewport.width+"x"+viewport.height, 'INFO');
});


casper.waitForSelector("form input[type='text']", function() {
    this.fillSelectors('form.ng-pristine', {
        'input[type = text ]': account_username,
        'input[type = password ]': account_password,
    }, true);
    this.evaluate(function () {
      var a = '<input type="submit" id="btnSubmit" value="Submit"/>';
      $('form').append(a);
    });
    this.echo("Append button");

    // CODINGAN UNTUK SCREENSHOT BEFORE LOGIN
    // this.wait(20000, function () {
    //    casper.capture('img/screenshot.png');
    //    this.echo("Taken screenshot form before login");
    //  });
});

casper.then(function(){
     this.evaluate(function() {
       var lb = document.getElementById('btnSubmit');
       lb.click();
     });
     this.echo('Submited');
});


casper.then(function(){
  this.wait(70000,function (){
     this.echo("Success Login " +this.getCurrentUrl());
   });
});


function check() {
  if (links[currentLink] && currentLink < (links.length+1)) {
      casper.thenOpen(links[currentLink], function(status) {
        this.wait(50000, function (){
          if (currentLink == 1){
            casper.capture('img/screenshot' + currentLink  + '.png', {
                top: 80,
                left: 155,
                width: 1040,
                height: 700,
                quality: 100
            });
          }else if (currentLink == 2) {
            casper.capture('img/screenshot' + currentLink  + '.png', {
                top: 118,
                left: 155,
                width: 1050,
                height: 550,
                quality: 100
            });
          }else {
            casper.capture('img/screenshot' + currentLink  + '.png', {
                top: 107,
                left: 40,
                width: 1270,
                height: 610,
                quality: 100
            });
          }
          // this.captureSelector('img/screenshot' + currentLink  + '.png','svg#svg2', {quality: 100});
          // casper.capture("img/screenshot" + currentLink  + ".png");
          this.echo("Taken screenshot "+ currentLink + " " + this.getCurrentUrl());
        });
      });
      currentLink++;
      this.run(check);
  }else{
      this.echo("All done. Image capture complete!");
      this.exit();
  }
}

casper.run(check);


// creditby -> MUHAMMAD FAUZAN RAHMAN/telkomuniversity ig:@mhmdfzan
