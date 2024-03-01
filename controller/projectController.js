const ProjectList=require('../models/projectModel');
const IssueList=require('../models/issue');


module.exports.createProject=function(req,res){
      return res.render('createproject',{
        title:"create project"
    })
}

// create project
module.exports.create = async function (req, res) {
    try {
        console.log("req.body", req.body);

        const project = await ProjectList.create({
            projectname: req.body.projectname,
            projectauthor: req.body.projectauthor,
            projectdescription: req.body.projectdescription
        });

        console.log('project is created successfully', project);
        return res.redirect('/');
    } catch (err) {
        console.log('error in creating', err);
        // Handle the error appropriately, e.g., send an error response to the client
        return res.status(500).send('Error creating project');
    }
};

module.exports.projectIssue= async function(req,res){
    console.log('req.query.projectid',req.query.projectid)
    let project=await ProjectList.findById(req.query.projectid)
    let issuePro = await IssueList.find({ projectRef: req.query.projectid });
    console.log("project",project)
    console.log("issuePro",issuePro)
    let uniqueArray=[];
    for(i of issuePro){
        for(j of i.labels){
            uniqueArray.push(j);
        }
    }
    let uniqueSet = [...new Set(uniqueArray)]
    console.log('uniqueSet',uniqueSet)
    return res.render('projectDetailsPage',{
        project:project,
        issue:issuePro,
        labelSet:uniqueSet,
        showIssue:true,
        title:'project details page'
    })
}