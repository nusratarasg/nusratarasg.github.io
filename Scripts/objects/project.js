/* File name           project.js
 * Author's name       Nusrat Ara Riaz
 * Student id          300759574
 * Assignment 3        Mini Portfolio-JSON Data & AJAX Component
 * Web site name       
 * File description    This file contain JavaScript code for classes
 */

let objects;
(function (objects) {


    class Intro {
        constructor(intro = "", mission = "", quote = "") {
            this.intro = intro;
            this.mission = mission;
            this.quote = quote;
        }

    }

    class Project {
        constructor(pname = "", pdetail = "", pbenefit = "") {
            this.pname = pname;
            this.pdetail = pdetail;
            this.pbenefit = pbenefit;


        }

    }

    // objects.Contact = Contact;
    objects.Intro = Intro;
    objects.Project = Project;

})(objects || (objects = {}));