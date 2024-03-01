const ProjectList=require('../models/projectModel');
// controller for main page or home page
module.exports.home = async function (req, res) {
    try {
        const projectDet = await ProjectList.find({}).exec();

        return res.render('home', {
            project: projectDet,
            title: 'home page'
        });
    } catch (err) {
        console.error('Error fetching project details:', err);
        return res.status(500).send('Internal Server Error');
    }
};