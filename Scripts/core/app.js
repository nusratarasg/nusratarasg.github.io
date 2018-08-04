/* Custom javaScripts goes here */

/* File name           app.js
 * Author's name       Nusrat Ara Riaz
 * Student id          300759574
 * Assignment 3        Mini Portfolio-JSON Data & AJAX Component
 * Web site name       
 * File description    This file contain JavaScript
 */

// core module - IIFE
(function () {
  // App variables
  let XHR;
  let hash;
  let addressBook;
  let projectBook;
  let contacts;
  let paragraphs;
  let projects;
  let intro;
  //----

  /**
   * This function inserts HTML from a file or other location
   * into the specificied tag / element that exists on the
   * index.html page
   *
   * @param {string} sourceURL
   * @param {string} destTag
   */
  function insertHTML(sourceURL, destTag) {
    let target = document.querySelector(destTag);

    XHR = new XMLHttpRequest();
    XHR.addEventListener("readystatechange", function () {
      if (this.status === 200) {
        if (this.readyState === 4) {
          target.innerHTML = this.responseText;
          setActiveNavLink();

          if (document.title == "Project") {
            loadprojects();
          } else if (document.title == "Home") {
            loadintro();
          } else if (document.title == "Contact") {

            console.log(
              "%cForm data will be displayed below when data is valid and Submit Button is clicked.",
              "font-weight:bold; font-size: 16px; color: blue;"
            );
            //--try
            let FirstName = document.getElementById("FirstName");
            let LastName = document.getElementById("LastName");
            let ContactNumber = document.getElementById("ContactNumber");
            let EmailAddress = document.getElementById("EmailAddress");
            let Message = document.getElementById("Message");

            function OutputFormDataToConsole() {
              console.log(
                `%c ----------------------------------------------`,
                "color: blue;background-color:grey;font-weight:bold;"
              );
              console.log(
                `%c Personal Info:`,
                "font-weight:bold; font-size: 16px; color: green;"
              );
              console.log(
                `%c ----------------------------------------------`,
                "color: blue;background-color:grey;font-weight:bold;"
              );
              console.log(
                `%c First Name    : ${FirstName.value}`,
                "color: blue;font-weight:bold;"
              );
              console.log(
                `%c Last Name     : ${LastName.value}`,
                "color: blue;font-weight:bold;"
              );
              console.log(
                `%c Contact Number: ${ContactNumber.value}`,
                "color: blue;font-weight:bold;"
              );
              console.log(
                `%c Email Address : ${EmailAddress.value}`,
                "color: blue;font-weight:bold;"
              );
              console.log(
                `%c Message       : ${Message.value}`,
                "color: blue;font-weight:bold;"
              );
              console.log(
                `%c ----------------------------------------------`,
                "color: blue;background-color:grey;font-weight:bold;"
              );
            }

            //--end of try
            //--try2
            function clearValidationMessages() {
              FirstName.setCustomValidity("");
              LastName.setCustomValidity("");
              ContactNumber.setCustomValidity("");
              EmailAddress.setCustomValidity("");
              Message.setCustomValidity("");
            }

            function setEventHandlersForFormElements() {
              for (const element of document.forms[0].elements) {
                if (
                  element.tagName === "INPUT" ||
                  element.tagName === "TEXTAREA"
                ) {
                  // when the user is inputting data
                  element.addEventListener("input", function () {
                    element.setCustomValidity("");
                  });
                  element.addEventListener("invalid", function () {
                    switch (element.id) {
                      case "FirstName":
                        element.setCustomValidity(
                          "Enter at least initial for name"
                        );
                        break;
                      case "LastName":
                        element.setCustomValidity(
                          "Enter at least initial for name"
                        );
                        break;
                      case "ContactNumber":
                        element.setCustomValidity(
                          "Required pattern is (###) ###-####"
                        );
                        break;
                      case "EmailAddress":
                        element.setCustomValidity(
                          "Email should like this xxx@x.xxx"
                        );
                        break;
                      case "Message":
                        element.setCustomValidity("Can not be Empaty");
                        break;
                      default:
                        element.setCustomValidity("This Field is Required");
                        break;
                    }
                  });
                }
              }
            }

            function ValidateForm() {
              setEventHandlersForFormElements();
            }
            //--end of try 2
            //=============================================================================

            // ====================End of extrs Code =============================

            //=============================Below one  Cancel and Submit Button code working===================================================
            let SendButton = document.getElementById("SendButton");
            SendButton.addEventListener("click", event => {
              event.preventDefault();
              if (document.forms[0].checkValidity()) {
                clearValidationMessages();
                ValidateForm();
                // OutputFormDataToConsole(); // If it is here it only display data when it is valid
              }
              OutputFormDataToConsole(); // If it is here it display data valid  and invalid both


              window.open(
                setPageContent("/Views/content/contact.html"),
                "_parent"
              );
            });
            document.forms[0].appendChild(SendButton);

            // create a new HTML Element
            let cancelButton = document.createElement("button");
            // configuring the HTML Element
            cancelButton.setAttribute("class", "btn btn-danger btn-lg");
            cancelButton.classList.add("btn-lg");
            cancelButton.textContent = "Cancel";

            cancelButton.addEventListener("click", function (event) {
              event.preventDefault();
              loadintro();
              window.open(
                "/Views/content/home.html",
                "_parent"
              );
              // window.open(
              //   setPageContent("/Views/content/home.html"),
              //   "_parent"
              // );
              // window.addEventListener("load", loadintro);
              // if (document.title == `Contact`) {
              //   loadintro();
              // }

              window.open("load", loadintro);
            });

            // Attaching a button to the first forml element
            document.forms[0].appendChild(cancelButton);

            //=======================UNtil here code is for Cancel and Submit button===========================
          }
        }
      }
    });
    XHR.open("GET", sourceURL);
    XHR.send();
  }

  function loadintro() {
    XHR = new XMLHttpRequest();
    XHR.addEventListener("readystatechange", function () {
      if (this.status === 200) {
        if (this.readyState === 4) {
          intro = JSON.parse(this.responseText);
          for (const property in intro) {
            if (intro.hasOwnProperty(property)) {
              // console.log(intro[property]);
            }
          }

          if (document.title == "Home") {
            document.getElementById("intro").textContent =
              intro.Introduction.myintro;
            document.getElementById("mdetail").textContent =
              intro.Introduction.mission;
            document.getElementById("mquote").textContent =
              intro.Introduction.quote;
          }
        }
      }
    });
    XHR.open("GET", "/paragraphs.json");
    XHR.send();
  }

  function loadprojects() {
    XHR = new XMLHttpRequest();
    XHR.addEventListener("readystatechange", function () {
      if (this.status === 200) {
        if (this.readyState === 4) {
          projects = JSON.parse(this.responseText);
          for (const property in projects) {
            if (projects.hasOwnProperty(property)) {
              //console.log(projects[property]);
            }
          }
          if (document.title == "Project") {
            document.getElementById("pname1").textContent =
              projects.Project1.pname;
            document.getElementById("pdetail1").textContent =
              projects.Project1.pdetail;
            document.getElementById("pbenefit1").textContent =
              projects.Project1.pbenefit;

            document.getElementById("pname2").textContent =
              projects.Project2.pname;
            document.getElementById("pdetail2").textContent =
              projects.Project2.pdetail;
            document.getElementById("pbenefit2").textContent =
              projects.Project2.pbenefit;

            document.getElementById("pname3").textContent =
              projects.Project3.pname;
            document.getElementById("pdetail3").textContent =
              projects.Project3.pdetail;
            document.getElementById("pbenefit3").textContent =
              projects.Project3.pbenefit;
          }
        }
      }
    });
    XHR.open("GET", "/projectdata.json");
    XHR.send();
  }

  /**
   * This function is used for Intialization
   */
  function Start() {
    // console.log(
    //   `%c App Initializing...`,
    //   "font-weight: bold; font-size: 20px;"
    // );

    Main();
  }

  /**
   * This function is the where the main functionality for our
   * web app is happening
   */
  function Main() {
    //console.log(`%c App Started...`, "font-weight: bold; font-size: 20px;");

    insertHTML("/Views/partials/header.html", "header");

    setPageContent("/Views/content/home.html");

    insertHTML("/Views/partials/footer.html", "footer");
  }

  function setPageContent(url) {
    insertHTML(url, "main");
  }

  function Route() {
    // sanitize the url - remove the #
    hash = location.hash.slice(1);

    document.title = hash;

    // change the URL of my page
    history.pushState("", document.title, "/" + hash.toLowerCase() + "/");

    setPageContent("/Views/content/" + hash.toLowerCase() + ".html");
  }

  function setActiveNavLink() {
    // clears the "active" class from each of the list items in the navigation
    document.querySelectorAll("li.nav-item").forEach(function (listItem) {
      listItem.setAttribute("class", "nav-item");
    });

    // add the "active" class to the class attribute of the appropriate list item
    document.getElementById(document.title).classList.add("active");

  }





  window.addEventListener("load", Start);

  window.addEventListener("hashchange", Route);
})();