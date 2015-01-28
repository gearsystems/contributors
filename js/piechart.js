google.load("visualization", "1", {packages: ["corechart"]});
$(document).ready(function(){
    function requestUserData(URL, user, commit, addition, deletion){
        $.ajax({
            async: false,
            url: URL,
            dataType: "json",
            success: function(repodata){
                //console.log("JSON Data of " + reponame);
                console.log(repodata);
                for (var i = 0; i < repodata.length; i++ ) {
                    var flag = 0;
                    for(var usercount = 0; usercount < user.length; usercount++)
                        if(user[usercount]==repodata[i].author.login){
                            flag=1;
                            break;
                        }
                    var count_commits = 0, count_additions = 0, count_deletions = 0;
                    repodata_weeks_length = repodata[i].weeks.length;
                    for (var j = 0 ;j < repodata_weeks_length ; j++){
                        count_commits += repodata[i].weeks[j].c;
                        count_additions += repodata[i].weeks[j].a;
                        count_deletions += repodata[i].weeks[j].d;
                    }
                    if(flag == 0){
                        user.push(repodata[i].author.login);
                        commit.push(count_commits);
                        addition.push(count_additions);
                        deletion.push(count_deletions);
                    }
                    else{
                        commit[usercount] += count_commits;
                        addition[usercount] += count_additions;
                        deletion[usercount] += count_deletions;
                    }
                };
                console.log(user);
                console.log(commit);
                console.log(addition);
                console.log(deletion);
            }
        });
    }
    $.ajax({
        url: "https://api.github.com/orgs/gearsystems/repos",
        dataType: "json",
        success: function(RepositoryData){
            console.log("New Data");
            data_repos = RepositoryData;
            var size = RepositoryData.length;
            user = new Array();
            commit = new Array();
            addition = new Array();
            deletion = new Array();
            for( var repoval = 0; repoval < size; repoval++){
                var reponame = data_repos[repoval].name;
                var string = "https://api.github.com/repos/gearsystems/"+reponame+"/stats/contributors";
                console.log(string);
                requestUserData(string, user, commit, addition, deletion);
            }
            final = new Array();
            final.push('Users','Commits','Additions','Deletions');
            for (var i = 0; i < user.length; i++ ){
                final.push(user[i],commit[i],addition[i],deletion[i]);
            }
            //Commits
            var data = google.visualization.arrayToDataTable([
                [final[0], final[1]],
                [final[4], final[5]]
                ]);
            for (var i = 2; i < (final.length)/4; i++ ){
                data.addRows([[final[(4*i)],final[(4*i)+1]]]);
            }
            var options = {
                title: 'Commits'
            };
            var chart = new google.visualization.PieChart(document.getElementById('Commits'));
            chart.draw(data, options);

            //Additions
            var data = google.visualization.arrayToDataTable([
                [final[0], final[2]],
                [final[4], final[6]]
                ]);
            for (var i = 2; i < (final.length)/4; i++ ){
                data.addRows([[final[(4*i)],final[(4*i)+2]]]);
            }
            var options = {
                title: 'Additions'
            };
            var chart = new google.visualization.PieChart(document.getElementById('Additions'));
            chart.draw(data, options);

            //Deletions
            var data = google.visualization.arrayToDataTable([
                [final[0], final[3]],
                [final[4], final[7]]
                ]);
            for (var i = 2; i < (final.length)/4; i++ ){
                data.addRows([[final[(4*i)],final[(4*i)+3]]]);
            }
            var options = {
                title: 'Deletions'
            };
            var chart = new google.visualization.PieChart(document.getElementById('Deletions'));
            chart.draw(data, options);
        }
    });
});