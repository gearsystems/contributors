$(document).ready(function() {
	var issueString = "";
	function requestIssues(URL, reponame) {
		$.ajax({
			async: false,
			url: URL,
			dataType: "json",
			success: function(RepoIssueData) {
				var repoIssueslength = RepoIssueData.length;
				if (repoIssueslength > 0)
				{
					issueString += "<div class='container'><h1>"+reponame+"</h1><table class='table table-striped table-hover '><thead><tr><th style='col-lg-2'>Issue Number</th><th style='col-lg-8'>Issue Title</th><th style='col-lg-2 '>Issue route</th></tr></thead><tbody>";
					for(var i=0; i<repoIssueslength; i++) {
						issueString += "<tr><td class='col-lg-2' >"+ RepoIssueData[i].number + "</td>";
						issueString += "<td class='col-lg-8'>"+ RepoIssueData[i].title + "</td>";
						issueString += "<td class='col-lg-2'>"+ "<a href='"+RepoIssueData[i].html_url+"' class=\"btn btn-warning\">Click here</a>" + "</td></tr>";
					}
					issueString += "</tbody> </table> </div>";
				}
			}
		});
	}

	$.ajax({
		url: "https://api.github.com/orgs/gearsystems/repos",
		dataType: "json",
		success: function(GearRepoData) {
			var repoDatalength = GearRepoData.length;
			for(var i=0; i<repoDatalength; i++) {
				var reponame = GearRepoData[i].name;
				var string = "https://api.github.com/repos/gearsystems/"+reponame+"/issues";
				requestIssues(string, reponame);
			}
			document.getElementById('issues').innerHTML = issueString;
		}
	});
}); 