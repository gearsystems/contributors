var x, string="", user = new Array(), commit = new Array(), addition = new Array(), deletion = new Array(), yes = new Array();
google.load("visualization", "1", {packages: ["corechart"]});
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