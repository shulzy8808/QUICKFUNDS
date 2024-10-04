const jwt = require('jsonwebtoken')

exports.generateAccessToken = ({ userEmail }) => {
    return jwt.sign(userEmail, process.env.JWT_TOKEN
        // , { expiresIn: '1800s' }
    );
}

exports. verifyAccessToken = (req, res, next) => {

    // console.log(req.headers.host)

    require('dns').reverse('12.12.12.12', function(err, domains) {
        if(err) {
            console.log(err.toString());
            return;
        }
        // console.log(domains);
    });

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const requestBody = req.body 
    
    const { siteSecured } = requestBody

    if(!siteSecured){
        return next()
    }
  
    if (token == null) return res.status(403).json({ error: 'Unauthorized user!' })
  
    return jwt.verify(token, process.env.JWT_TOKEN, (err, userEmail) => {

        if(err) {
            return res.status(403).json({ error: 'Unauthorized user!!!' })
        }
  
        req.userEmail = userEmail
  
        return next()
    })    
}