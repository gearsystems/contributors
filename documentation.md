#piechart.js
```js
var x, string="", user = new Array(), commit = new Array(), addition = new Array(), deletion = new Array(), yes = new Array();
```
Defining the variables which are empty or containing nothing for now. __x__ is the data which is coming from the server, __string__ for displaying the data in the text form, __user__ is an array for storing the user names, __commit__, __addition__ and __deletion__ for storing the number of commits, additions and deletions done by the user. __yes__ array is storing the contents for displaying in the pie chart.
```
jsgoogle.load("visualization", "1", {packages: ["corechart"]});
```
It requests the Google to load the visualization and packages of the corechart.
```js
$(document).ready(function(){
    $.ajax({
        url: "https://api.github.com/repos/gearsystems/publicportal/stats/contributors",
        dataType: "json",
        success: function (data_from_server)
        {
            x = data_from_server;
            string="JSON DATA" + "<br>";
            yes.push('Users','Commits','Additions','Deletions');
            for (var i = 0; i < x.length; i++ ) {
                string += x[i].author.login + "<br>";
                user.push(x[i].author.login);
                var count_commits = 0, count_additions = 0, count_deletions = 0;
                for (var j = 0 ;j < 4 ; j++){
                    string += "No of commits: " + x[i].weeks[j].c + "<br>";
                    count_commits += x[i].weeks[j].c;
                    string += "No of additions: " + x[i].weeks[j].a + "<br>";
                    count_additions += x[i].weeks[j].a;
                    string += "No of deletions: " + x[i].weeks[j].d + "<p>";
                    count_deletions += x[i].weeks[j].d;
                }
                commit.push(count_commits);
                addition.push(count_additions);
                deletion.push(count_deletions);
            };
            for (var i = 0; i < x.length; i++ ){
                yes.push(user[i],commit[i],addition[i],deletion[i]);
            }

            //Commits
            var data = google.visualization.arrayToDataTable([
                [yes[0], yes[1]],
                [yes[4], yes[5]]
                ]);
            for (var i = 2; i < (yes.length)/4; i++ ){
                data.addRows([[yes[(4*i)],yes[(4*i)+1]]]);
            }
            var options = {
                title: 'Commits'
            };
            var chart = new google.visualization.PieChart(document.getElementById('Commits'));
            chart.draw(data, options);

            //Additions
            var data = google.visualization.arrayToDataTable([
                [yes[0], yes[2]],
                [yes[4], yes[6]]
                ]);
            for (var i = 2; i < (yes.length)/4; i++ ){
                data.addRows([[yes[(4*i)],yes[(4*i)+2]]]);
            }
            var options = {
                title: 'Additions'
            };
            var chart = new google.visualization.PieChart(document.getElementById('Additions'));
            chart.draw(data, options);

            //Deletions
            var data = google.visualization.arrayToDataTable([
                [yes[0], yes[3]],
                [yes[4], yes[7]]
                ]);
            for (var i = 2; i < (yes.length)/4; i++ ){
                data.addRows([[yes[(4*i)],yes[(4*i)+3]]]);
            }
            var options = {
                title: 'Deletions'
            };
            var chart = new google.visualization.PieChart(document.getElementById('Deletions'));
            chart.draw(data, options);
        }  
    });
});
```
This is using ajax in the _$.ajax();_
- __url__ is containing the url.
- __datatype__ is json.
- On __success__, the data from server is stored in the variable data_from_server.
> Variable __x__ is storing the __data_from_server__. __string__ stores 'JSON DATA'. 'Users', 'Commits', 'Additions' and 'Deletions' are being pushed or appended in the __yes__ array. Now, in the for loop whose size is 'x.length' i.e. the number of users, __string__ is appended by the author's name which is being pushed in the __user__ array. Variable __count_commits__, __count_additions__ and __count_deletions__ for storing the number of commits, additions and deletions made by a particular author/user respectively. In a nested for loop of size 4, __count_commits__, __count_additions__ and __count_deletions__ are calculated respectively and the __string__ is appended. Exiting the nested for loop, __count_commits__, __count_additions__ and __count_deletions__ are pushed into the __commit__, __addition__ and __deletion__ respectively.
Exiting the for(earlier) loop, created an extra for loop in which the __user__, __commit__, __addition__ and __deletion__ ae pushed into the __yes__ array. For the piechart of 'Commits', __data__ is a 2-d array which has 'Users' and 'Commits' as the first row and then the second row contains the 'user1' and the 'noCommits1'. The __data__ is appended by the remaining users/authors and their commits. In variable __options__, title is made as 'Commits'. Now __chart__ variable is created, which the 'div' element in the body has id: 'Commits' and the visualization of the piechart for the 'Commits' is made. Finally the __chart__ is drawn. Similarly, the 'Additions' and 'Deletions' piecharts are made.