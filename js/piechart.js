google.load("visualization", "1", {packages: ["corechart"]});
$(document).ready(function(){
    function requestUserData(URL, user, commit, addition, deletion){
        $.ajax({
            async: false,
            url: URL,
            dataType: "json",
            success: function(repodata){
                for (var i = 0; i < repodata.length; i++ ) {
                    var flag = 0;
                    for(var usercount = 0; usercount < user.length; usercount++) {
                        if(user[usercount]===repodata[i].author.login){
                            flag=1;
                            break;
                        }
                    }
                    var count_commits = 0, count_additions = 0, count_deletions = 0;
                    repodata_weeks_length = repodata[i].weeks.length;
                    for (var j = 0 ;j < repodata_weeks_length ; j++){
                        count_commits += repodata[i].weeks[j].c;
                        count_additions += repodata[i].weeks[j].a;
                        count_deletions += repodata[i].weeks[j].d;
                    }
                    if(flag === 0){
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
                }
            }
        });
    }
    $.ajax({
        url: "https://api.github.com/orgs/gearsystems/repos",
        dataType: "json",
        success: function(RepositoryData){
            data_repos = RepositoryData;
            var size = RepositoryData.length;
            user = [];
            commit = [];
            addition = [];
            deletion = [];
            for( var repoval = 0; repoval < size; repoval++){
                var reponame = data_repos[repoval].name;
                var string = "https://api.github.com/repos/gearsystems/"+reponame+"/stats/contributors";
                requestUserData(string, user, commit, addition, deletion);
            }
            final = [];
            final.push('Users','Commits','Additions','Deletions');
            for (var arrPopulate = 0; arrPopulate < user.length; arrPopulate++ ){
                final.push(user[arrPopulate],commit[arrPopulate],addition[arrPopulate],deletion[arrPopulate]);
            }
            //Commits
            var commitData = google.visualization.arrayToDataTable([
                [final[0], final[1]],
                [final[4], final[5]]
                ]);
            for (var rowAdder = 2; rowAdder < (final.length)/4; rowAdder++ ){
                commitData.addRows([[final[(4*rowAdder)],final[(4*rowAdder)+1]]]);
            }
            var commitOptions = {
                title: 'Commits'
            };
            var commitPieChart = new google.visualization.PieChart(document.getElementById('Commits'));
            commitPieChart.draw(commitData, commitOptions);

            //Additions
            var additionData = google.visualization.arrayToDataTable([
                [final[0], final[2]],
                [final[4], final[6]]
                ]);
            for (var additionRow = 2; additionRow < (final.length)/4; additionRow++ ){
                additionData.addRows([[final[(4*additionRow)],final[(4*additionRow)+2]]]);
            }
            var additionOptions = {
                title: 'Additions'
            };
            var additionPieChart = new google.visualization.PieChart(document.getElementById('Additions'));
            additionPieChart.draw(additionData, additionOptions);

            //Deletions
            var deletionData = google.visualization.arrayToDataTable([
                [final[0], final[3]],
                [final[4], final[7]]
                ]);
            for (var deletionRow = 2; deletionRow < (final.length)/4; deletionRow++ ){
                deletionData.addRows([[final[(4*deletionRow)],final[(4*deletionRow)+3]]]);
            }
            var deletionOptions = {
                title: 'Deletions'
            };
            var deletionPieChart = new google.visualization.PieChart(document.getElementById('Deletions'));
            deletionPieChart.draw(deletionData, deletionOptions);




            //Commits
            var commitBarData = google.visualization.arrayToDataTable([
                 [final[0], final[1], { role: 'style' }],
                 [final[4], final[5], 'red']
              ]);
            for (var commitBarRow = 2; commitBarRow < (final.length)/4; commitBarRow++ ){
                commitBarData.addRows([[final[(4*commitBarRow)],final[(4*commitBarRow)+1], 'red']]);
            }

              var commitView = new google.visualization.DataView(commitBarData);
              commitView.setColumns([0, 1,
                               { calc: "stringify",
                                 sourceColumn: 1,
                                 type: "string",
                                 role: "annotation" },
                               2]);
            var commitBarOptions = {
                title: "Commits",
                bar: {groupWidth: "95%"},
                legend: { position: "none" },
            };
            var commitBarChart = new google.visualization.BarChart(document.getElementById('barchart_commit'));
            commitBarChart.draw(commitView, commitBarOptions);


            //Additions
            var additionBarData = google.visualization.arrayToDataTable([
                 [final[0], final[1], { role: 'style' }],
                 [final[4], final[6], 'green']
              ]);
            for (var additionBarRow = 2; additionBarRow < (final.length)/4; additionBarRow++ ){
                additionBarData.addRows([[final[(4*additionBarRow)],final[(4*additionBarRow)+2], 'green']]);
            }

              var additionView = new google.visualization.DataView(additionBarData);
              additionView.setColumns([0, 1,
                               { calc: "stringify",
                                 sourceColumn: 1,
                                 type: "string",
                                 role: "annotation" },
                               2]);
            var additionBarOptions = {
                title: "Additions",
                bar: {groupWidth: "95%"},
                legend: { position: "none" },
            };
            var additionBarChart = new google.visualization.BarChart(document.getElementById('barchart_addition'));
            additionBarChart.draw(additionView, additionBarOptions);


            
            //Deletions
            var deletionBarData = google.visualization.arrayToDataTable([
                 [final[0], final[1], { role: 'style' }],
                 [final[4], final[7], 'blueviolet']
              ]);
            for (var deletionBarRow = 2; deletionBarRow < (final.length)/4; deletionBarRow++ ){
                deletionBarData.addRows([[final[(4*deletionBarRow)],final[(4*deletionBarRow)+3], 'blueviolet']]);
            }

              var deletionView = new google.visualization.DataView(deletionBarData);
              deletionView.setColumns([0, 1,
                               { calc: "stringify",
                                 sourceColumn: 1,
                                 type: "string",
                                 role: "annotation" },
                               2]);
            var deletionBarOptions = {
                title: "Deletions",
                bar: {groupWidth: "95%"},
                legend: { position: "none" },
            };
            var deletionBarChart = new google.visualization.BarChart(document.getElementById('barchart_deletion'));
            deletionBarChart.draw(deletionView, deletionBarOptions);
        }
    });
});