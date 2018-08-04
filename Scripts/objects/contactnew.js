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


    objects.Intro = Intro;
    objects.Project = Project;

})(objects || (objects = {}));