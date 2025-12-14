module.exports = (req, res,next) => {
    console.log("--------------------")
    console.log("-" + req.url)
    console.log("-" + req.methode)
    console.log("- started at: ", new Date().getTime())
    console.log("--------------------")
    next();
    console.log("--------------------")
    console.log("-" + req.url)
    console.log("-" + req.methode)
    console.log("- ended at: ", new Date().getTime())
    console.log("--------------------")
} 