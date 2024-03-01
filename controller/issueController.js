const IssueList=require('../models/issue');
const ProjectList=require('../models/projectModel');

// issue page controller
module.exports.issuepage = async function (req, res) {
    try {
        const projectDetail = await ProjectList.findById(req.params.projectId).exec();

        console.log(req.params, "pp");
        return res.render('issuePage', {
            title: 'create issue',
            projectId: req.params.projectId,
            projectDet: projectDetail
        });
    } catch (err) {
        console.error('Error fetching project details:', err);
        return res.status(500).send('Internal Server Error');
    }
};
// create issue 
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
        console.error('error in creating', err);
        return res.status(500).send('Internal Server Error');
    }
};
// filter the issue
module.exports.filterIssue= async function(req,res){
    console.log(req.body,"req.body")
    let projectData= await ProjectList.findById(req.body.projectId).populate('issue')
    console.log("projectData",projectData)
    console.log('kk',projectData.issue);
    let filterdata = new Set();
    console.log('kjhuhk',filterdata)
    if(req.body.searchAuthor){
        for(i of projectData.issue){
            if(i.author === req.body.searchAuthor){
                filterdata.add(i)
            }
        }
    }else if(req.body.searchTitleDesc){
        for(i of projectData.issue){
            if(i.title === req.body.searchTitleDesc || i.description === req.body.searchTitleDesc){
                filterdata.add(i)
            }
        }
    }
    else{
        for(i of projectData.issue){
            for(j of i.labels){
                console.log(j,"kljk")
                if(j === req.body.label1 || j === req.body.label2){
                    filterdata.add(i)
                }
            }
        }
    }
    let issueRleToPro= await IssueList.find({projectRef: req.body.projectId})
    console.log('lkk',issueRleToPro)
    return res.render('projectDetailsPage',{
        title:'filter issue',
        showIssue:false,
        filterdata:filterdata,
    })
}